import Header from "@/src/components/layout/Header";
import { SUBJECTS } from "@/src/constants/subjects";
import { useThemeColors } from "@/src/hooks/useThemeColors";
import { COLORS } from "@/src/theme/global";
import Feather from '@expo/vector-icons/Feather';
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { NEWS as NEWS_DATA } from "@/src/constants/news";
import News from "@/src/components/home/News";
import Card from "@/src/components/shared/Card";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";

export default function Profile() {
    const theme = useThemeColors();

    return (
        <>
            <Header>
                <Text style={[styles.headerTitle, { color: theme.headerText }]}>Perfil</Text>
            </Header>

            <ScrollView style={[styles.container, { backgroundColor: theme.background }]}
                keyboardShouldPersistTaps='handled'
            >

                <View
                    style={{ flexDirection: 'row', gap: 15, }}
                >
                    <View
                        style={{
                            backgroundColor: theme.statsBackground,
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
                            {NEWS_DATA.length}
                        </Text>
                    </View>
                    <View
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
                            {NEWS_DATA.length + 12}
                        </Text>
                    </View>
                </View>
                <Text style={[styles.title, { color: theme.textPrimary }]}>Veja as notícias salvas por você para ler depois:</Text>
                <View style={{ gap: 15, marginBottom: 10 }}>

                    {
                        NEWS_DATA.map((item, index) => (
                            <Card
                                key={index}
                                data={item}
                                showDescription={false}
                                showDate={false}
                                showSubjects={false}
                                color={theme.cardBackground}
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