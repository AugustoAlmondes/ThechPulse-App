import { COLORS } from '@/src/theme/global'
import Feather from '@expo/vector-icons/Feather';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useThemeColors } from '@/src/hooks/useThemeColors'
import { router } from 'expo-router'
import { REAL_NEWS } from '@/src/constants/news';
import { Image } from 'expo-image';

export default function FirstNews() {
    const theme = useThemeColors();
    const data = REAL_NEWS.news[0];

    const handlePress = () => {
        router.push({
            pathname: '/webview/[id]',
            params: {
                id: data.id,
                url: data.url,
                title: data.title
            }
        });
    };

    return (
        <View style={styles.container}>
            <Image
                cachePolicy="disk"
                transition={300}
                style={styles.headerImage}
                source={{ uri: REAL_NEWS.news[0].image }} />

            <Text style={[styles.badge, { color: COLORS.neutral.white, backgroundColor: COLORS.badges.blue }]}>
                {REAL_NEWS.news[0].category.toString().toUpperCase()}
            </Text>

            <View>
                <Text style={[styles.title, { color: theme.textSecondary }]}>
                    {data.title}
                </Text>

                <Text
                    style={[styles.description, { color: theme.textTertiary }]}
                    numberOfLines={3}
                    ellipsizeMode="tail"
                >
                    {data.description}
                </Text>
            </View>

            <TouchableOpacity activeOpacity={0.7} style={[styles.button, { backgroundColor: COLORS.badges.indigo }]}>
                <Text
                    onPress={handlePress}
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
    container: {
        padding: 5,
    },
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
        paddingHorizontal: 15,
        paddingVertical: 4,
        marginTop: 10,
        borderRadius: 2,
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