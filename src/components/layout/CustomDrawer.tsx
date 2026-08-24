import { useThemeColors } from "@/src/hooks/useThemeColors";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { View, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";

export default function CustomDrawer(props: any) {

    const theme = useThemeColors();

    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={styles.container}
            style={[styles.scroll, { backgroundColor: theme.drawerBackground }]}
        >

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
    drawerList: {
        flex: 1,
        marginTop: 30,
    },
});