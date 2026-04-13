import { COLORS } from "@/src/theme/global";
import { StyleSheet, Text, View } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Header({ title }: { title: string }) {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <FontAwesome
                    name="search"
                    size={24}
                    color="white"
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        top:0,
        zIndex:99,
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