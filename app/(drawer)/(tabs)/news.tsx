import Header from "@/src/components/layout/Header";
import { useThemeColors } from "@/src/hooks/useThemeColors";
import { COLORS } from "@/src/theme/global";
import Feather from '@expo/vector-icons/Feather';
import { ActivityIndicator } from "react-native-paper";
import { FlatList, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Card from "@/src/components/shared/Card";
import { useEffect, useRef, useState } from "react";
import { useScrollStore } from "@/src/store/useScrollStore";
import { useFeed } from "@/src/hooks/useFeed";
import { queryClient } from "@/src/lib/react-query";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";

export default function AllNews() {
    const navigation = useNavigation();
    const theme = useThemeColors();
    const [query, setQuery] = useState('');
    const { shouldScrollToTop, resetScroll } = useScrollStore();
    const flatListRef = useRef<FlatList>(null);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const {
        data,
        isLoading,
        isError,
        isFetching,
        refetch,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useFeed();

    const handleRefresh = () => {
        if (isFetching) return;
        queryClient.invalidateQueries({ queryKey: ['feed'] });
    };

    const news = data?.pages.flatMap(page => page.news) || []

    useEffect(() => {
        if (shouldScrollToTop) {
            flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
            resetScroll();
        }
    }, [shouldScrollToTop, resetScroll])

    const filteredNews = query.trim()
        ? news.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase())
        )
        : news;

    const handleScroll = (event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setShowScrollTop(offsetY > 500);
    };

    const handleEndReached = () => {
        if (hasNextPage && !isFetchingNextPage && !isFetching) {
            fetchNextPage();
        }
    };

    const scrollToTop = () => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    };

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
                    disabled={isFetching}
                    activeOpacity={0.7}
                    style={[styles.retryButton, { backgroundColor: theme.accentButton, opacity: isFetching ? 0.6 : 1 }]}
                >
                    {isFetching ? (
                        <ActivityIndicator size="small" color={COLORS.neutral.white} />
                    ) : (
                        <Feather name="refresh-cw" size={15} color={COLORS.neutral.white} />
                    )}
                    <Text style={{ color: COLORS.neutral.white, fontWeight: 'bold', fontSize: 14 }}>
                        {isFetching ? 'Carregando...' : 'Tentar novamente'}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={[styles.wrapper, { backgroundColor: theme.background }]}>
            <Header>
                <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                    <Feather name="menu" size={26} color={theme.headerIcon} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.headerText }]}>Notícias</Text>
                <View style={{ width: 26 }} />
            </Header>

            <FlatList
                ref={flatListRef}
                data={filteredNews}
                keyExtractor={(item, index) => item.id + '-' + index}
                renderItem={({ item }) => (
                    <View style={{ paddingHorizontal: 16, marginBottom: 12 }}>
                        <Card data={item} color={theme.cardBackground} />
                    </View>
                )}
                ListHeaderComponent={
                    <View style={{ paddingHorizontal: 16 }}>
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
                    </View>
                }
                ListEmptyComponent={
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
                }
                ListFooterComponent={
                    <View style={{ paddingBottom: 24, alignItems: 'center' }}>
                        {isFetchingNextPage && (
                            <View style={{ paddingVertical: 16 }}>
                                <ActivityIndicator size="small" color={theme.accentButton} />
                            </View>
                        )}
                    </View>
                }
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.5}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                refreshControl={
                    <RefreshControl refreshing={isFetching && !isFetchingNextPage} onRefresh={handleRefresh} />
                }
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
            />

            {showScrollTop && (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={scrollToTop}
                    style={[styles.scrollTopBtn, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
                >
                    <Feather name="arrow-up" size={22} color={theme.textPrimary} />
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
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
    scrollTopBtn: {
        position: 'absolute',
        bottom: 24,
        right: 16,
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
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
