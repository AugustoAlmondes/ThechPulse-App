import Header from "@/src/components/layout/Header";
import { SUBJECTS } from "@/src/constants/subjects";
import { useThemeColors } from "@/src/hooks/useThemeColors";
import { COLORS } from "@/src/theme/global";
import Feather from '@expo/vector-icons/Feather';
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { REAL_NEWS } from "@/src/constants/news";
import Card from "@/src/components/shared/Card";
import { useState } from "react";

export default function AllNews() {
    const theme = useThemeColors();
    const [query, setQuery] = useState('');

    const filteredNews = query.trim()
        ? REAL_NEWS.news.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase())
          )
        : REAL_NEWS.news;

    return (
        <>
            <Header>
                <Text style={[styles.headerTitle, { color: theme.headerText }]}>Notícias</Text>
            </Header>

            <ScrollView 
                style={[styles.container, { backgroundColor: theme.background }]}
                keyboardShouldPersistTaps='handled'
            >
                <View style={[styles.searchContainer, { backgroundColor: theme.searchBackground }]}>
                    <Feather name="search" color={theme.searchPlaceholder} size={24} />
                    <TextInput
                        placeholder="Buscar por título"
                        placeholderTextColor={theme.searchPlaceholder}
                        style={[styles.searchInput, { color: theme.searchText }]}
                        value={query}
                        onChangeText={setQuery}
                        returnKeyType="search"
                        clearButtonMode="while-editing"
                        autoCorrect={false}
                    />
                </View>

                {!query.trim() && (
                    <View style={styles.subjectsBody}>
                        <Subjects/>
                    </View>
                )}

                <View style={{ gap: 25, marginBottom: 10 }}>
                    {!query.trim() && (
                        <Text style={[styles.title, { color: theme.textPrimary }]}>Últimas notícias</Text>
                    )}

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
                                Não encontramos notícias com "{query}"
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </>
    )
}

const Subjects = () => {
    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={(SUBJECTS)}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={styles.subjects}
            renderItem={({ item }) => (
                <Text style={styles.subject}>{item}</Text>
            )}
        />
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