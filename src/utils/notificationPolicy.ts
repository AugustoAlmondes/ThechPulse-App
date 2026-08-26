/**
 * Pure notification policy helpers — testable without Expo or network.
 * Windows: 07:00–22:00 local device time.
 * Cooldown: 60 minutes.
 * Daily limit: 2 per calendar day (local).
 */

export const WINDOW_START_HOUR = 7;
export const WINDOW_END_HOUR = 22; // exclusive
export const COOLDOWN_MS = 60 * 60 * 1000;
export const DAILY_LIMIT = 2;

export function getTodayString(date: Date = new Date()): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

export function isWithinWindow(now: Date = new Date()): boolean {
    const hour = now.getHours();
    return hour >= WINDOW_START_HOUR && hour < WINDOW_END_HOUR;
}

export function isCooldownActive(lastNotificationAt: string | null, now: Date = new Date()): boolean {
    if (!lastNotificationAt) return false;
    const last = new Date(lastNotificationAt).getTime();
    if (isNaN(last)) return false;
    return now.getTime() - last < COOLDOWN_MS;
}

export function getEffectiveDailyCount(
    dailyCount: number,
    lastCountDate: string | null,
    now: Date = new Date()
): number {
    const today = getTodayString(now);
    if (lastCountDate !== today) return 0;
    return dailyCount;
}

export function isDailyLimitReached(
    dailyCount: number,
    lastCountDate: string | null,
    now: Date = new Date()
): boolean {
    const effective = getEffectiveDailyCount(dailyCount, lastCountDate, now);
    return effective >= DAILY_LIMIT;
}

export function getNotificationContent(count: number): { title: string; body: string } {
    if (count === 1) {
        return {
            title: 'TechPulse',
            body: '1 nova notícia disponível',
        };
    }
    return {
        title: 'TechPulse',
        body: `${count} novas notícias disponíveis`,
    };
}

export interface CanNotifyResult {
    allowed: boolean;
    reason: 'ok' | 'no_new' | 'disabled' | 'outside_window' | 'cooldown' | 'daily_limit' | 'error';
}

export function canNotify(
    hasNew: boolean,
    count: number,
    enabled: boolean,
    lastNotificationAt: string | null,
    dailyCount: number,
    lastCountDate: string | null,
    now: Date = new Date()
): CanNotifyResult {
    if (!enabled) return { allowed: false, reason: 'disabled' };
    if (!hasNew || count <= 0) return { allowed: false, reason: 'no_new' };
    if (!isWithinWindow(now)) return { allowed: false, reason: 'outside_window' };
    if (isCooldownActive(lastNotificationAt, now)) return { allowed: false, reason: 'cooldown' };
    if (isDailyLimitReached(dailyCount, lastCountDate, now)) return { allowed: false, reason: 'daily_limit' };
    return { allowed: true, reason: 'ok' };
}
