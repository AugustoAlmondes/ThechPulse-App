import Header from "@/src/components/layout/Header";
import { useThemeColors } from "@/src/hooks/useThemeColors";
import { COLORS } from "@/src/theme/global";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { REAL_NEWS } from "@/src/constants/news";
import Card from "@/src/components/shared/Card";
import { useReadStore } from "@/src/store/useReadStore";
import { TypeNews } from "@/src/types/NewsType";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ReadLater() {
    const theme = useThemeColors();
    const read = useReadStore(state => state.readNews);
    const totalReadyNews = useReadStore(state => state.totalReadNews);
    const removeReadNews = useReadStore(state => state.removeReadNews);

    const remove = (data: TypeNews) => {
        removeReadNews(data)
    }

    return (
        <>
            <Header>
                <Text style={[styles.headerTitle, { color: theme.headerText }]}>Ler Depois</Text>
            </Header>

            <ScrollView style={[styles.container, { backgroundColor: theme.background }]}
                keyboardShouldPersistTaps='handled'
            >

                <View
                    style={{ flexDirection: 'row', gap: 15, }}
                >
                    <View
                        style={{
                            backgroundColor: theme.background,
                            height: 100,
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 10,
                            gap: 10
                        }}>

                        <Text style={{
                            textAlign: 'center',
                            width: '100%',
                            color: theme.statsText,
                            fontSize: 14,
                            fontWeight: '200',
                        }}>
                            Total para leitura:
                        </Text>

                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: '600',
                                color: theme.statsText,
                            }}
                        >
                            {totalReadyNews}
                        </Text>
                    </View>
                    {/* <View
                        style={{
                            backgroundColor: theme.statsBackground,
                            height: 100,
                            flex: 1,
                            width: 140,
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 10,
                            gap: 10
                        }}>

                        <Text style={{
                            textAlign: 'center',
                            width: '100%',
                            color: theme.statsText,
                            fontSize: 14,
                            fontWeight: '200',
                        }}>
                            Total lido:
                        </Text>

                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: '600',
                                color: theme.statsText,
                            }}
                        >
                            {REAL_NEWS.news.length + 12}
                        </Text>
                    </View> */}
                </View>
                <Text style={[styles.title, { color: theme.textPrimary }]}>Veja as notícias salvas por você para ler depois:</Text>
                {
                    read.length > 0 ?
                        <View style={{ gap: 15, marginBottom: 10 }}>

                            {
                                read.map((item, index) => (
                                    <Card
                                        key={index}
                                        data={item}
                                        showDescription={false}
                                        showDate={false}
                                        showSubjects={false}
                                        color={theme.cardBackground}
                                        actions={
                                            <TouchableOpacity
                                                onPress={() => remove(item)}
                                                activeOpacity={0.7}
                                                style={{ backgroundColor: COLORS.primary[700], paddingHorizontal: 13, paddingVertical: 3 }}>
                                                <Text style={{ color: COLORS.neutral.white, fontWeight: '600', fontSize: 12 }}>Lido</Text>
                                            </TouchableOpacity>
                                        }
                                    />
                                ))
                            }
                        </View> :
                        <View style={{ flex: 1, marginTop: 150, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 20 }}>
                            <Text style={[styles.headerTitle, { color: theme.textDisabled, textAlign: 'center' }]}>Nenhuma notícia salva para ler depois.</Text>
                            <Ionicons name="book-outline" size={40} color={theme.textDisabled + 70} />
                        </View>
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
        marginTop: 20,
        marginBottom: 10
    },
    headerTitle: {
        width: '100%',
        fontSize: 22,
        fontWeight: '200'
    },
})