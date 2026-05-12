import { COLORS } from '@/src/theme/global'
import Feather from '@expo/vector-icons/Feather';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useThemeColors } from '@/src/hooks/useThemeColors'
import { router } from 'expo-router'
import { Image } from 'expo-image';
import { goToInfoNews } from '@/src/utils/goToInfoNews';
import { TypeNews } from '@/src/types/NewsType';

export default function LastestNews({ latestNews }: { latestNews: TypeNews }) {
    const theme = useThemeColors();


    return (
        <View>
            <Image
                cachePolicy="disk"
                transition={300}
                style={styles.headerImage}
                source={{ uri: latestNews.image }} />

            <Text style={[styles.badge, { color: COLORS.neutral.white, backgroundColor: COLORS.badges.blue }]}>
                {latestNews.category.toString().toUpperCase()}
            </Text>

            <View>
                <Text style={[styles.title, { color: theme.textSecondary }]}>
                    {latestNews.title}
                </Text>

                <Text
                    style={[styles.description, { color: theme.textTertiary }]}
                    numberOfLines={3}
                    ellipsizeMode="tail"
                >
                    {latestNews.description}
                </Text>
            </View>

            <TouchableOpacity
                onPress={() => goToInfoNews(latestNews)}
                activeOpacity={0.7}
                style={[styles.button, { backgroundColor: COLORS.badges.indigo }]}>
                <Text
                    style={{
                        color: COLORS.neutral.white,
                        fontSize: 14,
                        fontWeight: 'bold',
                    }}
                >Ler mais</Text>
                <Feather
                    name='arrow-right'
                    size={17}
                    color={COLORS.neutral.white}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 26,
        fontWeight: '500',
        marginBottom: 10
    },
    headerImage: {
        height: 160,
        marginBottom: 20,
        width: '100%',
        objectFit: 'cover'
    },
    button: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        paddingHorizontal: 24,
        paddingVertical: 10,
        marginTop: 10,
        borderRadius: 10,
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        alignSelf: 'flex-start',
        fontSize: 12,
        fontWeight: 'bold',
        borderRadius: 50,
        marginBottom: 10
    },
    description: {
        fontSize: 14,
        textAlign: 'justify',
        letterSpacing: 0.5,
        marginBottom: 10
    }
})