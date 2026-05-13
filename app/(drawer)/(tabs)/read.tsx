import Header from "@/src/components/layout/Header";
import { useThemeColors } from "@/src/hooks/useThemeColors";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Card from "@/src/components/shared/Card";
import { useReadStore } from "@/src/store/useReadStore";
import { TypeNews } from "@/src/types/NewsType";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { useScrollStore } from "@/src/store/useScrollStore";
import { useEffect, useRef } from "react";

export default function ReadLater() {
    const theme = useThemeColors();
    const read = useReadStore(state => state.readNews);
    const totalReadyNews = useReadStore(state => state.totalReadNews);
    const removeReadNews = useReadStore(state => state.removeReadNews);
    const { shouldScrollToTop, resetScroll } = useScrollStore();
    const ScrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        if (shouldScrollToTop) {
            ScrollViewRef.current?.scrollTo({ y: 0, animated: true });
            resetScroll();
        }
    }, [shouldScrollToTop, resetScroll])

    const remove = (data: TypeNews) => {
        removeReadNews(data)
    }

    return (
        <>
            <Header>
                <Text style={[styles.headerTitle, { color: theme.headerText }]}>Ler Depois</Text>
                <View style={{ width: 26 }} />
            </Header>

            <ScrollView
                ref={ScrollViewRef}
                style={[styles.container, { backgroundColor: theme.background }]}
                keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}
            >
                {/* Card de estatística */}
                <View style={[styles.statsCard, { backgroundColor: theme.cardBackground }]}>
                    <View style={[styles.statsIconWrapper]}>
                        <Ionicons name="bookmark" size={42} color={theme.cardDate} />
                    </View>
                    <View style={styles.statsText}>
                        <Text style={[styles.statsLabel, { color: theme.textMuted }]}>
                            Salvas para leitura
                        </Text>
                        <Text style={[styles.statsCount, { color: theme.textPrimary }]}>
                            {totalReadyNews} {totalReadyNews === 1 ? 'notícia' : 'notícias'}
                        </Text>
                    </View>
                </View>

                {/* Seção de lista */}
                {read.length > 0 ? (
                    <>
                        <View style={styles.countRow}>
                            <Text style={[styles.sectionTitle, { color: theme.textSubtle }]}>
                                NA FILA
                            </Text>
                            <View style={[styles.countBadge, { backgroundColor: theme.accentButton + '22' }]}>
                                <Text style={[styles.countText, { color: theme.accentButton }]}>
                                    {read.length}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.list}>
                            {read.map((item, index) => (
                                <Card
                                    key={index}
                                    data={item}
                                    showDescription={false}
                                    showDate={true}
                                    showSubjects={true}
                                    color={theme.cardBackground}
                                    actions={
                                        <TouchableOpacity
                                            onPress={() => remove(item)}
                                            activeOpacity={0.7}
                                            style={[styles.readBtn, { backgroundColor: theme.accentButton + '22' }]}
                                        >
                                            <Feather name="check" size={13} color={theme.accentButton} />
                                            <Text style={[styles.readBtnText, { color: theme.accentButton }]}>
                                                Lido
                                            </Text>
                                        </TouchableOpacity>
                                    }
                                />
                            ))}
                        </View>
                    </>
                ) : (
                    <View style={styles.emptyState}>
                        <View style={[styles.emptyIconWrapper, { backgroundColor: theme.cardBackground }]}>
                            <Ionicons name="book-outline" size={36} color={theme.textMuted} />
                        </View>
                        <Text style={[styles.emptyTitle, { color: theme.textPrimary }]}>
                            Nenhuma notícia salva
                        </Text>
                        <Text style={[styles.emptySubtitle, { color: theme.textMuted }]}>
                            Toque no 🔖 de qualquer notícia para salvá-la aqui e ler quando quiser
                        </Text>
                    </View>
                )}

                <View style={{ height: 32 }} />
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
    },
    statsCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        borderRadius: 16,
        padding: 16,
        marginVertical: 14,
    },
    statsIconWrapper: {
        width: 48,
        height: 48,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statsText: {
        gap: 3,
    },
    statsLabel: {
        fontSize: 12,
        fontWeight: '500',
    },
    statsCount: {
        fontSize: 18,
        fontWeight: '700',
    },
    countRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1.2,
    },
    countBadge: {
        borderRadius: 50,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    countText: {
        fontSize: 12,
        fontWeight: '700',
    },
    list: {
        gap: 12,
    },
    readBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 8,
    },
    readBtnText: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        fontSize: 13,
        fontWeight: '600',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 80,
        gap: 16,
        paddingHorizontal: 20,
    },
    emptyIconWrapper: {
        width: 72,
        height: 72,
        borderRadius: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyTitle: {
        fontSize: 17,
        fontWeight: '600',
        textAlign: 'center',
    },
    emptySubtitle: {
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
    },
})