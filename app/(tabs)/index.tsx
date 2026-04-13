import BestNews from "@/src/components/home/BestNews";
import FirstNews from "@/src/components/home/FirstNews";
import Header from "@/src/components/layout/Header";
import { COLORS } from "@/src/theme/global";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";

const SUBJECTS = [
    'TechPulse',
    'Tech',
    'Game',
    'Articifial Inteligence',
    'Front-end',
    'Game',
    'Articifial Inteligence',
]

const BEST_NEWS = [{
    title: 'QUANTUM PROCESSORS: A STRUCTURAL SOFT',
    subject: 'HARDWARE',
    description: 'Non nemo error amet excepturi nostrum eveniet! Tenetur omnis aspernatur nisi mollitia deleniti accusamus ducimus.'
}, {
    title: 'THE ETHICS OF AUTOMED BLUEPRINT',
    subject: 'AI',
    description: 'Non nemo error amet excepturi nostrum eveniet! Tenetur omnis aspernatur nisi'
}]

export default function Home() {
    return (
        <ScrollView
            stickyHeaderIndices={[0]}
            style={styles.container}>
            <Header
                title="TechPulse"
            />
            <View style={styles.subjectsBody}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={(SUBJECTS)}
                    contentContainerStyle={styles.subjects}
                    renderItem={({ item, index }) => (
                        <Text key={index} style={styles.subject}>{item}</Text>
                    )}
                />
            </View>
            <View
                style={styles.newsBody}
            >
                <FirstNews />
                <BestNews
                    color={COLORS.neutral[700]}
                    data={BEST_NEWS[0]}
                />
                <BestNews
                    color={COLORS.neutral[700]}
                    data={BEST_NEWS[1]}
                />
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
    }

})