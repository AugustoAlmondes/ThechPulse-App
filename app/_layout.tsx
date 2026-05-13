import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from "expo-router";
import { useThemeColors } from '@/src/hooks/useThemeColors';
import { ThemeProvider } from '@/src/providers/ThemeProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/src/lib/react-query';
import { useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import { Platform } from 'react-native';

function RootLayoutInner() {
  const insets = useSafeAreaInsets();
  const theme = useThemeColors();

  useEffect(() => {
    if (Platform.OS === 'android') {
      hideNavigationBar();
    }
  }, []);

  async function hideNavigationBar() {
    await NavigationBar.setVisibilityAsync("hidden");
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarStyle: theme.statusBarStyle,
        contentStyle: {
          backgroundColor: theme.background,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }
      }}
    >
      <Stack.Screen name="(drawer)" />
      <Stack.Screen name="login" />
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
