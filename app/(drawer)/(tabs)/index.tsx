import LastestNews from "@/src/components/home/LastestNews";
import Header from "@/src/components/layout/Header";
import { useThemeColors } from "@/src/hooks/useThemeColors";
import { COLORS } from "@/src/theme/global";
import { ActivityIndicator } from 'react-native-paper';
import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FavoriteNews from "@/src/components/home/FavoriteNews";
import Entypo from "@expo/vector-icons/Entypo";
import Card from "@/src/components/shared/Card";
import Feather from "@expo/vector-icons/Feather";
import { router, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { useFavoriteStore } from "@/src/store/useFavoriteStore";
import { useScrollStore } from "@/src/store/useScrollStore";
import { useEffect, useRef, useMemo } from "react";
import { useFeed } from "@/src/hooks/useFeed";
import { queryClient } from "@/src/lib/react-query";
import { useCheckUpdates } from "@/src/hooks/useCheckUpdates";
import { TypeNews } from "@/src/types/NewsType";

const RANK_COLORS = [COLORS.rank.gold, COLORS.rank.silver, COLORS.rank.bronze];
const RANK_LABELS = ['1º', '2º', '3º'];

export default function Home() {

    const navigation = useNavigation();
    const theme = useThemeColors();
    const scrollViewRef = useRef<ScrollView>(null);
    const { shouldScrollToTop, resetScroll } = useScrollStore();
    const favoriteNews = useFavoriteStore(state => state.favoriteNews);
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
    const latestTimestamp = news?.[0]?.published;
    const latestNews = news.find((n) => n.image !== null && n.image !== '' && n.image !== 'None')

    const randomNews = useMemo(() => {
        if (!news || news.length < 3) return [];
        const shuffled = [...news].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
    }, [news]);

    const { data: updates } = useCheckUpdates(latestTimestamp);

    useEffect(() => {
        if (shouldScrollToTop) {
            scrollViewRef.current?.scrollTo({ y: 0, animated: true });
            resetScroll();
        }
    }, [shouldScrollToTop, resetScroll])

    async function reloadFeed() {
        await queryClient.invalidateQueries({
            queryKey: ['feed'],
        });
        refetch();
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }

    if (isLoading) {
        return (
            <View style={[styles.centered, { backgroundColor: theme.background }]}>
                <ActivityIndicator size="large" color={theme.accentButton} />
            </View>
        )
    }

    if (isError || news.length === 0) {
        return (
            <>
                <Header>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    >
                        <Feather
                            name="menu"
                            size={26}
                            color={theme.headerIcon}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: theme.headerText }]}>TechPulse</Text>
                    <View style={{ width: 26 }} />
                </Header>
                <View style={[styles.centered, { backgroundColor: theme.background, padding: 20 }]}>
                    <Feather name={isError ? "wifi-off" : "alert-circle"} size={40} color={theme.textMuted} style={{ marginBottom: 12 }} />
                    <Text style={{ color: theme.textPrimary, fontSize: 16, fontWeight: '600', marginBottom: 6 }}>

                        {isError ? "Sem conexão" : "Erro ao carregar"}
                    </Text>
                    <Text style={{ color: theme.textMuted, fontSize: 14, textAlign: 'center', marginBottom: 20 }}>
                        {isError
                            ? "Não foi possível conectar ao servidor."
                            : "O servidor não retornou dados no momento."}
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
            </>
        )
    }

    return (
        <ScrollView
            ref={scrollViewRef}
            refreshControl={
                <RefreshControl
                    refreshing={isLoading}
                    onRefresh={refetch}
                    size="default"
                />
            }
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[0]}
            style={[styles.container, { backgroundColor: theme.background }]}
        >
            {/* Header sticky */}
            <Header>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                >
                    <Feather
                        name="menu"
                        size={26}
                        color={theme.headerIcon}
                    />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.headerText }]}>TechPulse</Text>
                <View style={{ width: 26 }} />
            </Header>

            {/* Banner de novas notícias */}
            {updates?.hasNew && (
                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={reloadFeed}
                    style={[styles.updateBanner, { backgroundColor: theme.accentButton }]}
                >
                    <Feather name="refresh-cw" size={14} color={COLORS.neutral.white} />
                    <Text style={styles.updateBannerText}>
                        {updates.count === 1
                            ? '1 nova notícia disponível'
                            : `${updates.count} novas notícias disponíveis`}
                    </Text>
                </TouchableOpacity>
            )}

            <View style={styles.body}>

                {/* ─── Notícia em Destaque ─── */}
                {news.length > 0 && (
                    <View style={styles.section}>
                        <SectionTitle label="EM DESTAQUE" />
                        <LastestNews latestNews={latestNews as TypeNews} />
                    </View>
                )}

                {/* ─── Meus Favoritos ─── */}
                {favoriteNews.length > 0 && (
                    <View style={styles.section}>
                        <View style={styles.sectionRow}>
                            <SectionTitle label="MEUS FAVORITOS" />
                            <TouchableOpacity
                                onPress={() => router.push('/(drawer)/(tabs)/favorites')}
                                activeOpacity={0.7}
                                style={styles.seeAllBtn}
                            >
                                <Text style={[styles.seeAllText, { color: theme.accentButton }]}>Ver todos</Text>
                                <Feather name='arrow-right' size={13} color={theme.accentButton} />
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={favoriteNews}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={{ paddingBottom: 4 }}
                            renderItem={({ item }) => (
                                <FavoriteNews item={item} />
                            )}
                        />
                    </View>
                )}

                {/* ─── Mais Acessadas (Aleatórias) ─── */}
                {randomNews.length === 3 && (
                    <View style={styles.section}>
                        <SectionTitle label="MAIS ACESSADAS" />
                        <View style={styles.rankList}>
                            {randomNews.map((item, idx) => (
                                <View key={idx} style={[styles.rankRow, { backgroundColor: theme.cardBackground }]}>
                                    <View style={styles.rankBadge}>
                                        <Entypo name="medal" size={20} color={RANK_COLORS[idx]} />
                                        <Text style={[styles.rankLabel, { color: RANK_COLORS[idx] }]}>
                                            {RANK_LABELS[idx]}
                                        </Text>
                                    </View>
                                    <View style={styles.rankCardWrapper}>
                                        <Card
                                            color="transparent"
                                            data={item}
                                            showDate={false}
                                            showAction={false}
                                            showCreator={false}
                                            showImage={false}
                                            showSubjects={true}
                                            minHeigth={0}
                                        />
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* ─── Últimas Atualizações ─── */}
                {news.length > 0 && (
                    <View style={styles.section}>
                        <SectionTitle label="ÚLTIMAS ATUALIZAÇÕES" />
                        <View style={styles.feedList}>
                            {news.map((item, index) =>{
                                if(index >= 10) return
                                return (
                                    <Card
                                        key={index}
                                        showDate={true}
                                        showAction={true}
                                        color={theme.cardBackground}
                                        data={item}
                                    />
                                )
                            })}
                        </View>
                    </View>
                )}
            </View>
        </ScrollView>
    )
}

function SectionTitle({ label }: { label: string }) {
    const theme = useThemeColors();
    return (
        <Text style={[styles.sectionTitle, { color: theme.textSubtle }]}>{label}</Text>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        paddingHorizontal: 16,
        paddingBottom: 32,
        gap: 28,
        marginTop: 12,
    },
    section: {
        gap: 12,
    },
    sectionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1.2,
    },
    seeAllBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    seeAllText: {
        fontSize: 13,
        fontWeight: '600',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
    },
    updateBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginHorizontal: 16,
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    updateBannerText: {
        color: COLORS.neutral.white,
        fontWeight: 'bold',
        fontSize: 13,
    },
    rankList: {
        gap: 10,
    },
    rankRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        overflow: 'hidden',
        paddingLeft: 12,
    },
    rankBadge: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        gap: 2,
    },
    rankLabel: {
        fontSize: 10,
        fontWeight: '700',
    },
    rankCardWrapper: {
        flex: 1,
    },
    feedList: {
        gap: 12,
    },
    loadMoreBtn: {
        alignSelf: 'center',
        paddingHorizontal: 28,
        paddingVertical: 10,
        borderRadius: 50,
        borderWidth: 1.5,
        marginTop: 4,
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