import { COLORS } from '@/src/theme/global'
import Entypo from '@expo/vector-icons/Entypo'
import Feather from '@expo/vector-icons/Feather'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useThemeColors } from '@/src/hooks/useThemeColors'

interface NewsData {
    title: string,
    description: string,
    subject: string,
    image: any,
    date: string
}

export default function FavoriteCardNews(props: NewsData) {
    const theme = useThemeColors();

    return (
        <View style={[styles.newsCard, { backgroundColor: theme.surface }]}>
            <View style={styles.newsContent}>
                <Text style={[styles.newsSubject, { backgroundColor: COLORS.badges.blue, color: COLORS.neutral.white }]}>{props.subject}</Text>
                <Text style={[styles.newsTitle, { color: theme.textPrimary }]}>{props.title}</Text>
                <Text style={[styles.newsDate, { color: theme.textSecondary }]}>{props.date}</Text>
                <View style={styles.cardActions}>
                    <TouchableOpacity activeOpacity={0.7} style={styles.actionButton}>
                        <Entypo
                            name='share'
                            size={22}
                            color={theme.textTertiary} />

                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={styles.actionButton}>
                        <Ionicons
                            name="bookmark"
                            size={22}
                            color={theme.textTertiary} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    newsCard: {
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
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        fontSize: 12,
        fontWeight: '600',
        paddingVertical: 2,
        borderRadius: 100
    },
    newsTitle: {
        marginTop: 10,
        fontSize: 18,
    },
    newsDate: {
        fontSize: 16,
        fontWeight: '300',
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
