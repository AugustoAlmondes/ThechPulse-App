import Header from "@/src/components/layout/Header";
import Card from "@/src/components/shared/Card";
import { useThemeColors } from "@/src/hooks/useThemeColors";
import { useFavoriteStore } from "@/src/store/useFavoriteStore";
import { useScrollStore } from "@/src/store/useScrollStore";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef, useState } from "react";
import { TextInput, ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS } from "@/src/theme/global";

export default function Favorites() {
    const theme = useThemeColors();
    const { favoriteNews } = useFavoriteStore();
    const { shouldScrollToTop, resetScroll } = useScrollStore();
    const ScrollViewRef = useRef<ScrollView>(null);
    const [query, setQuery] = useState('');

    useEffect(() => {
        if (shouldScrollToTop) {
            ScrollViewRef.current?.scrollTo({ y: 0, animated: true });
            resetScroll();
        }
    }, [shouldScrollToTop, resetScroll])

    const filtered = query.trim()
        ? favoriteNews.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase())
        )
        : favoriteNews;

    return (
        <>
            <Header>
                <Text style={[styles.headerTitle, { color: theme.headerText }]}>Favoritos</Text>
                <View style={{ width: 26 }} />
            </Header>

            <ScrollView
                ref={ScrollViewRef}
                style={[styles.container, { backgroundColor: theme.background }]}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Barra de busca */}
                <View style={[styles.searchContainer, { backgroundColor: theme.searchBackground }]}>
                    <Feather name="search" color={theme.searchPlaceholder} size={18} />
                    <TextInput
                        placeholder="Buscar nos favoritos..."
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

                {/* Contador */}
                {favoriteNews.length > 0 && (
                    <View style={styles.countRow}>
                        <Text style={[styles.sectionTitle, { color: theme.textSubtle }]}>
                            SALVOS
                        </Text>
                        <View style={[styles.countBadge, { backgroundColor: theme.accentButton + '22' }]}>
                            <Text style={[styles.countText, { color: theme.accentButton }]}>
                                {filtered.length}
                            </Text>
                        </View>
                    </View>
                )}

                {/* Lista ou estado vazio */}
                {filtered.length > 0 ? (
                    <View style={styles.list}>
                        {filtered.map((item, index) => (
                            <Card
                                key={index}
                                data={item}
                                showDescription={false}
                                showImage={true}
                                showSubjects={true}
                                showDate={true}
                                color={theme.cardBackground}
                            />
                        ))}
                    </View>
                ) : (
                    <View style={styles.emptyState}>
                        <View style={[styles.emptyIconWrapper, { backgroundColor: theme.cardBackground }]}>
                            <Ionicons name="heart-outline" size={36} color={theme.textMuted} />
                        </View>
                        <Text style={[styles.emptyTitle, { color: theme.textPrimary }]}>
                            {query.trim()
                                ? 'Nenhum resultado'
                                : 'Nenhuma notícia favoritada'}
                        </Text>
                        <Text style={[styles.emptySubtitle, { color: theme.textMuted }]}>
                            {query.trim()
                                ? `Não encontramos favoritos com "${query}"`
                                : <>Toque no ícone {<Ionicons
                                name="heart"
                                size={20}
                                color={theme.textMuted}
                            />} de qualquer notícia para salvá-la aqui</>}
                        </Text>
                    </View>
                )}
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
        marginBottom: 32,
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