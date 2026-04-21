import Header from '@/src/components/layout/Header';
import { useThemeColors } from '@/src/hooks/useThemeColors';
import { COLORS } from '@/src/theme/global';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function About() {
    const theme = useThemeColors();

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            <Header>
                <View style={styles.headerContent}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => router.replace('/(drawer)/settings')}
                    >
                        <Feather
                            name="arrow-left"
                            size={27}
                            color={theme.headerIcon}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: theme.headerText }]}>Sobre</Text>
                </View>
            </Header>

            <View style={styles.container}>
                <View style={styles.content}>
                    <Feather name="info" size={64} color={COLORS.primary[500]} />
                    <Text style={[styles.title, { color: theme.textPrimary }]}>TeachPulse</Text>
                    <Text style={[styles.description, { color: theme.textTertiary }]}>
                        Sua plataforma de notícias favorita. 
                        Acompanhe o que há de novo no mundo da tecnologia.
                    </Text>
                    <Text style={[styles.version, { color: theme.textSubtle }]}>Versão 1.0.0</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    headerTitle: {
        fontSize: 24,
    },
    content: {
        alignItems: 'center',
        gap: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
    },
    version: {
        fontSize: 14,
        marginTop: 20,
    },
});
