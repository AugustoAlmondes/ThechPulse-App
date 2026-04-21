import { COLORS } from '@/src/theme/global'
import { Image, StyleSheet, Text, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import { useThemeColors } from '@/src/hooks/useThemeColors';

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

export default function News(props: NewsProps) {
    const theme = useThemeColors();

    return (
        <View style={[styles.container, { backgroundColor: props.color + 30 }]}>
            <Image
                style={styles.image}
                source={props.data.image}
            />
            <Text style={[styles.date, { color: theme.textSubtle }]}>
                {props.data.date}
            </Text>

            <Text
                style={[styles.title, { color: theme.textSecondary }]}
            >
                {props.data.title}
            </Text>

            <Text
                style={[styles.description, { color: theme.textTertiary }]}
            >
                {props.data.description}
            </Text>

            <View style={styles.action}>

                <Entypo
                    name='share'
                    size={22}
                    color={theme.textTertiary} />

                <Ionicons
                    name="bookmark-outline"
                    size={22}
                    color={theme.textTertiary} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        borderRadius: 2,
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    image: {
        width: '100%',
        height: 200,
        objectFit: 'cover'
    },
    date: {
        fontSize: 14,
        marginRight: 10,
        marginBottom: 10,
        marginLeft: 7,
        marginTop: 10,
        alignSelf: 'flex-start',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10
    },
    description: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20.4,
        textAlign: 'justify',
    },
    action: {
        marginBottom: 15,
        justifyContent: 'flex-end',
        gap: 10,
        flexDirection: 'row'
    }
})
