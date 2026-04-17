import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Stack } from "expo-router";
import { COLORS } from '@/src/theme/global';

const Drawer = createDrawerNavigator();

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
      <Stack.Screen name="(drawer)" />
      <Stack.Screen name="login" />
    </Stack>
  )
}
