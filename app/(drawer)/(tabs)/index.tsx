import BestNews from "@/src/components/home/BestNews";
import FirstNews from "@/src/components/home/FirstNews";
import News from "@/src/components/home/News";
import Header from "@/src/components/layout/Header";
import { useThemeColors } from "@/src/hooks/useThemeColors";
import { COLORS } from "@/src/theme/global";
import { Divider } from 'react-native-paper';
import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FavoriteNews from "@/src/components/home/FavoriteNews";
import Entypo from "@expo/vector-icons/Entypo";
import { BEST_NEWS, NEWS } from "@/src/constants/news";
import Card from "@/src/components/shared/Card";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";


export default function Home() {

    const navigation = useNavigation();
    const theme = useThemeColors();

    return (
        <ScrollView refreshControl={<RefreshControl refreshing={false} size="default" />}
            showsHorizontalScrollIndicator={false}
            stickyHeaderIndices={[0]}
            style={[styles.container, { backgroundColor: theme.background }]}>
            <Header>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 15
                }}>
                    <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    >
                        <Feather
                            name="menu"
                            size={27}
                            color={theme.headerIcon}
                            style={{ alignSelf: 'center', marginTop: 2 }}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: theme.headerText }]}>TechPulse</Text>
                </View>
            </Header>
            <View
                style={styles.newsBody}
            >

                <View>
                    <FirstNews />
                </View>

                <Divider style={[styles.divider, { backgroundColor: theme.divider }]} />

                <View style={{ marginVertical: 10 }}>
                    <Text style={[styles.title, { color: theme.textSubtle }]}>
                        MEUS FAVORITOS
                    </Text>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={NEWS}
                        renderItem={({ item }) => (
                            <FavoriteNews item={item} />
                        )} />
                    <TouchableOpacity activeOpacity={0.7} style={[styles.button, { backgroundColor: theme.accentButton + '60' }]}>
                        <Text
                            style={{
                                color: theme.textPrimary,
                                fontSize: 14,
                                fontWeight: 'bold',
                            }}
                        >Ver meu favoritos</Text>
                        <Feather
                            name='arrow-right'
                            size={17}
                            color={theme.textPrimary}
                        />
                    </TouchableOpacity>
                </View>


                <Divider style={[styles.divider, { backgroundColor: theme.divider }]} />

                <View style={{ marginVertical: 10 }}>
                    <Text style={[styles.title, { color: theme.textSubtle }]}>
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
                                    backgroundColor: theme.cardBackground,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Entypo name="medal" size={24} color={COLORS.rank.gold} />
                            </View>
                            <Card
                                color={theme.cardBackground}
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
                                    backgroundColor: theme.cardBackground,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Entypo name="medal" size={24} color={COLORS.rank.silver} />
                            </View>
                            <Card
                                color={theme.cardBackground}
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
                                    backgroundColor: theme.cardBackground,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Entypo name="medal" size={24} color={COLORS.rank.bronze} />
                            </View>
                            <Card
                                color={theme.cardBackground}
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


                <Divider style={[styles.divider, { backgroundColor: theme.divider }]} />
                <View style={{ gap: 20 }}>
                    <Text style={[styles.title, { color: theme.textSubtle }]}>
                        VEJA MAIS
                    </Text>
                    {
                        NEWS.map((item, index) => (
                            <Card
                                key={index}
                                showDate={false}
                                showAction={false}
                                color={theme.cardBackground}
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
    },
    title: {
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
        height: 3
    },
    headerTitle: {
        fontSize: 24,
    },
    button: {
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