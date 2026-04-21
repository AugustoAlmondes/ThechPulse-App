import { COLORS } from '@/src/theme/global'
import Feather from '@expo/vector-icons/Feather';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useThemeColors } from '@/src/hooks/useThemeColors'

export default function FirstNews() {
    const theme = useThemeColors();

    return (
        <View style={styles.container}>
            <Image
                style={styles.headerImage}
                source={require('@/public/images/news.jpeg')} />

            <Text style={[styles.badge, { color: COLORS.neutral.white, backgroundColor: COLORS.badges.blue }]}>
                LAST NEWS
            </Text>

            <View>
                <Text style={[styles.title, { color: theme.textSecondary }]}>
                    NEURAL NETWORK REACH NEW BENCHMARKS IN ACHITECTURAL SIMULATION
                </Text>

                <Text
                    style={[styles.description, { color: theme.textTertiary }]}
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae eius accusamus, hic in quasi dolor dignissimos aspernatur quas consequuntur...
                </Text>
            </View>

            <TouchableOpacity activeOpacity={0.7} style={[styles.button, { backgroundColor: COLORS.badges.indigo }]}>
                <Text
                    style={{
                        color: COLORS.neutral.white,
                        fontSize: 14,
                        fontWeight: 'bold',
                    }}
                >Ver mais</Text>
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