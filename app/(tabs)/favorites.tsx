import FavoriteCardNews from "@/src/components/favorite/FavoriteNewsCard";
import CardNews from "@/src/components/favorite/FavoriteNewsCard";
import FavoriteNews from "@/src/components/home/FavoriteNews";
import News from "@/src/components/home/News";
import Header from "@/src/components/layout/Header";
import Card from "@/src/components/shared/Card";
import { NEWS } from "@/src/constants/news";
import { SUBJECTS } from "@/src/constants/subjects";
import { COLORS } from "@/src/theme/global";
import Feather from "@expo/vector-icons/Feather";
import { FlatList, TextInput, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Favorites() {
    return (
        <>
            <Header>
                <Text style={styles.headerTitle}>Favoritas</Text>
            </Header>
            <ScrollView style={styles.container}>

                <View style={styles.searchContainer}>
                    <Feather name="search" color={COLORS.neutral[400]} size={24} />
                    <TextInput
                        placeholder="Buscar"
                        placeholderTextColor={COLORS.neutral[400]}
                        style={styles.searchInput}
                    />
                </View>

                <View style={{ gap: 15, marginBottom: 10 }}>
                    {
                        NEWS.map((item, index) => (
                            <Card
                                key={index}
                                data={item}
                                showDescription={false}
                                showImage={false}
                                showSubjects={false}
                                showDate={false}
                                color={COLORS.neutral[800]}
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
        backgroundColor: COLORS.neutral[900]
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 35,
        paddingVertical: 4,
        gap: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: COLORS.neutral[700] + 70,
    },
    searchInput: {
        width: '100%',
        color: COLORS.neutral.white,
        height: 40,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    title: {
        color: COLORS.neutral.white
    },
    headerTitle: {
        width: '100%',
        color: COLORS.neutral.white,
        fontSize: 22,
        fontWeight: '200'
    },
})