import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from "expo-router";
import { COLORS } from '@/src/theme/global';

export default function RootLayout() {

  const insets = useSafeAreaInsets();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarStyle: 'light',
        contentStyle: {
          backgroundColor: COLORS.neutral[900],
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          boxShadow: 'none',
        }
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="login" />
    </Stack>
  )
}
