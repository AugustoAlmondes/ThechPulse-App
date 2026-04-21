import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Stack } from "expo-router";
import { useThemeColors } from '@/src/hooks/useThemeColors';

const Drawer = createDrawerNavigator();

export default function RootLayout() {

  const insets = useSafeAreaInsets();
  const theme = useThemeColors();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarStyle: theme.statusBarStyle,
        contentStyle: {
          backgroundColor: theme.background,
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
