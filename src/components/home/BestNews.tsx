import { COLORS } from '@/src/theme/global'
import { StyleSheet, Text, View } from 'react-native'

interface BestNewsData {
    title: string,
    description: string,
    subject: string
}

interface BestNewsProps {
    color: string,
    data: BestNewsData
}

export default function BestNews(props: BestNewsProps) {
    return (
        <View style={[styles.container, { backgroundColor: props.color }]}>
            <View>
                <Text style={styles.subject}>
                    {props.data.subject}
                </Text>
            </View>

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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        // backgroundColor: COLORS.primary[700],
        borderRadius: 2,
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    subject: {
        color: COLORS.neutral[500],
        fontSize: 14,
        marginRight: 10,
        // marginBottom: 10,
        marginLeft: 7,
        marginTop: 10,
        alignSelf: 'flex-start',
    },
    title: {
        color: COLORS.neutral[200],
        fontSize: 18,
        fontWeight: '400',
        // marginBottom: 10
    },
    description: {
        fontSize: 14,
        color: COLORS.neutral[300],
        fontWeight: '400',
        lineHeight: 20.4,
        textAlign: 'justify',
        marginBottom: 10
    }
})
