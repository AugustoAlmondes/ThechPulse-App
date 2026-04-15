import { COLORS } from '@/src/theme/global'
import Feather from '@expo/vector-icons/Feather'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface NewsData {
    title: string,
    description: string,
    subject: string,
    image: any,
    date: string
}

interface NewsProps {
    color: string,
    data: NewsData
}

export default function CardNews(props: NewsData) {
    return (
        <View style={styles.newsCard}>
            <Image
                style={styles.newsImage}
                source={props.image}
                resizeMode="cover"
            />
            <View style={styles.newsContent}>
                <Text style={styles.newsTitle}>{props.title}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 10, marginRight: 10 }}>
                    <TouchableOpacity activeOpacity={0.7} style={styles.actionButton}>
                        <Feather name="share-2" color={COLORS.neutral.white} size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={styles.actionButton}>
                        <Feather name="star" color={COLORS.neutral.white} size={20} />
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
    newsImage: {
        width: '100%',
        height: 100,
        objectFit: 'cover'
    },
    newsContent: {
        flex: 1,
        justifyContent: 'space-between',
    },
    newsTitle: {
        marginTop: 10,
        paddingHorizontal: 10,
        color: COLORS.neutral.white,
        fontSize: 16,
    },
    newsDescription: {
        color: COLORS.neutral[200],
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 12,
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
})

