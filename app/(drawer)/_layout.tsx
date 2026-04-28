import CustomDrawer from '@/src/components/layout/CustomDrawer'
import { useThemeColors } from '@/src/hooks/useThemeColors'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Drawer } from 'expo-router/drawer'
import { useScrollStore } from '@/src/store/useScrollStore'

export default function DrawerLayout() {
    const theme = useThemeColors();
    const { triggerScrollToTop } = useScrollStore();

    return (
        <Drawer
            drawerContent={(props) => <CustomDrawer{...props} />}
            screenListeners={{
                drawerItemPress: () => {
                    triggerScrollToTop();
                }
            }}
            screenOptions={{
                headerTintColor: theme.headerIcon,
                drawerStyle: {
                    width: 300,
                    backgroundColor: theme.drawerBackground,
                },
                drawerItemStyle: {
                    marginHorizontal: 0,
                    marginVertical: 0,
                    borderRadius: 0,
                },
                drawerActiveBackgroundColor: theme.drawerActiveBackground,
                drawerActiveTintColor: theme.drawerActiveText,
                drawerInactiveTintColor: theme.drawerInactiveText,
            }}>

            <Drawer.Screen
                name="(tabs)"
                options={{
                    title: 'início',
                    headerShown: false,
                    drawerIcon: ({ color }) => <Ionicons name="home" size={20} color={color} />
                }}
            />

            <Drawer.Screen
                name="history"
                options={{
                    title: 'Histócio',
                    headerShown: false,
                    drawerIcon: ({ color }) => <Ionicons name='time' size={20} color={color} />
                }}
            />

            <Drawer.Screen
                name="settings"
                options={{
                    title: 'Configurações',
                    headerShown: false,
                    drawerIcon: ({ color }) => <Ionicons name='settings' size={20} color={color} />
                }}
            />

            <Drawer.Screen
                name="about"
                options={{
                    drawerItemStyle: { display: 'none' },
                    headerShown: false,
                }}
            />

            <Drawer.Screen
                name="theme"
                options={{
                    drawerItemStyle: { display: 'none' },
                    headerShown: false,
                }}
            />

            <Drawer.Screen
                name="privacy"
                options={{
                    drawerItemStyle: { display: 'none' },
                    headerShown: false,
                }}
            />

            <Drawer.Screen
                name="notifications"
                options={{
                    drawerItemStyle: { display: 'none' },
                    headerShown: false,
                }}
            />
        </Drawer>
    )
}
