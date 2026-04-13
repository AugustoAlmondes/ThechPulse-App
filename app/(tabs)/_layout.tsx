import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import Favorites from "./favorites";
import { COLORS } from "@/src/theme/global";
import Home from ".";
import Entypo from '@expo/vector-icons/Entypo';
const Tab = createMaterialTopTabNavigator();

export default function TabsLayout() {

    return (
        <>
            <Tab.Navigator
                tabBarPosition="bottom"
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: COLORS.neutral[900],
                        height: 70,
                        paddingBottom: 8,
                    },
                    tabBarIndicatorStyle: {
                        width: 0
                    },
                    tabBarActiveTintColor: COLORS.neutral.white,
                    tabBarInactiveTintColor: COLORS.neutral[300],
                    tabBarLabelStyle: {
                        fontSize: 14,
                        fontWeight: '600',
                        textTransform: 'none',
                    },
                }}

            >
                <Tab.Screen
                    name="index"
                    component={Home}
                    options={{
                        tabBarShowLabel: true,
                        tabBarLabel: 'Início',
                        tabBarIcon: ({ color }) => (
                            <Entypo name="home" size={20} color={color} />
                        )
                    }}
                />
                <Tab.Screen
                    name="favorites"
                    component={Favorites}
                    options={{
                        tabBarShowLabel: true,
                        tabBarLabel: 'Favoritos',
                        tabBarIcon: ({ color }) => (
                            <Entypo name="heart" size={24} color={color} />
                        )
                    }}
                />
            </Tab.Navigator>
        </>
    )
}