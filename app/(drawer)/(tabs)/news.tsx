import Header from "@/src/components/layout/Header";
import { useThemeColors } from "@/src/hooks/useThemeColors";
import { COLORS } from "@/src/theme/global";
import Feather from '@expo/vector-icons/Feather';
import { ActivityIndicator } from "react-native-paper";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Card from "@/src/components/shared/Card";
import { useEffect, useRef, useState } from "react";
import { useScrollStore } from "@/src/store/useScrollStore";
import { useFeed } from "@/src/hooks/useFeed";

export default function AllNews() {
    const theme = useThemeColors();
    const [query, setQuery] = useState('');
    const { shouldScrollToTop, resetScroll } = useScrollStore();
    const ScrollViewRef = useRef<ScrollView>(null);
    const {
        data,
        isLoading,
        isError,
        refetch,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useFeed();

    const news = data?.pages.flatMap(page => page.news) || []

    useEffect(() => {
        if (shouldScrollToTop) {
            ScrollViewRef.current?.scrollTo({ y: 0, animated: true });
            resetScroll();
        }
    }, [shouldScrollToTop, resetScroll])

    const filteredNews = query.trim()
        ? news.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase())
        )
        : news;

    if (isLoading) {
        return (
            <View style={[styles.centered, { backgroundColor: theme.background }]}>
                <ActivityIndicator size="large" color={theme.accentButton} />
            </View>
        )
    }

    if (isError) {
        return (
            <View style={[styles.centered, { backgroundColor: theme.background, padding: 20 }]}>
                <Feather name="wifi-off" size={40} color={theme.textMuted} style={{ marginBottom: 12 }} />
                <Text style={{ color: theme.textPrimary, fontSize: 16, fontWeight: '600', marginBottom: 6 }}>
                    Sem conexão
                </Text>
                <Text style={{ color: theme.textMuted, fontSize: 14, textAlign: 'center', marginBottom: 20 }}>
                    Não foi possível carregar as notícias.
                </Text>
                <TouchableOpacity
                    onPress={() => refetch()}
                    style={[styles.retryButton, { backgroundColor: theme.accentButton }]}
                >
                    <Feather name="refresh-cw" size={15} color={COLORS.neutral.white} />
                    <Text style={{ color: COLORS.neutral.white, fontWeight: 'bold', fontSize: 14 }}>
                        Tentar novamente
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <>
            <Header>
                <Text style={[styles.headerTitle, { color: theme.headerText }]}>Notícias</Text>
                <View style={{ width: 26 }} />
            </Header>

            <ScrollView
                ref={ScrollViewRef}
                style={[styles.container, { backgroundColor: theme.background }]}
                keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}
            >
                {/* Barra de busca */}
                <View style={[styles.searchContainer, { backgroundColor: theme.searchBackground }]}>
                    <Feather name="search" color={theme.searchPlaceholder} size={18} />
                    <TextInput
                        placeholder="Buscar notícias..."
                        placeholderTextColor={theme.searchPlaceholder}
                        value={query}
                        onChangeText={setQuery}
                        style={[styles.searchInput, { color: theme.searchText }]}
                    />
                    {query.length > 0 && (
                        <Feather
                            name="x"
                            size={18}
                            color={theme.searchPlaceholder}
                            onPress={() => setQuery('')}
                        />
                    )}
                </View>

                {/* Contador + label */}
                <View style={styles.countRow}>
                    <Text style={[styles.sectionTitle, { color: theme.textSubtle }]}>
                        TODAS AS NOTÍCIAS
                    </Text>
                    {news.length > 0 && (
                        <View style={[styles.countBadge, { backgroundColor: theme.accentButton + '22' }]}>
                            <Text style={[styles.countText, { color: theme.accentButton }]}>
                                {filteredNews.length}
                            </Text>
                        </View>
                    )}
                </View>

                {/* Lista */}
                {filteredNews.length > 0 ? (
                    <View style={styles.list}>
                        {filteredNews.map((item, index) => (
                            <Card
                                key={index}
                                data={item}
                                color={theme.cardBackground}
                            />
                        ))}
                    </View>
                ) : (
                    <View style={styles.emptyState}>
                        <View style={[styles.emptyIconWrapper, { backgroundColor: theme.cardBackground }]}>
                            <Feather name="search" size={34} color={theme.textMuted} />
                        </View>
                        <Text style={[styles.emptyTitle, { color: theme.textPrimary }]}>
                            Nenhum resultado
                        </Text>
                        <Text style={[styles.emptySubtitle, { color: theme.textMuted }]}>
                            {`Não encontramos notícias com "${query}"`}
                        </Text>
                    </View>
                )}

                {/* Botão Carregar Mais */}
                {hasNextPage && (
                    <TouchableOpacity
                        onPress={() => fetchNextPage()}
                        activeOpacity={0.7}
                        style={[styles.loadMoreBtn, { borderColor: theme.accentButton + '80' }]}
                        disabled={isFetchingNextPage}
                    >
                        {isFetchingNextPage
                            ? <ActivityIndicator size="small" color={theme.accentButton} />
                            : <Text style={[styles.loadMoreText, { color: theme.accentButton }]}>
                                Carregar mais
                            </Text>
                        }
                    </TouchableOpacity>
                )}

                <View style={{ height: 24 }} />
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 14,
        marginVertical: 14,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        paddingVertical: 0,
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
    loadMoreBtn: {
        alignSelf: 'center',
        paddingHorizontal: 28,
        paddingVertical: 10,
        borderRadius: 50,
        borderWidth: 1.5,
        marginTop: 16,
        marginBottom: 4,
        minWidth: 140,
        alignItems: 'center',
    },
    loadMoreText: {
        fontWeight: '600',
        fontSize: 14,
    },
    retryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
})