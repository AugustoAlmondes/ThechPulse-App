import BestNews from "@/src/components/home/BestNews";
import FirstNews from "@/src/components/home/FirstNews";
import News from "@/src/components/home/News";
import Header from "@/src/components/layout/Header";
import { COLORS } from "@/src/theme/global";
import { Divider } from 'react-native-paper';
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import FavoriteNews from "@/src/components/home/FavoriteNews";

const SUBJECTS = [
    'TechPulse',
    'Tech',
    'Game',
    'Articifial Inteligence',
    'Front-end',
    'Game',
    'Articifial Inteligence',
]

const BEST_NEWS = [
    {
        title: 'QUANTUM PROCESSORS: A STRUCTURAL SOFT',
        subject: 'HARDWARE',
        description: 'Non nemo error amet excepturi nostrum eveniet! Tenetur omnis aspernatur nisi mollitia deleniti accusamus ducimus.'
    },
    {
        title: 'QUANTUM : THE BIG REVOLUTION',
        subject: 'HARDWARE',
        description: 'Non nemo error amet excepturi nostrum eveniet! Tenetur omnis aspernatur nisi'
    },
    {
        title: 'THE ETHICS OF AUTOMED BLUEPRINT',
        subject: 'AI',
        description: 'Non nemo error amet excepturi nostrum eveniet! Tenetur omnis aspernatur nisi'
    }
]

const NEWS = [
    {
        title: 'NEURAL NETWORK REACH NEW BENCHMARKS IN ACHITECTURAL SIMULATION',
        subject: 'HARDWARE',
        description: 'Non nemo error amet excepturi nostrum eveniet! Tenetur omnis aspernatur nisi mollitia deleniti accusamus ducimus.',
        image: require('@/public/images/news.jpeg'),
        date: '07-03-2026'
    },
    {
        title: 'ADVANCEMENTS IN QUANTUM COMPUTING FOR DATA ANALYSIS',
        subject: 'AI',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        image: require('@/public/images/news4.jpg'),
        date: '07-03-2026'
    },
    {
        title: 'THE FUTURE OF FRONT-END DEVELOPMENT WITH REACT NATIVE',
        subject: 'FRONT-END',
        description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        image: require('@/public/images/news3.jpg'),
        date: '07-03-2026'
    },
    {
        title: 'BREAKTHROUGHS IN GAME DESIGN USING MACHINE LEARNING',
        subject: 'GAME',
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        image: require('@/public/images/news2.jpg'),
        date: '07-03-2026'
    },
    {
        title: 'EXPLORING THE ETHICS OF ARTIFICIAL INTELLIGENCE',
        subject: 'ARTIFICIAL INTELLIGENCE',
        description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        image: require('@/public/images/news5.jpg'),
        date: '07-03-2026'
    },
]

export default function Home() {
    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            stickyHeaderIndices={[0]}
            style={styles.container}>
            <Header
                title="TechPulse"
            />
            {/* <View style={styles.subjectsBody}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={(SUBJECTS)}
                    contentContainerStyle={styles.subjects}
                    renderItem={({ item, index }) => (
                        <Text key={index} style={styles.subject}>{item}</Text>
                    )}
                />
            </View> */}
            <View
                style={styles.newsBody}
            >


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

                <View>
                    <Text style={styles.title}>
                        ÚLTIMA NOTÍCIA
                    </Text>
                    <FirstNews />
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
    subjectsBody: {
        width: '100%',
        marginBottom: 15
    },
    subjects: {
        color: COLORS.neutral.white,
        fontSize: 14,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20
    },
    title: {
        color: COLORS.neutral[500],
        fontSize: 24,
        fontWeight: '400',
        marginBottom: 10,
        marginLeft: 10
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
    newsBody: {
        width: '100%',
        paddingHorizontal: 15,
        marginBottom: 20,
        gap: 20
    },
    divider: {
        backgroundColor: COLORS.neutral[700] + 40,
        height: 3
    }

})