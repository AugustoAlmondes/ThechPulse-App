import Header from "@/src/components/layout/Header";
import { COLORS } from "@/src/theme/global";
import Feather from '@expo/vector-icons/Feather';
import { Keyboard, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function News() {
    return (
        <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
            <Header>
                <Text style={styles.headerTitle}>Notícias</Text>
            </Header>

            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <Feather name="search" color={COLORS.neutral[400]} size={24} />
                    <TextInput
                        placeholder="Buscar"
                        placeholderTextColor={COLORS.neutral[400]}
                        style={styles.searchInput}
                    />
                </View>
                {/* <Text style={styles.title}>News</Text> */}
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.neutral[900],
        paddingHorizontal: 15,
    },
    title: {
        color: COLORS.neutral.white
    },
    headerTitle: {
        width: '100%',
        color: COLORS.neutral.white,
        fontSize: 22,
        fontWeight: '200'
    },
    searchContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        paddingVertical: 4,
        gap: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: COLORS.neutral[700] + 70,
    },
    searchInput: {
        width: '100%',
        color: COLORS.neutral.white,
        height: 40,
        paddingHorizontal: 10,
        paddingVertical: 4,
    }
})