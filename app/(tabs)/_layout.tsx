import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import Favorites from "./favorites";
import { COLORS } from "@/src/theme/global";
import Home from ".";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import News from "./news";
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
                            <Entypo name="home" size={18} color={color} />
                        )
                    }}
                />
                <Tab.Screen
                    name="news"
                    component={News}
                    options={{
                        tabBarShowLabel: true,
                        tabBarLabel: 'Notícias',
                        tabBarIcon: ({ color }) => (
                            <FontAwesome6 name="newspaper" size={18} color={color} />
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
                            <Entypo name="heart" size={20} color={color} />
                        )
                    }}
                />
            </Tab.Navigator>
        </>
    )
}