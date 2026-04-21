import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import Favorites from "./favorites";
import { useThemeColors } from "@/src/hooks/useThemeColors";
import Home from ".";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import AllNews from "./news";
import ReadLater from "./read";
import Profile from "./profile";
const Tab = createMaterialTopTabNavigator();

const DEFAULT_CONFIG_TAB = {
    tabBarShowLabel: true,
    tabBarLabelStyle: { 
        fontSize: 12,
    },
}
export default function TabsLayout() {
    const theme = useThemeColors();

    return (
        <>
            <Tab.Navigator
                tabBarPosition="bottom"
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: theme.tabBarBackground,
                        height: 70,
                        paddingBottom: 8,
                    },
                    tabBarIndicatorStyle: {
                        width: 0
                    },
                    tabBarActiveTintColor: theme.tabBarActive,
                    tabBarInactiveTintColor: theme.tabBarInactive,
                    animationEnabled: false,
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
                        ...DEFAULT_CONFIG_TAB,
                        tabBarLabel: 'Início',
                        tabBarIcon: ({ color }) => (
                            <Entypo name="home" size={18} color={color} />
                        )
                    }}
                />
                <Tab.Screen
                    name="news"
                    component={AllNews}
                    options={{
                        ...DEFAULT_CONFIG_TAB,
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
                        ...DEFAULT_CONFIG_TAB,
                        tabBarLabel: 'Favoritos',
                        tabBarIcon: ({ color }) => (
                            <Entypo name="heart" size={20} color={color} />
                        )
                    }}
                />
                <Tab.Screen
                    name="read"
                    component={ReadLater}
                    options={{
                        ...DEFAULT_CONFIG_TAB,
                        tabBarLabel: 'Ler depois',
                        tabBarIcon: ({ color }) => (
                            <Entypo name="book" size={20} color={color} />
                        )
                    }}
                />
            </Tab.Navigator>
        </>
    )
}