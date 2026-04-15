import Header from "@/src/components/layout/Header";
import { COLORS } from "@/src/theme/global";
import { StyleSheet, Text, View } from "react-native";

export default function Favorites() {
    return (
        <>
        {/* <Header title="Favorites"/> */}
            <View style={styles.container}>
                <Text style={styles.title}>Favorites</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.neutral[900],
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: COLORS.neutral.white
    }
})