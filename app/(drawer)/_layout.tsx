import { Drawer } from 'expo-router/drawer'
export default function DrawerLayout() {
    return (
        <Drawer>
            <Drawer.Screen name="(tabs)" options={{ title: 'início', headerShown: false }} />
            <Drawer.Screen name="config" options={{ title: 'Configurações', headerShown: false }} />
            <Drawer.Screen name="history" options={{ title: 'Histócio', headerShown: false }} />
        </Drawer>
    )
}
