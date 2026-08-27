import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useNotificationStore } from '../store/useNotificationStore';
import { useLanguageStore } from '../store/useLanguageStore';
import { setupNotifications } from '../services/localNotifications';
import { checkForNewNotifications } from '../services/notificationService';
import { registerNotificationBackgroundTask, unregisterNotificationBackgroundTask } from '../tasks/notificationBackgroundTask';

/**
 * Foreground polling + background registration.
 * Foreground:
 * - On mount: setup channel/handler
 * - When enabled + languages change: trigger check
 * - On AppState -> active: trigger check
 * - Interval 15m while active
 * Background:
 * - When enabled: register BackgroundFetch task (15m, startOnBoot:true)
 * - When disabled: unregister
 */
export function useNotificationPolling() {
    const enabled = useNotificationStore((s) => s.enabled);
    const languagesKey = useLanguageStore((s) => s.selectedLanguages.join(','));
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Setup once
    useEffect(() => {
        setupNotifications().catch(() => {});
    }, []);

    // Background task lifecycle tied to enabled
    useEffect(() => {
        if (enabled) {
            registerNotificationBackgroundTask().catch(() => {});
        } else {
            unregisterNotificationBackgroundTask().catch(() => {});
        }
    }, [enabled]);

    // Trigger check when enabled or languages change
    useEffect(() => {
        if (!enabled) return;
        checkForNewNotifications().catch(() => {});
    }, [enabled, languagesKey]);

    // AppState listener: check when returning to foreground
    useEffect(() => {
        if (!enabled) return;
        const sub = AppState.addEventListener('change', (nextState: AppStateStatus) => {
            if (nextState === 'active') {
                checkForNewNotifications().catch(() => {});
            }
        });
        return () => sub.remove();
    }, [enabled]);

    // Optional foreground interval 15m (only while enabled and active)
    useEffect(() => {
        if (!enabled) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            return;
        }
        // Clear previous
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            if (AppState.currentState === 'active') {
                checkForNewNotifications().catch(() => {});
            }
        }, 15 * 60 * 1000);
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [enabled]);
}
