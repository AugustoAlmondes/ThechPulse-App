import { COLORS } from "@/src/theme/global";
import Entypo from "@expo/vector-icons/Entypo";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { Divider } from "react-native-paper";

export default function CustomDrawer(props: any) {
    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={styles.container}
            style={styles.scroll}
        >
            <View style={styles.header}>

                <Fontisto
                    name="player-settings"
                    size={23}
                    color={COLORS.neutral[400]}
                    style={styles.settingsIcon}
                />

                <View style={styles.userInfo}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/100' }}
                        style={styles.avatar}
                    />

                    <Text style={styles.userName}>
                        Augusto Almondes
                    </Text>

                    <Text style={styles.userEmail}>
                        augusto@email.com
                    </Text>
                </View>

                <Image
                    source={require('@/public/images/1.jpg')}
                    style={styles.headerBackground}
                />
            </View>

            <View style={styles.drawerList}>
                <DrawerItemList {...props} />
            </View>

            <Divider style={{ backgroundColor: COLORS.neutral[800], height: 2, marginBottom: 5 }} />

            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.logoutButton}
            >
                <MaterialCommunityIcons
                    name="logout"
                    size={20}
                    color={COLORS.neutral.white}
                />
                <Text style={styles.logoutText}>
                    Sair
                </Text>
            </TouchableOpacity>
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
        backgroundColor: COLORS.neutral[900],
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
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
    },
    userEmail: {
        color: COLORS.neutral[400],
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
        // backgroundColor: COLORS.badges.red + '50',
        gap: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoutText: {
        color: COLORS.neutral.white,
        fontSize: 15,
    },
});