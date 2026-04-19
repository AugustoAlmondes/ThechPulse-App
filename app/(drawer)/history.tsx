import Header from '@/src/components/layout/Header'
import { COLORS } from '@/src/theme/global';
import Feather from '@expo/vector-icons/Feather';
import { DrawerActions } from '@react-navigation/native'
import { useNavigation } from 'expo-router'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function History() {

    const navigation = useNavigation();

    return (
        <>
            <Header>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 15
                }}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    >
                        <Feather
                            name="menu"
                            size={27}
                            color="white"
                            style={{ alignSelf: 'center', marginTop: 2 }}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Histórico</Text>
                </View>
            </Header>
            <View style={styles.container}>
                <Text> Historico </Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerTitle: {
        color: COLORS.neutral.white,
        fontSize: 24,
    },
})
