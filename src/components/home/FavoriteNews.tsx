import { COLORS } from '@/src/theme/global'
import { NewsType, TypeNews } from '@/src/types/NewsType'
import Ionicons from '@expo/vector-icons/Ionicons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useThemeColors } from '@/src/hooks/useThemeColors'
import { Image } from 'expo-image'

export default function FavoriteNews({ item }: { item: TypeNews }) {
    const theme = useThemeColors();

    return (
        <TouchableOpacity activeOpacity={0.8} style={[styles.container, { backgroundColor: theme.favoriteCardBackground }]}>
            <Image
                style={styles.image}
                source={{ uri: item.image }} />

            <Text style={[styles.subject, { color: theme.textSubtle, marginTop: 5 }]}>
                {item.category}
            </Text>

            <Text style={[styles.title, { color: theme.textSecondary }]}>
                {item.title}
            </Text>
            <Text style={[styles.subject, { color: theme.textSubtle }]}>
                {item.published.slice(0, 10)}
            </Text>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    container: {
        maxWidth: 250,
        height: 270,
        marginHorizontal: 5,
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
