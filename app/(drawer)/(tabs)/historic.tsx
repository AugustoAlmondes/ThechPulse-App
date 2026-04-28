import Header from "@/src/components/layout/Header";
import Card from "@/src/components/shared/Card";
import { useThemeColors } from "@/src/hooks/useThemeColors";
import { HistoricDay, useHistoricStore } from "@/src/store/historicStore";
import { useScrollStore } from "@/src/store/useScrollStore";
import { COLORS } from "@/src/theme/global";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

// ─── Helper: formata 'YYYY-MM-DD' para texto legível em pt-BR ─────────────────
function formatDate(dateStr: string): string {
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    if (dateStr === today) return "Hoje";
    if (dateStr === yesterday) return "Ontem";

    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function Historic() {
    const theme = useThemeColors();
    const days = useHistoricStore((state) => state.days);
    const removeHistoricEntry = useHistoricStore((state) => state.removeHistoricEntry);
    const clearHistoric = useHistoricStore((state) => state.clearHistoric);
    const totalHistoric = useHistoricStore((state) => state.totalHistoric());
    const { shouldScrollToTop, resetScroll } = useScrollStore();
    const ScrollViewRef = useRef<ScrollView>(null);

    const handleClearAll = () => {
        Alert.alert(
            "Limpar histórico",
            "Tem certeza que deseja apagar todo o histórico de leituras?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Limpar", style: "destructive", onPress: clearHistoric },
            ]
        );
    };

    useEffect(() => {
        if (shouldScrollToTop) {
            ScrollViewRef.current?.scrollTo({ y: 0, animated: true });
            resetScroll();
        }
    }, [shouldScrollToTop, resetScroll])

    return (
        <>
            <Header>
                <View style={styles.headerRow}>
                    <Text style={[styles.headerTitle, { color: theme.headerText }]}>
                        Histórico
                    </Text>
                    {totalHistoric > 0 && (
                        <TouchableOpacity
                            onPress={handleClearAll}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Feather name="trash-2" size={20} color={theme.headerText} />
                        </TouchableOpacity>
                    )}
                </View>
            </Header>

            <ScrollView
                ref={ScrollViewRef}
                style={[styles.container, { backgroundColor: theme.background }]}
                contentContainerStyle={styles.content}
            >
                {/* ── Estado vazio ── */}
                {days.length === 0 && (
                    <View style={styles.emptyState}>
                        <Ionicons
                            name="time-outline"
                            size={48}
                            color={theme.textDisabled + "80"}
                        />
                        <Text style={[styles.emptyTitle, { color: theme.textPrimary }]}>
                            Nenhuma notícia lida
                        </Text>
                        <Text style={[styles.emptySubtitle, { color: theme.textMuted }]}>
                            As notícias que você abrir aparecerão aqui, organizadas por dia.
                        </Text>
                    </View>
                )}

                {/* ── Lista agrupada por dia ── */}
                {days.map((day: HistoricDay) => (
                    <View key={day.date} style={styles.dayGroup}>
                        {/* Cabeçalho do dia */}
                        <View style={styles.dayHeader}>
                            <View
                                style={[
                                    styles.dayDot,
                                    { backgroundColor: COLORS.primary[700] },
                                ]}
                            />
                            <Text style={[styles.dayLabel, { color: theme.textPrimary }]}>
                                {formatDate(day.date)}
                            </Text>
                            <Text style={[styles.dayCount, { color: theme.textMuted }]}>
                                {day.entries.length}{" "}
                                {day.entries.length === 1 ? "notícia" : "notícias"}
                            </Text>
                        </View>

                        {/* Cards das notícias do dia */}
                        <View style={styles.cards}>
                            {day.entries.map((entry) => (
                                <View key={entry.news.id} style={styles.cardWrapper}>
                                    <Card
                                        data={entry.news}
                                        color={theme.cardBackground}
                                        showDescription={false}
                                        showDate={false}
                                        showSubjects={false}
                                        actions={
                                            <TouchableOpacity
                                                onPress={() =>
                                                    removeHistoricEntry(entry.news.id, day.date)
                                                }
                                                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                                activeOpacity={0.7}
                                            >
                                                <Feather
                                                    name="x"
                                                    size={16}
                                                    color={theme.textMuted}
                                                />
                                            </TouchableOpacity>
                                        }
                                    />
                                </View>
                            ))}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </>
    );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 15,
        paddingBottom: 20,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "200",
    },
    emptyState: {
        flex: 1,
        marginTop: 120,
        alignItems: "center",
        gap: 14,
        paddingHorizontal: 30,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
    },
    emptySubtitle: {
        fontSize: 14,
        textAlign: "center",
        lineHeight: 20,
    },
    dayGroup: {
        marginBottom: 28,
    },
    dayHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
        marginTop: 8,
    },
    dayDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    dayLabel: {
        fontSize: 15,
        fontWeight: "600",
        flex: 1,
    },
    dayCount: {
        fontSize: 12,
    },
    cards: {
        gap: 10,
    },
    cardWrapper: {
        flex: 1,
    },
});
