import { COLORS } from '@/src/theme/global'
import Feather from '@expo/vector-icons/Feather';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useThemeColors } from '@/src/hooks/useThemeColors'
import { Image } from 'expo-image';
import { goToInfoNews } from '@/src/utils/goToInfoNews';
import { TypeNews } from '@/src/types/NewsType';

export default function LastestNews({ latestNews }: { latestNews: TypeNews }) {
    const theme = useThemeColors();

    if (!latestNews) {
        return null;
    }

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => goToInfoNews(latestNews)}
            style={[styles.card, { backgroundColor: theme.cardBackground }]}
        >
            {latestNews?.image && (
                <View style={styles.imageWrapper}>
                    <Image
                        cachePolicy="disk"
                        transition={300}
                        style={styles.headerImage}
                        source={{ uri: latestNews?.image }}
                    />
                    <View style={styles.imageGradient} />
                    <View style={styles.badgeOnImage}>
                        <Text style={[styles.badge, { color: COLORS.neutral.white, backgroundColor: COLORS.badges.blue }]}>
                            {latestNews.category.toString().toUpperCase()}
                        </Text>
                        <View style={[styles.tagNew, { backgroundColor: COLORS.badges.indigo + 'CC' }]}>
                            <Text style={styles.tagNewText}>DESTAQUE</Text>
                        </View>
                    </View>
                </View>
            )}

            <View style={styles.content}>
                {!latestNews?.image && (
                    <Text style={[styles.badge, { color: COLORS.neutral.white, backgroundColor: COLORS.badges.blue, alignSelf: 'flex-start' }]}>
                        {latestNews.category.toString().toUpperCase()}
                    </Text>
                )}

                <Text style={[styles.title, { color: theme.textSecondary }]}>
                    {latestNews.title}
                </Text>

                <Text
                    style={[styles.description, { color: theme.textTertiary }]}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                >
                    {latestNews.description}
                </Text>

                <View style={styles.footer}>
                    <TouchableOpacity
                        onPress={() => goToInfoNews(latestNews)}
                        activeOpacity={0.7}
                        style={[styles.button, { backgroundColor: COLORS.badges.indigo }]}
                    >
                        <Text style={styles.buttonText}>Ler mais</Text>
                        <Feather name='arrow-right' size={15} color={COLORS.neutral.white} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        overflow: 'hidden',
    },
    imageWrapper: {
        position: 'relative',
    },
    headerImage: {
        height: 200,
        width: '100%',
        objectFit: 'cover',
    },
    imageGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        backgroundColor: 'rgba(0,0,0,0.40)',
    },
    badgeOnImage: {
        position: 'absolute',
        top: 12,
        left: 12,
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        fontSize: 10,
        fontWeight: 'bold',
        borderRadius: 50,
        overflow: 'hidden',
    },
    tagNew: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 50,
    },
    tagNewText: {
        color: COLORS.neutral.white,
        fontSize: 10,
        fontWeight: 'bold',
    },
    content: {
        padding: 16,
        gap: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 26,
    },
    description: {
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0.3,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    button: {
        flexDirection: 'row',
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 8,
        gap: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: COLORS.neutral.white,
        fontSize: 13,
        fontWeight: 'bold',
    },
})