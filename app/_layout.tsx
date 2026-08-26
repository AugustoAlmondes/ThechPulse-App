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

// Mantém o splash screen nativo visível até liberarmos manualmente
SplashScreen.preventAutoHideAsync();

function RootLayoutInner() {
  const insets = useSafeAreaInsets();
  const theme = useThemeColors();
  const isLoaded = useThemeLoaded();
  useNotificationPolling();

  useEffect(() => {
    if (isLoaded) {
      // Esconde o splash nativo assim que o tema estiver pronto
      SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  useEffect(() => {
    const sub = Notifications.addNotificationResponseReceivedListener((response) => {
      const data: any = response.notification.request.content.data;
      // Agrupada (count>1) or single: leva para lista de notícias
      try {
        router.push('/(drawer)/(tabs)/news' as any);
      } catch {}
    });
    return () => sub.remove();
  }, []);

  // Enquanto o tema não foi carregado do disco, exibe a tela de loading
  if (!isLoaded) {
    return <LoadingScreen />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarStyle: theme.statusBarStyle,
        contentStyle: {
          backgroundColor: theme.headerBackground,
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
