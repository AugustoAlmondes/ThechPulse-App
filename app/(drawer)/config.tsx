import { StyleSheet, Text, View } from 'react-native'

export default function Config() {
    return (
        <View style={styles.container}>
            <Text> Configrações </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
