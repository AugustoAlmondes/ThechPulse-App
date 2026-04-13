import { COLORS } from '@/src/theme/global'
import { Image, StyleSheet, Text, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

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
    return (
        <View style={[styles.container, { backgroundColor: props.color + 30 }]}>
            <Image
                style={styles.image}
                source={props.data.image}
            />
            <Text style={styles.date}>
                {props.data.date}
            </Text>

            <Text
                style={styles.title}
            >
                {props.data.title}
            </Text>

            <Text
                style={styles.description}
            >
                {props.data.description}
            </Text>

            <View style={styles.action}>

                <Entypo
                    name='share'
                    size={22}
                    color={COLORS.neutral[300]} />

                <Ionicons
                    name="bookmark-outline"
                    size={22}
                    color={COLORS.neutral[300]} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        // backgroundColor: COLORS.primary[700],
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
        color: COLORS.neutral[500],
        fontSize: 14,
        marginRight: 10,
        marginBottom: 10,
        marginLeft: 7,
        marginTop: 10,
        alignSelf: 'flex-start',
    },
    title: {
        color: COLORS.neutral[200],
        fontSize: 20,
        // textAlign:'justify',
        fontWeight: '600',
        marginBottom: 10
    },
    description: {
        fontSize: 14,
        color: COLORS.neutral[300],
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
