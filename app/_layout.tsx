import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from "expo-router";
import { useThemeColors } from '@/src/hooks/useThemeColors';
import { ThemeProvider } from '@/src/providers/ThemeProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/src/lib/react-query';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useThemeLoaded } from '@/src/providers/ThemeProvider';
import { LoadingScreen } from '@/src/components/shared/LoadingScreen';
import { useNotificationPolling } from '@/src/hooks/useNotificationPolling';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { useFonts } from 'expo-font';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import {
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from '@expo-google-fonts/space-grotesk';
import '@/src/tasks/notificationBackgroundTask';

SplashScreen.preventAutoHideAsync();

function RootLayoutInner() {
  const insets = useSafeAreaInsets();
  const theme = useThemeColors();
  const isLoaded = useThemeLoaded();
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
  });
  useNotificationPolling();

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  useEffect(() => {
    const sub = Notifications.addNotificationResponseReceivedListener((response) => {
      const data: any = response.notification.request.content.data;
      try {
        router.push('/(drawer)/(tabs)/news' as any);
      } catch {}
    });
    return () => sub.remove();
  }, []);

  if (!isLoaded || !fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarStyle: theme.statusBarStyle,
        contentStyle: {
          backgroundColor: theme.bg.primary,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }
      }}
    >
      <Stack.Screen name="(drawer)" />
      <Stack.Screen name="webview/[id]" />
    </Stack>
  )
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RootLayoutInner />
      </ThemeProvider>
    </QueryClientProvider>
  )
}