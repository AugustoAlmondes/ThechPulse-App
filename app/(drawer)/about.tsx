import Header from '@/src/components/layout/Header';
import { COLORS } from '@/src/theme/global';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function About() {
    return (
        <>
            <Header>
                <View style={styles.headerContent}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => router.replace('/(drawer)/settings')}
                    >
                        <Feather
                            name="arrow-left"
                            size={27}
                            color="white"
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Sobre</Text>
                </View>
            </Header>

            <View style={styles.container}>
                <View style={styles.content}>
                    <Feather name="info" size={64} color={COLORS.primary[500]} />
                    <Text style={styles.title}>TeachPulse</Text>
                    <Text style={styles.description}>
                        Sua plataforma de notícias favorita. 
                        Acompanhe o que há de novo no mundo da tecnologia.
                    </Text>
                    <Text style={styles.version}>Versão 1.0.0</Text>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.neutral[900],
        padding: 20,
        justifyContent: 'center',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    headerTitle: {
        color: COLORS.neutral.white,
        fontSize: 24,
    },
    content: {
        alignItems: 'center',
        gap: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.neutral.white,
    },
    description: {
        fontSize: 16,
        color: COLORS.neutral[400],
        textAlign: 'center',
        lineHeight: 24,
    },
    version: {
        fontSize: 14,
        color: COLORS.neutral[600],
        marginTop: 20,
    },
});
