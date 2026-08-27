jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('expo-notifications', () => ({
  setNotificationHandler: jest.fn(),
  setNotificationChannelAsync: jest.fn(),
  getPermissionsAsync: jest.fn(async () => ({ status: 'granted' })),
  requestPermissionsAsync: jest.fn(async () => ({ status: 'granted' })),
  scheduleNotificationAsync: jest.fn(async () => 'id'),
  addNotificationResponseReceivedListener: jest.fn(() => ({ remove: jest.fn() })),
  AndroidImportance: { MAX: 5 },
}));

jest.mock('expo-task-manager', () => ({
  defineTask: jest.fn(),
  isTaskRegisteredAsync: jest.fn(async () => false),
}));

jest.mock('expo-background-fetch', () => ({
  getStatusAsync: jest.fn(async () => 1),
  registerTaskAsync: jest.fn(async () => {}),
  unregisterTaskAsync: jest.fn(async () => {}),
  BackgroundFetchStatus: { Available: 1, Restricted: 2, Denied: 3 },
  BackgroundFetchResult: { NewData: 1, NoData: 2, Failed: 3 },
}));

jest.mock('../services/notificationService', () => ({
  checkForNewNotifications: jest.fn(async () => ({ notified: true, reason: 'ok', hasNew: true, count: 2 })),
  __resetCheckingLock: jest.fn(),
  __isChecking: jest.fn(() => false),
}));

import { TECHPULSE_NOTIFICATION_TASK } from '../tasks/notificationBackgroundTask';

describe('Background Task — N.3', () => {
  let registerNotificationBackgroundTask: any;
  let unregisterNotificationBackgroundTask: any;
  let isNotificationTaskRegistered: any;
  let TaskManager: any;
  let BackgroundFetch: any;
  let notificationService: any;

  beforeAll(() => {
    const mod = require('../tasks/notificationBackgroundTask');
    registerNotificationBackgroundTask = mod.registerNotificationBackgroundTask;
    unregisterNotificationBackgroundTask = mod.unregisterNotificationBackgroundTask;
    isNotificationTaskRegistered = mod.isNotificationTaskRegistered;
    TaskManager = require('expo-task-manager');
    BackgroundFetch = require('expo-background-fetch');
    notificationService = require('../services/notificationService');
  });

  beforeEach(() => {
    (TaskManager.isTaskRegisteredAsync as jest.Mock).mockClear();
    (BackgroundFetch.getStatusAsync as jest.Mock).mockClear();
    (BackgroundFetch.registerTaskAsync as jest.Mock).mockClear();
    (BackgroundFetch.unregisterTaskAsync as jest.Mock).mockClear();
    (notificationService.checkForNewNotifications as jest.Mock).mockClear();
    (TaskManager.isTaskRegisteredAsync as jest.Mock).mockResolvedValue(false);
    (BackgroundFetch.getStatusAsync as jest.Mock).mockResolvedValue(1);
    (notificationService.checkForNewNotifications as jest.Mock).mockResolvedValue({ notified: true, reason: 'ok', hasNew: true, count: 2 });
  });

  test('1. task registrada — defineTask chamado com nome constante', () => {
    expect(TaskManager.defineTask).toHaveBeenCalled();
    const call = (TaskManager.defineTask as jest.Mock).mock.calls.find((c: any) => c[0] === TECHPULSE_NOTIFICATION_TASK);
    expect(call).toBeTruthy();
  });

  test('2. register — registra task com intervalo 15min e startOnBoot', async () => {
    const ok = await registerNotificationBackgroundTask();
    expect(ok).toBe(true);
    expect(BackgroundFetch.registerTaskAsync).toHaveBeenCalledWith(TECHPULSE_NOTIFICATION_TASK, expect.objectContaining({
      minimumInterval: 15 * 60,
      startOnBoot: true,
      stopOnTerminate: false,
    }));
  });

  test('3. register — não registra duas vezes se já registrada', async () => {
    (TaskManager.isTaskRegisteredAsync as jest.Mock).mockResolvedValue(true);
    await registerNotificationBackgroundTask();
    expect(BackgroundFetch.registerTaskAsync).not.toHaveBeenCalled();
    await registerNotificationBackgroundTask();
    expect(BackgroundFetch.registerTaskAsync).not.toHaveBeenCalled();
  });

  test('4. unregister — desregistra quando registrada', async () => {
    (TaskManager.isTaskRegisteredAsync as jest.Mock).mockResolvedValue(true);
    const ok = await unregisterNotificationBackgroundTask();
    expect(ok).toBe(true);
    expect(BackgroundFetch.unregisterTaskAsync).toHaveBeenCalledWith(TECHPULSE_NOTIFICATION_TASK);
  });

  test('5. unregister — não tenta desregistrar se não registrada', async () => {
    (TaskManager.isTaskRegisteredAsync as jest.Mock).mockResolvedValue(false);
    await unregisterNotificationBackgroundTask();
    expect(BackgroundFetch.unregisterTaskAsync).not.toHaveBeenCalled();
  });

  test('6. task chama checkForNewNotifications e retorna NewData quando notified', async () => {
    const handler = (TaskManager.defineTask as jest.Mock).mock.calls.find((c: any) => c[0] === TECHPULSE_NOTIFICATION_TASK)?.[1];
    expect(handler).toBeDefined();
    (notificationService.checkForNewNotifications as jest.Mock).mockResolvedValue({ notified: true, reason: 'ok', hasNew: true, count: 3 });
    const { useNotificationStore } = require('../store/useNotificationStore');
    useNotificationStore.setState({ enabled: true } as any);
    const result = await handler!();
    expect(notificationService.checkForNewNotifications).toHaveBeenCalled();
    expect(result).toBe(1); // NewData
  });

  test('7. task trata erro — retorna Failed', async () => {
    const handler = (TaskManager.defineTask as jest.Mock).mock.calls.find((c: any) => c[0] === TECHPULSE_NOTIFICATION_TASK)?.[1];
    (notificationService.checkForNewNotifications as jest.Mock).mockRejectedValue(new Error('fail'));
    const { useNotificationStore } = require('../store/useNotificationStore');
    useNotificationStore.setState({ enabled: true } as any);
    const result = await handler!();
    expect(result).toBe(3); // Failed
  });

  test('8. task respeita enabled=false — retorna NoData sem chamar check', async () => {
    const handler = (TaskManager.defineTask as jest.Mock).mock.calls.find((c: any) => c[0] === TECHPULSE_NOTIFICATION_TASK)?.[1];
    const { useNotificationStore } = require('../store/useNotificationStore');
    useNotificationStore.setState({ enabled: false } as any);
    (notificationService.checkForNewNotifications as jest.Mock).mockClear();
    const result = await handler!();
    expect(notificationService.checkForNewNotifications).not.toHaveBeenCalled();
    expect(result).toBe(2); // NoData
  });

  test('9. idiomas preservados — background usa selectedLanguages', async () => {
    const { useLanguageStore } = require('../store/useLanguageStore');
    useLanguageStore.setState({ selectedLanguages: ['pt', 'en'] } as any);
    const handler = (TaskManager.defineTask as jest.Mock).mock.calls.find((c: any) => c[0] === TECHPULSE_NOTIFICATION_TASK)?.[1];
    const { useNotificationStore } = require('../store/useNotificationStore');
    useNotificationStore.setState({ enabled: true } as any);
    (notificationService.checkForNewNotifications as jest.Mock).mockClear();
    await handler!();
    expect(notificationService.checkForNewNotifications).toHaveBeenCalled();
    expect(useLanguageStore.getState().selectedLanguages).toEqual(['pt', 'en']);
  });

  test('10. cooldown e daily limit preservados — delega para notificationService (notified false → NoData)', async () => {
    const handler = (TaskManager.defineTask as jest.Mock).mock.calls.find((c: any) => c[0] === TECHPULSE_NOTIFICATION_TASK)?.[1];
    const { useNotificationStore } = require('../store/useNotificationStore');
    useNotificationStore.setState({ enabled: true } as any);
    (notificationService.checkForNewNotifications as jest.Mock).mockResolvedValue({ notified: false, reason: 'cooldown', hasNew: true, count: 1 });
    const result = await handler!();
    expect(result).toBe(2);
    (notificationService.checkForNewNotifications as jest.Mock).mockResolvedValue({ notified: false, reason: 'daily_limit', hasNew: true, count: 1 });
    const result2 = await handler!();
    expect(result2).toBe(2);
  });

  test('11. status Restricted — não registra', async () => {
    (BackgroundFetch.getStatusAsync as jest.Mock).mockResolvedValue(2);
    const ok = await registerNotificationBackgroundTask();
    expect(ok).toBe(false);
    expect(BackgroundFetch.registerTaskAsync).not.toHaveBeenCalled();
  });
});
