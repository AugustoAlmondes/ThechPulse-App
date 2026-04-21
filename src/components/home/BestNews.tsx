import { COLORS } from '@/src/theme/global'
import { StyleSheet, Text, View } from 'react-native'
import { useThemeColors } from '@/src/hooks/useThemeColors'

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
    const theme = useThemeColors();

    return (
        <View style={[styles.container, { backgroundColor: props.color }]}>
            <View>
                <Text style={[styles.subject, { color: theme.textSubtle }]}>
                    {props.data.subject}
                </Text>
            </View>

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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        borderRadius: 2,
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    subject: {
        fontSize: 14,
        marginRight: 10,
        marginLeft: 7,
        marginTop: 10,
        alignSelf: 'flex-start',
    },
    title: {
        fontSize: 18,
        fontWeight: '400',
    },
    description: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20.4,
        textAlign: 'justify',
        marginBottom: 10
    }
})
