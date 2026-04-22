import { useLocalSearchParams } from 'expo-router'
import { WebView } from 'react-native-webview'
import { View } from 'react-native'

export default function NewsDetails() {
    const { url } = useLocalSearchParams()

    if (!url || typeof url !== 'string') {
        return null
    }

    return (
        <View style={{ flex: 1 }}>
            <WebView source={{ uri: url }} />
        </View>
    )
}