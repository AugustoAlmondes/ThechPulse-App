import FavoriteCardNews from "@/src/components/favorite/FavoriteNewsCard";
import CardNews from "@/src/components/favorite/FavoriteNewsCard";
import FavoriteNews from "@/src/components/home/FavoriteNews";
import News from "@/src/components/home/News";
import Header from "@/src/components/layout/Header";
import Card from "@/src/components/shared/Card";
import { REAL_NEWS } from "@/src/constants/news";
import { SUBJECTS } from "@/src/constants/subjects";
import { useThemeColors } from "@/src/hooks/useThemeColors";
import { COLORS } from "@/src/theme/global";
import Feather from "@expo/vector-icons/Feather";
import { FlatList, TextInput, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Favorites() {
    const theme = useThemeColors();

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

                <View style={{ gap: 15, marginBottom: 10 }}>
                    {
                        REAL_NEWS.news.map((item, index) => (
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

                </View>
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