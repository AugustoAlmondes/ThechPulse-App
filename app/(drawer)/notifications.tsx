import Header from "@/src/components/layout/Header";
import { COLORS } from "@/src/theme/global";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Notifications() {
    return (
        <>
            <Header>
                <View style={styles.headerContent}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => router.replace('/(drawer)/settings')}
                    >
                        <Feather
                            name="arrow-left"
                            size={27}
                            color="white"
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Notificações</Text>
                </View>
            </Header>
        </>
    )
}

const styles = StyleSheet.create({
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    headerTitle: {
        color: COLORS.neutral.white,
        fontSize: 24,
    },
});