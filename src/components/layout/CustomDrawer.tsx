import { useThemeColors } from "@/src/hooks/useThemeColors";
import { COLORS } from "@/src/theme/global";
import Entypo from "@expo/vector-icons/Entypo";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Divider } from "react-native-paper";
import { useState } from "react";
import { router } from "expo-router";

export default function CustomDrawer(props: any) {

    const [isLogin, setIsLogin] = useState(true);
    const theme = useThemeColors();

    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={styles.container}
            style={[styles.scroll, { backgroundColor: theme.drawerBackground }]}
        >
            {
                isLogin ? <View style={styles.header}>
                    <View style={styles.userInfo}>
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/100' }}
                            style={styles.avatar}
                        />

                        <Text style={[styles.userName, { color: theme.textPrimary }]}>
                            Augusto Almondes
                        </Text>

                        <Text style={[styles.userEmail, { color: theme.textMuted }]}>
                            augusto@email.com
                        </Text>
                    </View>

                    <Image
                        source={require('@/public/images/1.jpg')}
                        style={styles.headerBackground}
                    />
                </View> :
                    <View style={styles.loginPlaceholder}>
                        <TouchableOpacity 
                            activeOpacity={0.8} 
                            style={styles.signInButton}
                            onPress={() => router.push('/login')}
                        >
                            <MaterialCommunityIcons name="login" size={20} color="white" />
                            <Text style={styles.signInButtonText}>Entrar em sua conta</Text>
                        </TouchableOpacity>
                        <Text style={[styles.signInSubtitle, { color: theme.textMuted }]}>Acesse seus favoritos e muito mais</Text>
                    </View>
            }

            <View style={styles.drawerList}>
                <DrawerItemList {...props} />
            </View>

            <Divider style={{ backgroundColor: theme.border, height: 2, marginBottom: 5 }} />
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 10,
    },
    scroll: {
    },
    loginPlaceholder: {
        height: 160,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    signInButton: {
        width: '100%',
        height: 48,
        flexDirection: 'row',
        borderRadius: 12,
        backgroundColor: COLORS.primary[500],
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        shadowColor: COLORS.primary[500],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    signInButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signInSubtitle: {
        fontSize: 12,
        textAlign: 'center',
    },
    header: {
        width: '100%',
        height: 160,
        position: 'relative',
    },
    settingsIcon: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    userInfo: {
        position: 'absolute',
        zIndex: 10,
        top: 35,
        left: 20,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 40,
        marginBottom: 10,
    },
    userName: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    userEmail: {
        fontSize: 13,
    },
    headerBackground: {
        height: '100%',
        width: '100%',
        borderRadius: 10,
        opacity: 0.3,
    },
    drawerList: {
        flex: 1,
        marginTop: 30,
    },
    logoutButton: {
        padding: 15,
        gap: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoutText: {
        fontSize: 15,
    },
});