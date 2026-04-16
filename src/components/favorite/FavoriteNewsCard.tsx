import { COLORS } from '@/src/theme/global'
import Entypo from '@expo/vector-icons/Entypo'
import Feather from '@expo/vector-icons/Feather'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface NewsData {
    title: string,
    description: string,
    subject: string,
    image: any,
    date: string
}

export default function FavoriteCardNews(props: NewsData) {
    return (
        <View style={styles.newsCard}>
            <View style={styles.newsContent}>
                <Text style={styles.newsSubject}>{props.subject}</Text>
                <Text style={styles.newsTitle}>{props.title}</Text>
                <Text style={styles.newsDate}>{props.date}</Text>
                <View style={styles.cardActions}>
                    <TouchableOpacity activeOpacity={0.7} style={styles.actionButton}>
                        <Entypo
                            name='share'
                            size={22}
                            color={COLORS.neutral[300]} />

                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={styles.actionButton}>
                        <Ionicons
                            name="bookmark"
                            size={22}
                            color={COLORS.neutral[300]} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    newsCard: {
        // flexDirection: 'row',
        backgroundColor: COLORS.neutral[800],
        borderRadius: 2,
        overflow: 'hidden',
        minHeight: 120,
    },
    newsContent: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 20
    },
    newsSubject: {
        backgroundColor: COLORS.badges.blue,
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.neutral.white,
        paddingVertical: 2,
        borderRadius: 100
    },
    newsTitle: {
        marginTop: 10,
        color: COLORS.neutral.white,
        fontSize: 18,
    },
    newsDate: {
        color: COLORS.neutral[200],
        fontSize: 16,
        fontWeight: 300,
        marginTop: 12,
    },
    newsActions: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButton: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10
    }
})

