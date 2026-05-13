import { COLORS } from '@/src/theme/global'
import { TypeNews } from '@/src/types/NewsType'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useThemeColors } from '@/src/hooks/useThemeColors'
import { Image } from 'expo-image'
import { goToInfoNews } from '@/src/utils/goToInfoNews'

export default function FavoriteNews({ item }: { item: TypeNews }) {
    const theme = useThemeColors();

    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => goToInfoNews(item)}
            style={[styles.container, { backgroundColor: theme.favoriteCardBackground }]}
        >
            <Image
                cachePolicy="disk"
                transition={200}
                style={styles.image}
                source={{ uri: item.image }}
            />
            <View style={styles.info}>
                <Text style={[styles.category, { color: theme.accentButton }]}>
                    {item.category?.toString().toUpperCase()}
                </Text>
                <Text style={[styles.title, { color: theme.textSecondary }]} numberOfLines={3}>
                    {item.title}
                </Text>
                <Text style={[styles.date, { color: theme.textMuted }]}>
                    {item.published?.slice(0, 10)}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 220,
        borderRadius: 14,
        marginRight: 12,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 120,
        objectFit: 'cover',
    },
    info: {
        padding: 12,
        gap: 6,
    },
    category: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.8,
    },
    title: {
        fontSize: 13,
        fontWeight: '600',
        lineHeight: 18,
    },
    date: {
        fontSize: 11,
    },
})
