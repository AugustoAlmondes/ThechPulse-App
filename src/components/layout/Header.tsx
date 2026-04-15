import { COLORS } from "@/src/theme/global";
import { StyleSheet, Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

export default function Header({ title }: { title: string }) {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Entypo
                    name="menu"
                    size={28}
                    color="white"
                    />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        top: 0,
        zIndex: 99,
        backgroundColor: COLORS.neutral[900],
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        height: 80,
        paddingLeft: 30,
        paddingRight: 30,
    },
    title: {
        color: COLORS.neutral.white,
        fontSize: 20
    }
})