import { COLORS } from '@/src/theme/global'
import { NewsType } from '@/src/types/NewsType'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function FavoriteNews({ item }: { item: NewsType }) {
    return (
        <TouchableOpacity activeOpacity={0.8} style={styles.container}>
            <Image
                style={styles.image}
                source={item.image} />

            <Text style={[styles.subject, { marginTop: 5 }]}>
                {item.subject}
            </Text>

            <Text style={styles.title}>
                {item.title}
            </Text>
            <Text style={styles.subject}>
                {item.date}
            </Text>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    container: {
        maxWidth: 250,
        height: 270,
        marginHorizontal:5,
        backgroundColor: COLORS.primary[800] + 80,
        borderRadius: 2,
        padding: 10,
        marginRight: 10,
        gap: 5
    },
    title: {
        color: COLORS.neutral[200],
        fontSize: 14,
        textAlign: 'justify'
    },
    image: {
        width: '100%',
        height: 130,
        objectFit: 'cover'
    },
    subject: {
        color: COLORS.neutral[500],
        fontSize: 12,
        alignSelf: 'flex-start',
    },
})
