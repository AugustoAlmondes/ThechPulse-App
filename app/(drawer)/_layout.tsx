import CustomDrawer from '@/src/components/layout/CustomDrawer'
import { COLORS } from '@/src/theme/global'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Drawer } from 'expo-router/drawer'
import { Text, View } from 'react-native'

export default function DrawerLayout() {
    return (
        <Drawer
            drawerContent={(props) => <CustomDrawer{...props} />}
            screenOptions={{
                headerTintColor: COLORS.neutral.white,
                drawerStyle: {
                    width: 300,
                    backgroundColor: COLORS.neutral[900],
                },
                drawerItemStyle: {
                    marginHorizontal: 0,
                    marginVertical: 0,
                    borderRadius: 0,
                },
                drawerActiveBackgroundColor: COLORS.neutral[800],
                drawerActiveTintColor: COLORS.neutral.white,
                drawerInactiveTintColor: COLORS.neutral[400],
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
