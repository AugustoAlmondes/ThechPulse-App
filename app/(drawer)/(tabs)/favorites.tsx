import Header from "@/src/components/layout/Header";
import Card from "@/src/components/shared/Card";
import { useThemeColors } from "@/src/hooks/useThemeColors";
import { useFavoriteStore } from "@/src/store/useFavoriteStore";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextInput, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Favorites() {
    const theme = useThemeColors();
    const { favoriteNews } = useFavoriteStore();
    return (
        <>
            <Header>
                <Text style={[styles.headerTitle, { color: theme.headerText }]}>Favoritas</Text>
            </Header>
            <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>

                <View style={[styles.searchContainer, { backgroundColor: theme.searchBackground }]}>
                    <Feather name="search" color={theme.searchPlaceholder} size={24} />
                    <TextInput
                        placeholder="Buscar"
                        placeholderTextColor={theme.searchPlaceholder}
                        style={[styles.searchInput, { color: theme.searchText }]}
                    />
                </View>

                {favoriteNews.length > 0 ? <View style={{ gap: 15, marginBottom: 10 }}>
                    {
                        favoriteNews.map((item, index) => (
                            <Card
                                key={index}
                                data={item}
                                showDescription={false}
                                showImage={false}
                                showSubjects={false}
                                showDate={false}
                                color={theme.cardBackground}
                            />
                        ))
                    }

                </View> : (
                    <View style={{ flex: 1, marginTop: 150, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 20 }}>
                        <Text style={[styles.headerTitle, { color: theme.textDisabled, textAlign: 'center' }]}>Nenhuma notícia favoritada</Text>
                        <Ionicons name="heart-outline" size={40} color={theme.textDisabled + 70} />
                    </View>
                )}
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 35,
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
    title: {
    },
    headerTitle: {
        width: '100%',
        fontSize: 22,
        fontWeight: '200'
    },
})