import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { getNotificationContent } from '../utils/notificationPolicy';

const CHANNEL_ID = 'techpulse-updates';

/**
 * Setup is idempotent. Should be called once at app start.
 * Configures foreground behavior and Android channel.
 */
export async function setupNotifications(): Promise<void> {
    // Foreground handler: show banner + sound while app is open (allows testing)
    try {
        await Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowBanner: true,
                shouldShowList: true,
                shouldPlaySound: true,
                shouldSetBadge: false,
            }),
        });
    } catch {
        // ignore if not available (web)
    }

    if (Platform.OS === 'android') {
        try {
            await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
                name: 'TechPulse Updates',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                sound: 'default',
                enableVibrate: true,
                showBadge: true,
            });
        } catch {
            // ignore channel errors
        }
    }
}

export async function getNotificationPermissions(): Promise<Notifications.PermissionStatus | null> {
    try {
        const perms = await Notifications.getPermissionsAsync();
        return perms.status;
    } catch {
        return null;
    }
}

export async function requestNotificationPermissions(): Promise<boolean> {
    try {
        const { status } = await Notifications.requestPermissionsAsync();
        return status === 'granted';
    } catch {
        return false;
    }
}

export async function scheduleLocalNotification(count: number): Promise<string | null> {
    const { title, body } = getNotificationContent(count);
    try {
        const id = await Notifications.scheduleNotificationAsync({
            content: {
                title,
                body,
                sound: 'default',
                // data can be used for deep linking later
                data: { count, type: 'new_news' },
            },
            trigger: null, // immediate local notification
        });
        return id;
    } catch {
        return null;
    }
}

// For testing: allow injection of mocks via re-export of expo-notifications is not needed,
// tests will jest.mock('expo-notifications')
export const __testing = {
    CHANNEL_ID,
};
