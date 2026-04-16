import BestNews from "@/src/components/home/BestNews";
import FirstNews from "@/src/components/home/FirstNews";
import News from "@/src/components/home/News";
import Header from "@/src/components/layout/Header";
import { COLORS } from "@/src/theme/global";
import { Divider } from 'react-native-paper';
import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FavoriteNews from "@/src/components/home/FavoriteNews";
import Entypo from "@expo/vector-icons/Entypo";
import { BEST_NEWS, NEWS } from "@/src/constants/news";
import Card from "@/src/components/shared/Card";
import Feather from "@expo/vector-icons/Feather";


export default function Home() {
    return (
        <ScrollView refreshControl={<RefreshControl refreshing={false} size="default" />}
            showsHorizontalScrollIndicator={false}
            stickyHeaderIndices={[0]}
            style={styles.container}>
            <Header>
                <Text style={styles.headerTitle}>TechPulse</Text>
                <Entypo
                    name="dots-three-vertical"
                    size={20}
                    color="white"
                />
            </Header>
            <View
                style={styles.newsBody}
            >

                <View>
                    <FirstNews />
                </View>

                <Divider style={styles.divider} />

                <View style={{ marginVertical: 10 }}>
                    <Text style={styles.title}>
                        MEUS FAVORITOS
                    </Text>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={NEWS}
                        renderItem={({ item }) => (
                            <FavoriteNews item={item} />
                        )} />
                    <TouchableOpacity activeOpacity={0.7} style={styles.button}>
                        <Text
                            style={{
                                color: COLORS.neutral.white,
                                fontSize: 14,
                                fontWeight: 'bold',
                            }}
                        >Ver meu favoritos</Text>
                        <Feather
                            name='arrow-right'
                            size={17}
                            color={COLORS.neutral.white}
                        />
                    </TouchableOpacity>
                </View>


                <Divider style={styles.divider} />

                <View style={{ marginVertical: 10 }}>
                    <Text style={styles.title}>
                        MAIS ACESSADAS
                    </Text>
                    <View style={{ gap: 20 }}>
                        <View
                            style={{
                                gap: 5,
                                flexDirection: 'row'
                            }}
                        >
                            <View
                                style={{
                                    width: 40,
                                    height: 40,
                                    backgroundColor: COLORS.rank.gold,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Text style={{ color: COLORS.neutral.white, fontWeight: 'bold', fontSize: 16 }}>1</Text>
                            </View>
                            <Card
                                color={COLORS.secondary[800]}
                                data={NEWS[0]}
                                showDate={false}
                                showAction={false}
                                showCreator={false}
                                showImage={false}
                                showSubjects={false}
                            />
                        </View>
                        <View
                            style={{
                                gap: 5,
                                flexDirection: 'row'
                            }}
                        >
                            <View
                                style={{
                                    width: 40,
                                    height: 40,
                                    backgroundColor: COLORS.rank.silver,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Text style={{ color: COLORS.neutral.white, fontWeight: 'bold', fontSize: 16 }}>2</Text>
                            </View>
                            <Card
                                color={COLORS.secondary[800]}
                                data={NEWS[1]}
                                showDate={false}
                                showAction={false}
                                showCreator={false}
                                showImage={false}
                                showSubjects={false}
                            />
                        </View>
                        <View
                            style={{
                                gap: 5,
                                flexDirection: 'row'
                            }}
                        >
                            <View
                                style={{
                                    width: 40,
                                    height: 40,
                                    backgroundColor: COLORS.rank.bronze,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Text style={{ color: COLORS.neutral.white, fontWeight: 'bold', fontSize: 16 }}>3</Text>
                            </View>
                            <Card
                                color={COLORS.secondary[800]}
                                data={NEWS[2]}
                                showDate={false}
                                showAction={false}
                                showCreator={false}
                                showImage={false}
                                showSubjects={false}
                            />
                        </View>
                    </View>
                </View>


                <Divider style={styles.divider} />
                <View style={{ gap: 20 }}>
                    <Text style={styles.title}>
                        VEJA MAIS
                    </Text>
                    {
                        NEWS.map((item, index) => (
                            <Card
                                key={index}
                                showDate={false}
                                showAction={false}
                                color={COLORS.neutral[800]}
                                data={item}
                            />
                        ))
                    }
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.neutral[900],
    },
    title: {
        color: COLORS.neutral[500],
        fontSize: 24,
        fontWeight: '400',
        marginBottom: 10,
        marginLeft: 10
    },
    newsBody: {
        width: '100%',
        paddingHorizontal: 15,
        marginBottom: 20,
        gap: 20
    },
    divider: {
        backgroundColor: COLORS.neutral[700] + 40,
        height: 3
    },
    headerTitle: {
        color: COLORS.neutral.white,
        fontSize: 24,
    },
    button: {
        backgroundColor: COLORS.badges.indigo + 60,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 4,
        marginTop: 20,
        borderRadius: 2,
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

})