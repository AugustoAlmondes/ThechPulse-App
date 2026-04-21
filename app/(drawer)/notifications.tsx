import Header from "@/src/components/layout/Header";
import { useThemeColors } from "@/src/hooks/useThemeColors";
import { COLORS } from "@/src/theme/global";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Notifications() {
    const theme = useThemeColors();

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            <Header>
                <View style={styles.headerContent}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => router.replace('/(drawer)/settings')}
                    >
                        <Feather
                            name="arrow-left"
                            size={27}
                            color={theme.headerIcon}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: theme.headerText }]}>Notificações</Text>
                </View>
            </Header>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Feather name="bell" size={64} color={COLORS.primary[500]} />
                    <Text style={[styles.title, { color: theme.textPrimary }]}>Notificações</Text>
                    <Text style={[styles.description, { color: theme.textTertiary }]}>
                        Você não tem notificações no momento.
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
        gap: 20,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    headerTitle: {
        fontSize: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
    },
});