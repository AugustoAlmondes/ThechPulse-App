import BestNews from "@/src/components/home/BestNews";
import FirstNews from "@/src/components/home/FirstNews";
import News from "@/src/components/home/News";
import Header from "@/src/components/layout/Header";
import { COLORS } from "@/src/theme/global";
import { Divider } from 'react-native-paper';
import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import FavoriteNews from "@/src/components/home/FavoriteNews";
import Entypo from "@expo/vector-icons/Entypo";
import { BEST_NEWS, NEWS } from "@/src/constants/news";



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
            {/* <Header
                title="TechPulse"
            /> */}
            <View
                style={styles.newsBody}
            >

                <View>
                    {/* <Text style={styles.title}>
                        ÚLTIMA NOTÍCIA
                    </Text> */}
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
                </View>


                <Divider style={styles.divider} />

                <View style={{ marginVertical: 10 }}>
                    <Text style={styles.title}>
                        MAIS ACESSADAS
                    </Text>
                    <View style={{ gap: 20 }}>
                        <BestNews
                            color={COLORS.neutral[700]}
                            data={BEST_NEWS[0]}
                        />
                        <BestNews
                            color={COLORS.neutral[700]}
                            data={BEST_NEWS[1]}
                        />
                        <BestNews
                            color={COLORS.neutral[700]}
                            data={BEST_NEWS[2]}
                        />
                    </View>
                </View>


                <Divider style={styles.divider} />
                <View style={{ gap: 20 }}>
                    <Text style={styles.title}>
                        VEJA MAIS
                    </Text>
                    {
                        NEWS.map((item, index) => (
                            <News
                                key={index}
                                color={COLORS.primary[700]}
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
    }

})