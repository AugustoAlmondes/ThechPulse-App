import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from "@react-navigation/material-top-tabs"
import Favorites from "./favorites";
import { useThemeColors } from "@/src/hooks/useThemeColors";
import Home from ".";
import Entypo from '@expo/vector-icons/Entypo';
import AllNews from "./news";
import ReadLater from "./read";
import { useScrollStore } from "@/src/store/useScrollStore";
import { View, TouchableOpacity, StyleSheet, Platform, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createMaterialTopTabNavigator();

const TAB_ITEMS = [
    {
        name: 'index',
        label: 'Início',
        icon: (color: string, focused: boolean) => (
            <Ionicons name={focused ? "home-sharp" : "home-outline"} size={25} color={color} />
        ),
    },
    {
        name: 'news',
        label: 'Notícias',
        icon: (color: string, focused: boolean) => (
            <Ionicons name={focused ? "newspaper" : "newspaper-outline"} size={25} color={color} />
        ),
    },
    {
        name: 'favorites',
        label: 'Favoritos',
        icon: (color: string, focused: boolean) => (
            <Entypo name={focused ? "heart" : "heart-outlined"} size={25} color={color} />
        ),
    },
    {
        name: 'read',
        label: 'Ler depois',
        icon: (color: string, focused: boolean) => (
            <Ionicons name={focused ? "bookmark" : "bookmark-outline"} size={25} color={color} />
        ),
    },
];

function CustomTabBar({ state, descriptors, navigation, position }: MaterialTopTabBarProps) {
    const theme = useThemeColors();

    return (
        // <View style={[styles.tabBarWrapper, { backgroundColor: theme.headerBackground }]}>
            <View style={[styles.tabBarPill, { backgroundColor: theme.tabBarBackground }]}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;
                    const tabItem = TAB_ITEMS.find(t => t.name === route.name);
                    const label = tabItem?.label ?? route.name;

                    const activeColor = theme.tabBarActive;
                    const inactiveColor = theme.tabBarInactive;
                    const color = isFocused ? activeColor : inactiveColor;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });
                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    return (
                        <TouchableOpacity
                            key={route.key}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            onPress={onPress}
                            activeOpacity={0.8}
                            style={styles.tabItem}
                        >
                            <View style={[
                                styles.iconContainer,
                                isFocused && { backgroundColor: theme.accentButton + '22', borderRadius: 15, }
                            ]}>
                                {tabItem?.icon(color, isFocused)}
                            </View>
                            <Text style={[
                                styles.tabLabel,
                                { color },
                                isFocused && styles.tabLabelActive,
                            ]}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            {/* </View> */}
        </View>
    );
}

export default function TabsLayout() {
    const triggerScrollToTop = useScrollStore(state => state.triggerScrollToTop);

    return (
        <>
            <Tab.Navigator
                tabBarPosition="bottom"
                tabBar={(props) => <CustomTabBar {...props} />}
                screenListeners={{
                    tabPress: () => {
                        triggerScrollToTop();
                    },
                }}
                screenOptions={{
                    animationEnabled: false,
                }}
            >
                <Tab.Screen
                    name="index"
                    component={Home}
                    options={{ tabBarLabel: 'Início' }}
                />
                <Tab.Screen
                    name="news"
                    component={AllNews}
                    options={{ tabBarLabel: 'Notícias' }}
                />
                <Tab.Screen
                    name="favorites"
                    component={Favorites}
                    options={{ tabBarLabel: 'Favoritos' }}
                />
                <Tab.Screen
                    name="read"
                    component={ReadLater}
                    options={{ tabBarLabel: 'Ler depois' }}
                />
            </Tab.Navigator>
        </>
    )
}

const styles = StyleSheet.create({
    tabBarWrapper: {
        // paddingHorizontal: 16,
        paddingBottom: Platform.OS === 'ios' ? 24 : 12,
        // paddingTop: 8,
    },
    tabBarPill: {
        flexDirection: 'row',
        // borderRadius: 20,
        paddingVertical: 8,
        // paddingHorizontal: 4,
        // ...Platform.select({
        //     android: {
        //         elevation: 8,
        //     },
        //     ios: {
        //         shadowColor: '#000',
        //         shadowOffset: { width: 0, height: 4 },
        //         shadowOpacity: 0.12,
        //         shadowRadius: 12,
        //     },
        // }),
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    iconContainer: {
        width: 60,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabLabel: {
        fontSize: 10,
        fontWeight: '500',
        letterSpacing: 0.2,
    },
    tabLabelActive: {
        fontWeight: '700',
    },
})