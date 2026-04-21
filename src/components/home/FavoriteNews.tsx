import { COLORS } from '@/src/theme/global'
import { NewsType } from '@/src/types/NewsType'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useThemeColors } from '@/src/hooks/useThemeColors'

export default function FavoriteNews({ item }: { item: NewsType }) {
    const theme = useThemeColors();

    return (
        <TouchableOpacity activeOpacity={0.8} style={[styles.container, { backgroundColor: theme.favoriteCardBackground }]}>
            <Image
                style={styles.image}
                source={item.image} />

            <Text style={[styles.subject, { color: theme.textSubtle, marginTop: 5 }]}>
                {item.subject}
            </Text>

            <Text style={[styles.title, { color: theme.textSecondary }]}>
                {item.title}
            </Text>
            <Text style={[styles.subject, { color: theme.textSubtle }]}>
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
        borderRadius: 2,
        padding: 10,
        marginRight: 10,
        gap: 5
    },
    title: {
        fontSize: 14,
        textAlign: 'justify'
    },
    image: {
        width: '100%',
        height: 130,
        objectFit: 'cover'
    },
    subject: {
        fontSize: 12,
        alignSelf: 'flex-start',
    },
})
