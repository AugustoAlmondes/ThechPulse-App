import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTodayString } from '../utils/notificationPolicy';

export interface NotificationStoreState {
    enabled: boolean;
    lastNotificationAt: string | null;
    dailyCount: number;
    lastCountDate: string | null;
    lastSeenAfter: string | null;
    lastCheckAt: string | null;
    // actions
    setEnabled: (enabled: boolean) => void;
    recordNotification: (nowIso: string, nowDate: Date) => void;
    setLastSeenAfter: (iso: string | null) => void;
    setLastCheckAt: (iso: string | null) => void;
    resetDailyIfNeeded: (nowDate: Date) => void;
    reset: () => void;
}

const INITIAL_STATE = {
    enabled: false,
    lastNotificationAt: null as string | null,
    dailyCount: 0,
    lastCountDate: null as string | null,
    lastSeenAfter: null as string | null,
    lastCheckAt: null as string | null,
};

export const useNotificationStore = create<NotificationStoreState>()(
    persist(
        (set, get) => ({
            ...INITIAL_STATE,

            setEnabled: (enabled: boolean) => {
                const state = get();
                // When enabling首次, set lastSeenAfter to now to avoid notifying old backlog
                if (enabled && !state.enabled && !state.lastSeenAfter) {
                    const nowIso = new Date().toISOString();
                    set({ enabled, lastSeenAfter: nowIso });
                } else {
                    set({ enabled });
                }
                // If disabling, keep other state (do not reset counts)
            },

            recordNotification: (nowIso: string, nowDate: Date) => {
                const today = getTodayString(nowDate);
                const { dailyCount, lastCountDate } = get();
                const effectiveCount = lastCountDate !== today ? 0 : dailyCount;
                set({
                    lastNotificationAt: nowIso,
                    dailyCount: effectiveCount + 1,
                    lastCountDate: today,
                    lastSeenAfter: nowIso,
                    lastCheckAt: nowIso,
                });
            },

            setLastSeenAfter: (iso) => set({ lastSeenAfter: iso }),
            setLastCheckAt: (iso) => set({ lastCheckAt: iso }),

            resetDailyIfNeeded: (nowDate: Date) => {
                const today = getTodayString(nowDate);
                const { lastCountDate } = get();
                if (lastCountDate !== today) {
                    set({ dailyCount: 0, lastCountDate: today });
                }
            },

            reset: () => set({ ...INITIAL_STATE }),
        }),
        {
            name: 'teachpulse-notifications-storage',
            storage: createJSONStorage(() => AsyncStorage),
            version: 1,
        }
    )
);
