import { useCallback } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useNotificationStore } from '../store/useNotificationStore';
import { requestNotificationPermissions, getNotificationPermissions, setupNotifications } from '../services/localNotifications';
import { checkForNewNotifications } from '../services/notificationService';
import { registerNotificationBackgroundTask, unregisterNotificationBackgroundTask } from '../tasks/notificationBackgroundTask';

/**
 * Hook exposing enable/disable and manual check.
 * Reuses existing Zustand + AsyncStorage + expo-notifications.
 */
export function useNotifications() {
    const enabled = useNotificationStore((s) => s.enabled);
    const setEnabled = useNotificationStore((s) => s.setEnabled);
    const lastNotificationAt = useNotificationStore((s) => s.lastNotificationAt);
    const dailyCount = useNotificationStore((s) => s.dailyCount);
    const lastCountDate = useNotificationStore((s) => s.lastCountDate);

    const enableNotifications = useCallback(async (): Promise<boolean> => {
        // Android 13+ needs runtime permission
        if (Platform.OS === 'android' || Platform.OS === 'ios') {
            const current = await getNotificationPermissions();
            if (current !== 'granted') {
                const granted = await requestNotificationPermissions();
                if (!granted) {
                    Alert.alert(
                        'Permissão negada',
                        'Notificações estão desabilitadas. Ative nas configurações do sistema para receber novidades.',
                        [
                            { text: 'Cancelar', style: 'cancel' },
                            { text: 'Abrir configurações', onPress: () => Linking.openSettings() },
                        ]
                    );
                    setEnabled(false);
                    return false;
                }
            }
        }
        await setupNotifications();
        setEnabled(true);
        // Register background task after enabling (best effort, not blocking)
        registerNotificationBackgroundTask().catch(() => {});
        // After enabling, trigger an initial check (best effort)
        checkForNewNotifications().catch(() => {});
        return true;
    }, [setEnabled]);

    const disableNotifications = useCallback(() => {
        setEnabled(false);
        unregisterNotificationBackgroundTask().catch(() => {});
    }, [setEnabled]);

    const toggleNotifications = useCallback(async () => {
        if (enabled) {
            disableNotifications();
            return false;
        } else {
            return await enableNotifications();
        }
    }, [enabled, enableNotifications, disableNotifications]);

    const checkNow = useCallback(async () => {
        return checkForNewNotifications();
    }, []);

    return {
        enabled,
        lastNotificationAt,
        dailyCount,
        lastCountDate,
        enableNotifications,
        disableNotifications,
        toggleNotifications,
        checkNow,
    };
}
