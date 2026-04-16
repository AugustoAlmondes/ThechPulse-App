import { COLORS } from '@/src/theme/global'
import Feather from '@expo/vector-icons/Feather';
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function FirstNews() {
    return (
        <View style={styles.container}>
            <Image
                style={styles.headerImage}
                source={require('@/public/images/news.jpeg')} />

            <Text style={styles.badge}>
                LAST NEWS
            </Text>

            <View>
                <Text style={styles.title}>
                    NEURAL NETWORK REACH NEW BENCHMARKS IN ACHITECTURAL SIMULATION
                </Text>

                <Text
                    style={styles.description}
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae eius accusamus, hic in quasi dolor dignissimos aspernatur quas consequuntur...
                </Text>
            </View>

            <TouchableOpacity activeOpacity={0.7} style={styles.button}>
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
        // backgroundColor: COLORS.neutral[800],
        // borderRadius: 2

    },
    title: {
        color: COLORS.neutral[200],
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
        backgroundColor: COLORS.badges.indigo,
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
        color: COLORS.neutral.white,
        borderRadius: 50,
        backgroundColor: COLORS.badges.blue,
        marginBottom: 10
    },
    description: {
        color: COLORS.neutral[300],
        fontSize: 14,
        textAlign: 'justify',
        letterSpacing: 0.5,
        marginBottom: 10
    }
})