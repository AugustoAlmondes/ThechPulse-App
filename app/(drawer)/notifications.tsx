import Header from "@/src/components/layout/Header";
import { useThemeColors } from "@/src/hooks/useThemeColors";
import { COLORS } from "@/src/theme/global";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View, Switch, ScrollView } from "react-native";
import { useNotifications } from "@/src/hooks/useNotifications";

export default function Notifications() {
    const theme = useThemeColors();
    const { enabled, toggleNotifications, lastNotificationAt } = useNotifications();

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
            <ScrollView style={[styles.container, { backgroundColor: theme.background }]} contentContainerStyle={styles.scrollContent}>
                <View style={[styles.card, { backgroundColor: theme.settingItemBackground }]}>
                    <View style={styles.cardHeader}>
                        <View style={styles.cardLeft}>
                            <Feather name="bell" size={20} color={COLORS.badges.indigo} />
                            <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>Notificações locais</Text>
                        </View>
                        <Switch
                            value={enabled}
                            onValueChange={() => { void toggleNotifications(); }}
                            trackColor={{ false: theme.textDisabled + '40', true: COLORS.badges.indigo }}
                            thumbColor={enabled ? COLORS.neutral.white : theme.textMuted}
                        />
                    </View>
                    <Text style={[styles.cardDescription, { color: theme.textTertiary }]}>
                        {enabled
                            ? 'Ativadas — você será avisado sobre novas notícias enquanto o app estiver aberto (07:00–22:00, até 2 por dia, intervalo 60 min).'
                            : 'Desativadas — ative para receber avisos sobre novas notícias.'}
                    </Text>
                    {enabled && lastNotificationAt && (
                        <Text style={[styles.cardHint, { color: theme.textMuted }]}>
                            Última notificação: {new Date(lastNotificationAt).toLocaleString('pt-BR')}
                        </Text>
                    )}
                </View>

                <View style={styles.infoContent}>
                    <Feather name="info" size={20} color={theme.textMuted} />
                    <Text style={[styles.infoText, { color: theme.textTertiary }]}>
                        As verificações usam os idiomas selecionados em Configurações → Idioma das Notícias e são feitas enquanto o app está em primeiro plano.
                    </Text>
                </View>

                {!enabled && (
                    <View style={styles.placeholderContent}>
                        <Feather name="bell-off" size={40} color={theme.textMuted} />
                        <Text style={[styles.placeholderText, { color: theme.textTertiary }]}>
                            Notificações desabilitadas
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        gap: 20,
    },
    card: {
        borderRadius: 12,
        padding: 16,
        gap: 12,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    cardDescription: {
        fontSize: 13,
        lineHeight: 18,
    },
    cardHint: {
        fontSize: 12,
        marginTop: 4,
    },
    infoContent: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'flex-start',
        paddingHorizontal: 4,
    },
    infoText: {
        flex: 1,
        fontSize: 13,
        lineHeight: 18,
    },
    placeholderContent: {
        alignItems: 'center',
        gap: 12,
        marginTop: 20,
    },
    placeholderText: {
        fontSize: 14,
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