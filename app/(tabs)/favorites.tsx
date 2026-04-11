import { COLORS } from "@/src/theme/global";
import { StyleSheet, Text, View } from "react-native";

export default function Favorites() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Favorites</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.neutral[800],
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: COLORS.neutral.white
    }
})