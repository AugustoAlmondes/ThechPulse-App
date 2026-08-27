import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { Platform } from 'react-native';
import { checkForNewNotifications } from '../services/notificationService';
import { useNotificationStore } from '../store/useNotificationStore';

export const TECHPULSE_NOTIFICATION_TASK = 'techpulse-notification-task';

// Define the task once at import time (safe for web: no-op)
if (Platform.OS !== 'web') {
  try {
    TaskManager.defineTask(TECHPULSE_NOTIFICATION_TASK, async () => {
      try {
        const enabled = useNotificationStore.getState().enabled;
        if (!enabled) {
          return BackgroundFetch.BackgroundFetchResult.NoData;
        }
        const result = await checkForNewNotifications();
        if (result.notified) {
          return BackgroundFetch.BackgroundFetchResult.NewData;
        }
        if (result.reason === 'error') {
          return BackgroundFetch.BackgroundFetchResult.Failed;
        }
        return BackgroundFetch.BackgroundFetchResult.NoData;
      } catch {
        return BackgroundFetch.BackgroundFetchResult.Failed;
      }
    });
  } catch {
    // defineTask can throw if already defined in HMR — ignore
  }
}

export async function isNotificationTaskRegistered(): Promise<boolean> {
  try {
    const isRegistered = await TaskManager.isTaskRegisteredAsync(TECHPULSE_NOTIFICATION_TASK);
    return isRegistered;
  } catch {
    return false;
  }
}

export async function registerNotificationBackgroundTask(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  try {
    const status = await BackgroundFetch.getStatusAsync();
    if (status === BackgroundFetch.BackgroundFetchStatus.Restricted || status === BackgroundFetch.BackgroundFetchStatus.Denied) {
      return false;
    }
    const already = await isNotificationTaskRegistered();
    if (already) return true;
    await BackgroundFetch.registerTaskAsync(TECHPULSE_NOTIFICATION_TASK, {
      minimumInterval: 15 * 60, // 15 minutes in seconds
      stopOnTerminate: false,
      startOnBoot: true,
    });
    return true;
  } catch (e) {
    console.log('[BackgroundTask] register error', e);
    return false;
  }
}

export async function unregisterNotificationBackgroundTask(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  try {
    const registered = await isNotificationTaskRegistered();
    if (!registered) return true;
    await BackgroundFetch.unregisterTaskAsync(TECHPULSE_NOTIFICATION_TASK);
    return true;
  } catch (e) {
    console.log('[BackgroundTask] unregister error', e);
    return false;
  }
}

// For tests — expose internals
export const __testing = {
  TECHPULSE_NOTIFICATION_TASK,
};
