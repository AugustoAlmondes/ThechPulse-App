import Header from "@/src/components/layout/Header";
import { SUBJECTS } from "@/src/constants/subjects";
import { COLORS } from "@/src/theme/global";
import Feather from '@expo/vector-icons/Feather';
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { NEWS as NEWS_DATA } from "@/src/constants/news";
// import CardNews from "@/src/components/home/GlobalNewsCard";
import News from "@/src/components/home/News";
import Card from "@/src/components/shared/Card";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";

export default function ReadLater() {
    return (
        <>
            <Header>
                <Text style={styles.headerTitle}>Ler Depois</Text>
            </Header>

            <ScrollView style={styles.container}
                keyboardShouldPersistTaps='handled'
            >

                <View
                    style={{ flexDirection: 'row', gap: 15, }}
                >
                    <View
                        style={{
                            backgroundColor: COLORS.secondary[700],
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
                            color: COLORS.secondary[200],
                            fontSize: 14,
                            fontWeight: '200',
                        }}>
                            Total para leitura:
                        </Text>

                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: '600',
                                color: COLORS.secondary[200],
                            }}
                        >
                            {NEWS_DATA.length}
                        </Text>
                    </View>
                    <View
                        style={{
                            backgroundColor: COLORS.secondary[700],
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
                            color: COLORS.secondary[200],
                            fontSize: 14,
                            fontWeight: '200',
                        }}>
                            Total lido:
                        </Text>

                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: '600',
                                color: COLORS.secondary[200],
                            }}
                        >
                            {NEWS_DATA.length + 12}
                        </Text>
                    </View>
                </View>
                <Text style={styles.title}>Veja as notícias salvas por você para ler depois:</Text>
                <View style={{ gap: 15, marginBottom: 10 }}>

                    {
                        NEWS_DATA.map((item, index) => (
                            <Card
                                key={index}
                                data={item}
                                showDescription={false}
                                showDate={false}
                                showSubjects={false}
                                color={COLORS.neutral[800]}
                                actions={
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        style={{ backgroundColor: COLORS.primary[700], paddingHorizontal: 13, paddingVertical: 3 }}>
                                        <Text style={{ color: COLORS.neutral.white, fontWeight: '600', fontSize: 12 }}>Lido</Text>
                                    </TouchableOpacity>
                                }
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
        backgroundColor: COLORS.neutral[900],
        paddingHorizontal: 15,
    },
    title: {
        color: COLORS.neutral.white,
        marginTop: 20,
        marginBottom: 10
    },
    headerTitle: {
        width: '100%',
        color: COLORS.neutral.white,
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
        backgroundColor: COLORS.neutral[700] + 70,
    },
    searchInput: {
        width: '100%',
        color: COLORS.neutral.white,
        height: 40,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    subjectsBody: {
        width: '100%',
        marginBottom: 15,
    },
    subjects: {
        color: COLORS.neutral.white,
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
})