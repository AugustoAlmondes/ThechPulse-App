import { checkUpdates } from './news';
import { useLanguageStore } from '../store/useLanguageStore';
import { useNotificationStore } from '../store/useNotificationStore';
import { canNotify, getTodayString } from '../utils/notificationPolicy';
import { scheduleLocalNotification } from './localNotifications';
import { LanguageCode } from '../store/useLanguageStore';

// Concurrency guard — prevents simultaneous checkUpdates / duplicate notifications
let isChecking = false;

export function __resetCheckingLock() {
    isChecking = false;
}
export function __isChecking() {
    return isChecking;
}

export interface CheckForNewNotificationsResult {
    notified: boolean;
    reason: string;
    count?: number;
    hasNew?: boolean;
}

export interface CheckForNewNotificationsOptions {
    now?: Date;
    // For tests: allow injecting state without touching Zustand
    enabledOverride?: boolean;
    lastNotificationAtOverride?: string | null;
    dailyCountOverride?: number;
    lastCountDateOverride?: string | null;
    lastSeenAfterOverride?: string | null;
    languagesOverride?: LanguageCode[];
    // For tests: allow injecting api/schedule
    checkUpdatesFn?: (after: string, languages: LanguageCode[]) => Promise<{ hasNew: boolean; count: number; hasUpdates?: boolean }>;
    scheduleFn?: (count: number) => Promise<string | null>;
}

/**
 * Reusable foreground check. Respects: enabled, languages, window, cooldown, daily limit, grouping.
 * Never throws — returns reason on error.
 */
export async function checkForNewNotifications(
    options: CheckForNewNotificationsOptions = {}
): Promise<CheckForNewNotificationsResult> {
    const now = options.now ?? new Date();
    const nowIso = now.toISOString();

    if (isChecking) {
        return { notified: false, reason: 'concurrent' };
    }
    isChecking = true;

    try {
        // 1. Enabled
        const notifState = useNotificationStore.getState();
        const enabled = options.enabledOverride !== undefined ? options.enabledOverride : notifState.enabled;
        if (!enabled) {
            return { notified: false, reason: 'disabled' };
        }

        // 2. Languages — exact selected set
        const languages: LanguageCode[] =
            options.languagesOverride ?? useLanguageStore.getState().selectedLanguages;

        // 3. After — lastSeenAfter or now (to avoid backlog on first enable)
        const lastSeenAfter =
            options.lastSeenAfterOverride !== undefined
                ? options.lastSeenAfterOverride
                : notifState.lastSeenAfter;
        const after = lastSeenAfter ?? nowIso;

        // 4. Daily reset if date changed (side-effect but harmless)
        // Use store's resetDailyIfNeeded via direct check to keep tests pure
        const lastCountDate =
            options.lastCountDateOverride !== undefined
                ? options.lastCountDateOverride
                : notifState.lastCountDate;
        const dailyCount =
            options.dailyCountOverride !== undefined ? options.dailyCountOverride : notifState.dailyCount;

        // 5. Call API — injectable for tests
        const checkFn = options.checkUpdatesFn ?? ((a: string, langs: LanguageCode[]) => checkUpdates(a, langs));
        let hasNew = false;
        let count = 0;
        try {
            const res = await checkFn(after, languages);
            // Normalize hasNew / hasUpdates compat
            hasNew = (res as any).hasNew ?? (res as any).hasUpdates ?? false;
            count = (res as any).count ?? 0;
        } catch {
            return { notified: false, reason: 'error' };
        }

        // Persist lastCheckAt always (best effort) — only for real store, not test overrides
        const hasOverrides =
            options.enabledOverride !== undefined ||
            options.lastNotificationAtOverride !== undefined ||
            options.dailyCountOverride !== undefined ||
            options.lastCountDateOverride !== undefined ||
            options.lastSeenAfterOverride !== undefined ||
            options.languagesOverride !== undefined;
        if (!hasOverrides) {
            try {
                useNotificationStore.getState().setLastCheckAt(nowIso);
            } catch {}
        }

        if (!hasNew || count <= 0) {
            // No new news — advance after to now to avoid re-checking same window
            if (!hasOverrides) {
                try {
                    useNotificationStore.getState().setLastSeenAfter(nowIso);
                } catch {}
            }
            return { notified: false, reason: 'no_new', hasNew, count };
        }

        // 6. Policy checks
        const lastNotificationAt =
            options.lastNotificationAtOverride !== undefined
                ? options.lastNotificationAtOverride
                : notifState.lastNotificationAt;

        const decision = canNotify(
            hasNew,
            count,
            true, // enabled already checked
            lastNotificationAt,
            dailyCount,
            lastCountDate,
            now
        );
        if (!decision.allowed) {
            // Preserve after (do NOT advance) so next check can retry pending news after cooldown/window
            return { notified: false, reason: decision.reason, hasNew, count };
        }

        // 7. Schedule ONE grouped notification
        const scheduleFn = options.scheduleFn ?? scheduleLocalNotification;
        await scheduleFn(count);

        // 8. Update persisted state — only after successful schedule
        if (!hasOverrides) {
            try {
                useNotificationStore.getState().recordNotification(nowIso, now);
            } catch {}
        }

        return { notified: true, reason: 'ok', hasNew, count };
    } catch {
        return { notified: false, reason: 'error' };
    } finally {
        isChecking = false;
    }
}
