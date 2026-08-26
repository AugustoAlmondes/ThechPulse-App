import { checkForNewNotifications, __resetCheckingLock } from '../services/notificationService';
import * as policy from '../utils/notificationPolicy';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('expo-notifications', () => ({
  setNotificationHandler: jest.fn(),
  setNotificationChannelAsync: jest.fn(),
  getPermissionsAsync: jest.fn(async () => ({ status: 'granted' })),
  requestPermissionsAsync: jest.fn(async () => ({ status: 'granted' })),
  scheduleNotificationAsync: jest.fn(async () => 'test-id'),
  addNotificationResponseReceivedListener: jest.fn(() => ({ remove: jest.fn() })),
  AndroidImportance: { MAX: 5 },
}));

// No need to mock api because we inject checkUpdatesFn

describe('Notificações Locais V1 — N.2', () => {
  beforeEach(() => {
    __resetCheckingLock();
    jest.clearAllMocks();
  });

  const baseNow = new Date('2026-08-24T10:00:00.000Z'); // 10:00 inside window (UTC, but local hour depends on TZ; use 10 local)
  // Use local hour 10 by constructing with local timezone 10:00
  const insideWindow = new Date();
  insideWindow.setHours(10, 0, 0, 0);
  const outsideWindowNight = new Date();
  outsideWindowNight.setHours(23, 0, 0, 0);
  const outsideWindowEarly = new Date();
  outsideWindowEarly.setHours(6, 0, 0, 0);

  test('Teste 1: Notificações desabilitadas — não consulta nem notifica', async () => {
    const checkFn = jest.fn(async () => ({ hasNew: true, count: 5 }));
    const scheduleFn = jest.fn(async () => 'id');
    const res = await checkForNewNotifications({
      now: insideWindow,
      enabledOverride: false,
      lastSeenAfterOverride: new Date().toISOString(),
      checkUpdatesFn: checkFn,
      scheduleFn,
    });
    expect(res.notified).toBe(false);
    expect(res.reason).toBe('disabled');
    expect(checkFn).not.toHaveBeenCalled();
    expect(scheduleFn).not.toHaveBeenCalled();
  });

  test('Teste 2: Habilitadas + hasNew false — não notifica', async () => {
    const checkFn = jest.fn(async () => ({ hasNew: false, count: 0 }));
    const scheduleFn = jest.fn(async () => 'id');
    const res = await checkForNewNotifications({
      now: insideWindow,
      enabledOverride: true,
      lastSeenAfterOverride: new Date().toISOString(),
      dailyCountOverride: 0,
      lastCountDateOverride: policy.getTodayString(insideWindow),
      lastNotificationAtOverride: null,
      checkUpdatesFn: checkFn,
      scheduleFn,
    });
    expect(res.notified).toBe(false);
    expect(res.reason).toBe('no_new');
    expect(scheduleFn).not.toHaveBeenCalled();
  });

  test('Teste 3: Habilitadas + hasNew true — uma notificação', async () => {
    const checkFn = jest.fn(async () => ({ hasNew: true, count: 1 }));
    const scheduleFn = jest.fn(async () => 'id');
    const res = await checkForNewNotifications({
      now: insideWindow,
      enabledOverride: true,
      lastSeenAfterOverride: new Date(Date.now() - 100000).toISOString(),
      dailyCountOverride: 0,
      lastCountDateOverride: policy.getTodayString(insideWindow),
      lastNotificationAtOverride: null,
      checkUpdatesFn: checkFn,
      scheduleFn,
    });
    expect(res.notified).toBe(true);
    expect(res.reason).toBe('ok');
    expect(scheduleFn).toHaveBeenCalledTimes(1);
    expect(scheduleFn).toHaveBeenCalledWith(1);
  });

  test('Teste 4: Cooldown ativo (30m) — não notifica', async () => {
    const lastNotif = new Date(insideWindow.getTime() - 30 * 60 * 1000).toISOString();
    const checkFn = jest.fn(async () => ({ hasNew: true, count: 2 }));
    const scheduleFn = jest.fn(async () => 'id');
    const res = await checkForNewNotifications({
      now: insideWindow,
      enabledOverride: true,
      lastSeenAfterOverride: new Date(Date.now() - 100000).toISOString(),
      dailyCountOverride: 0,
      lastCountDateOverride: policy.getTodayString(insideWindow),
      lastNotificationAtOverride: lastNotif,
      checkUpdatesFn: checkFn,
      scheduleFn,
    });
    expect(res.notified).toBe(false);
    expect(res.reason).toBe('cooldown');
    expect(scheduleFn).not.toHaveBeenCalled();
  });

  test('Teste 5: Cooldown expirado (61m) — pode notificar', async () => {
    const lastNotif = new Date(insideWindow.getTime() - 61 * 60 * 1000).toISOString();
    const checkFn = jest.fn(async () => ({ hasNew: true, count: 2 }));
    const scheduleFn = jest.fn(async () => 'id');
    const res = await checkForNewNotifications({
      now: insideWindow,
      enabledOverride: true,
      lastSeenAfterOverride: new Date(Date.now() - 100000).toISOString(),
      dailyCountOverride: 0,
      lastCountDateOverride: policy.getTodayString(insideWindow),
      lastNotificationAtOverride: lastNotif,
      checkUpdatesFn: checkFn,
      scheduleFn,
    });
    expect(res.notified).toBe(true);
    expect(scheduleFn).toHaveBeenCalledTimes(1);
  });

  test('Teste 6: Duas notificações já enviadas no dia — não envia terceira', async () => {
    const checkFn = jest.fn(async () => ({ hasNew: true, count: 3 }));
    const scheduleFn = jest.fn(async () => 'id');
    const today = policy.getTodayString(insideWindow);
    const res = await checkForNewNotifications({
      now: insideWindow,
      enabledOverride: true,
      lastSeenAfterOverride: new Date(Date.now() - 100000).toISOString(),
      dailyCountOverride: 2,
      lastCountDateOverride: today,
      lastNotificationAtOverride: new Date(insideWindow.getTime() - 70 * 60 * 1000).toISOString(),
      checkUpdatesFn: checkFn,
      scheduleFn,
    });
    expect(res.notified).toBe(false);
    expect(res.reason).toBe('daily_limit');
    expect(scheduleFn).not.toHaveBeenCalled();
  });

  test('Teste 7: Novo dia — contador reiniciado, pode notificar', async () => {
    const yesterday = new Date(insideWindow);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = policy.getTodayString(yesterday);
    const checkFn = jest.fn(async () => ({ hasNew: true, count: 1 }));
    const scheduleFn = jest.fn(async () => 'id');
    const res = await checkForNewNotifications({
      now: insideWindow,
      enabledOverride: true,
      lastSeenAfterOverride: new Date(Date.now() - 100000).toISOString(),
      dailyCountOverride: 2,
      lastCountDateOverride: yesterdayStr,
      lastNotificationAtOverride: new Date(insideWindow.getTime() - 70 * 60 * 1000).toISOString(),
      checkUpdatesFn: checkFn,
      scheduleFn,
    });
    expect(res.notified).toBe(true);
    expect(scheduleFn).toHaveBeenCalledTimes(1);
  });

  test('Teste 8: Fora da janela 07:00–22:00 — não notificar', async () => {
    const checkFn = jest.fn(async () => ({ hasNew: true, count: 1 }));
    const scheduleFn = jest.fn(async () => 'id');
    const resNight = await checkForNewNotifications({
      now: outsideWindowNight,
      enabledOverride: true,
      lastSeenAfterOverride: new Date(Date.now() - 100000).toISOString(),
      dailyCountOverride: 0,
      lastCountDateOverride: policy.getTodayString(outsideWindowNight),
      lastNotificationAtOverride: null,
      checkUpdatesFn: checkFn,
      scheduleFn,
    });
    expect(resNight.notified).toBe(false);
    expect(resNight.reason).toBe('outside_window');
    __resetCheckingLock();
    const resEarly = await checkForNewNotifications({
      now: outsideWindowEarly,
      enabledOverride: true,
      lastSeenAfterOverride: new Date(Date.now() - 100000).toISOString(),
      dailyCountOverride: 0,
      lastCountDateOverride: policy.getTodayString(outsideWindowEarly),
      lastNotificationAtOverride: null,
      checkUpdatesFn: checkFn,
      scheduleFn,
    });
    expect(resEarly.notified).toBe(false);
    expect(resEarly.reason).toBe('outside_window');
  });

  test('Teste 9: Cinco notícias novas — uma única notificação agrupada', async () => {
    const checkFn = jest.fn(async () => ({ hasNew: true, count: 5 }));
    const scheduleFn = jest.fn(async () => 'id');
    const res = await checkForNewNotifications({
      now: insideWindow,
      enabledOverride: true,
      lastSeenAfterOverride: new Date(Date.now() - 100000).toISOString(),
      dailyCountOverride: 0,
      lastCountDateOverride: policy.getTodayString(insideWindow),
      lastNotificationAtOverride: null,
      checkUpdatesFn: checkFn,
      scheduleFn,
    });
    expect(res.notified).toBe(true);
    expect(scheduleFn).toHaveBeenCalledTimes(1);
    expect(scheduleFn).toHaveBeenCalledWith(5);
    expect(res.count).toBe(5);
  });

  test('Teste 10: Idioma PT — requisição com languages=pt', async () => {
    const checkFn = jest.fn(async () => ({ hasNew: true, count: 1 }));
    const scheduleFn = jest.fn(async () => 'id');
    await checkForNewNotifications({
      now: insideWindow,
      enabledOverride: true,
      languagesOverride: ['pt'],
      lastSeenAfterOverride: new Date(Date.now() - 100000).toISOString(),
      dailyCountOverride: 0,
      lastCountDateOverride: policy.getTodayString(insideWindow),
      lastNotificationAtOverride: null,
      checkUpdatesFn: checkFn,
      scheduleFn,
    });
    expect(checkFn).toHaveBeenCalledTimes(1);
    const calledLangs = (checkFn.mock.calls[0] as any)[1] as string[];
    expect(calledLangs).toEqual(['pt']);
  });

  test('Teste 11: PT + EN — requisição com languages=pt,en', async () => {
    const checkFn = jest.fn(async () => ({ hasNew: true, count: 1 }));
    const scheduleFn = jest.fn(async () => 'id');
    await checkForNewNotifications({
      now: insideWindow,
      enabledOverride: true,
      languagesOverride: ['pt', 'en'],
      lastSeenAfterOverride: new Date(Date.now() - 100000).toISOString(),
      dailyCountOverride: 0,
      lastCountDateOverride: policy.getTodayString(insideWindow),
      lastNotificationAtOverride: null,
      checkUpdatesFn: checkFn,
      scheduleFn,
    });
    const calledLangs = (checkFn.mock.calls[0] as any)[1] as string[];
    // order is normalized but should contain both
    expect(calledLangs.sort()).toEqual(['en', 'pt'].sort());
  });

  test('Teste 12: PT + EN + ES — requisição com os três', async () => {
    const checkFn = jest.fn(async () => ({ hasNew: true, count: 1 }));
    const scheduleFn = jest.fn(async () => 'id');
    await checkForNewNotifications({
      now: insideWindow,
      enabledOverride: true,
      languagesOverride: ['pt', 'en', 'es'],
      lastSeenAfterOverride: new Date(Date.now() - 100000).toISOString(),
      dailyCountOverride: 0,
      lastCountDateOverride: policy.getTodayString(insideWindow),
      lastNotificationAtOverride: null,
      checkUpdatesFn: checkFn,
      scheduleFn,
    });
    const calledLangs = (checkFn.mock.calls[0] as any)[1] as string[];
    expect(calledLangs.sort()).toEqual(['en', 'es', 'pt'].sort());
  });

  test('Teste 13: Erro da API — aplicativo continua funcionando', async () => {
    const checkFn = jest.fn(async () => {
      throw new Error('network fail');
    });
    const scheduleFn = jest.fn(async () => 'id');
    const res = await checkForNewNotifications({
      now: insideWindow,
      enabledOverride: true,
      lastSeenAfterOverride: new Date(Date.now() - 100000).toISOString(),
      dailyCountOverride: 0,
      lastCountDateOverride: policy.getTodayString(insideWindow),
      lastNotificationAtOverride: null,
      checkUpdatesFn: checkFn,
      scheduleFn,
    });
    expect(res.notified).toBe(false);
    expect(res.reason).toBe('error');
    expect(scheduleFn).not.toHaveBeenCalled();
  });

  test('Teste 14: Chamadas simultâneas — não gerar notificações duplicadas', async () => {
    let scheduleCalls = 0;
    const checkFn = jest.fn(async () => {
      // simulate network delay
      await new Promise((r) => setTimeout(r, 50));
      return { hasNew: true, count: 2 };
    });
    const scheduleFn = jest.fn(async () => {
      scheduleCalls++;
      return 'id';
    });

    const p1 = checkForNewNotifications({
      now: insideWindow,
      enabledOverride: true,
      lastSeenAfterOverride: new Date(Date.now() - 100000).toISOString(),
      dailyCountOverride: 0,
      lastCountDateOverride: policy.getTodayString(insideWindow),
      lastNotificationAtOverride: null,
      checkUpdatesFn: checkFn,
      scheduleFn,
    });
    const p2 = checkForNewNotifications({
      now: insideWindow,
      enabledOverride: true,
      lastSeenAfterOverride: new Date(Date.now() - 100000).toISOString(),
      dailyCountOverride: 0,
      lastCountDateOverride: policy.getTodayString(insideWindow),
      lastNotificationAtOverride: null,
      checkUpdatesFn: checkFn,
      scheduleFn,
    });

    const [r1, r2] = await Promise.all([p1, p2]);
    // One should be concurrent blocked, other should succeed
    const notifiedCount = [r1, r2].filter((r) => r.notified).length;
    const concurrentCount = [r1, r2].filter((r) => r.reason === 'concurrent').length;
    expect(notifiedCount).toBe(1);
    expect(concurrentCount).toBe(1);
    expect(scheduleCalls).toBe(1);
  });

  // Extra unit tests for policy window boundary
  test('policy: 07:00 inside, 22:00 outside', () => {
    const at7 = new Date();
    at7.setHours(7, 0, 0, 0);
    const at22 = new Date();
    at22.setHours(22, 0, 0, 0);
    expect(policy.isWithinWindow(at7)).toBe(true);
    expect(policy.isWithinWindow(at22)).toBe(false);
  });
});
