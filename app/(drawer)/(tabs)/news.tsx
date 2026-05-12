import Header from "@/src/components/layout/Header";
import { useThemeColors } from "@/src/hooks/useThemeColors";
import { COLORS } from "@/src/theme/global";
import Feather from '@expo/vector-icons/Feather';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Card from "@/src/components/shared/Card";
import { useEffect, useRef, useState } from "react";
import { useScrollStore } from "@/src/store/useScrollStore";
import { useFeed } from "@/src/hooks/useFeed";
import { ActivityIndicator } from "react-native-paper";

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
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: theme.background,
                }}
            >
                <ActivityIndicator size="large" color={theme.textPrimary} />
            </View>
        )
    }

    if (isError) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20,
                    backgroundColor: theme.background,
                }}
            >
                <Text
                    style={{
                        color: theme.textPrimary,
                        marginBottom: 10,
                    }}
                >
                    Erro ao carregar notícias
                </Text>

                <TouchableOpacity
                    onPress={() => refetch()}
                >
                    <Text
                        style={{
                            color: theme.accentButton,
                        }}
                    >
                        Tentar novamente
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <>
            <Header>
                <Text style={[styles.headerTitle, { color: theme.headerText }]}>Últimas Notícias</Text>
            </Header>

            <ScrollView
                ref={ScrollViewRef}
                style={[styles.container, { backgroundColor: theme.background }]}
                keyboardShouldPersistTaps='handled'
            >

                <View style={{ gap: 25, marginBottom: 10 }}>

                    {filteredNews.length > 0 ? (
                        filteredNews.map((item, index) => (
                            <Card
                                key={index}
                                data={item}
                                color={theme.cardBackground}
                            />
                        ))
                    ) : (
                        <View style={styles.emptyState}>
                            <Feather name="search" size={40} color={theme.textMuted} />
                            <Text style={[styles.emptyTitle, { color: theme.textPrimary }]}>
                                Nenhum resultado
                            </Text>
                            <Text style={[styles.emptySubtitle, { color: theme.textMuted }]}>
                                {'Não encontramos notícias com "' + query + '"'}
                            </Text>
                        </View>
                    )}
                </View>
                {
                    hasNextPage && (
                        <TouchableOpacity
                            onPress={() => fetchNextPage()}
                            style={[
                                styles.button,
                                {
                                    backgroundColor:
                                        theme.accentButton + '60',
                                    alignSelf: 'center',
                                }
                            ]}
                        >
                            <Text
                                style={{
                                    color: theme.textPrimary,
                                }}
                            >
                                {
                                    isFetchingNextPage
                                        ? 'Carregando...'
                                        : 'Carregar mais'
                                }
                            </Text>
                        </TouchableOpacity>
                    )
                }
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
    title: {
    },
    headerTitle: {
        width: '100%',
        fontSize: 22,
        fontWeight: '200'
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        paddingVertical: 4,
        gap: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    searchInput: {
        width: '100%',
        height: 40,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    subjectsBody: {
        width: '100%',
        marginBottom: 15,
    },
    subjects: {
        fontSize: 14,
        paddingVertical: 6,
        borderRadius: 20
    },
    subject: {
        color: COLORS.neutral.white,
        fontSize: 16,
        marginRight: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: 'flex-start',
        backgroundColor: COLORS.primary[700],
        borderRadius: 20,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
        gap: 12,
    },
        button: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        paddingHorizontal: 24,
        paddingVertical: 10,
        marginTop: 10,
        borderRadius: 10,
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    emptySubtitle: {
        fontSize: 14,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
})