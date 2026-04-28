import Header from '@/src/components/layout/Header';
import { useThemeColors } from '@/src/hooks/useThemeColors';
import { COLORS } from '@/src/theme/global';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Privacy() {
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
                    <Text style={[styles.headerTitle, { color: theme.headerText }]}>Privacidade</Text>
                </View>
            </Header>

            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                <Text style={[styles.title, { color: theme.textPrimary }]}>Política de Privacidade</Text>
                {/* <Text style={[styles.date, { color: theme.textSubtle }]}>Última atualização: 21 de Abril de 2026</Text> */}
                
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: COLORS.primary[500] }]}>1. Coleta de Dados</Text>
                    <Text style={[styles.sectionText, { color: theme.textTertiary }]}>
                        Coletamos informações básicas para melhorar sua experiência, como preferências de leitura e temas de interesse. 
                        Não vendemos seus dados para terceiros.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: COLORS.primary[500] }]}>2. Uso de Cookies</Text>
                    <Text style={[styles.sectionText, { color: theme.textTertiary }]}>
                        Utilizamos tecnologias locais para manter sua sessão ativa e salvar suas notícias favoritas no dispositivo.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: COLORS.primary[500] }]}>3. Segurança</Text>
                    <Text style={[styles.sectionText, { color: theme.textTertiary }]}>
                        Seus dados são protegidos seguindo os padrões da indústria. Recomendamos o uso de senhas fortes em sua conta Google/Github.
                    </Text>
                </View>

                <View style={[styles.footer, { borderTopColor: theme.divider }]}>
                    <Text style={[styles.footerText, { color: theme.textMuted }]}>
                        Ao utilizar o TeachPulse, você concorda com nossos termos de serviço.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        gap: 20,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    headerTitle: {
        fontSize: 24,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 14,
        marginBottom: 10,
    },
    section: {
        gap: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    sectionText: {
        fontSize: 16,
        lineHeight: 24,
    },
    footer: {
        marginTop: 40,
        paddingTop: 20,
        borderTopWidth: 1,
    },
    footerText: {
        fontSize: 14,
        textAlign: 'center',
    },
});
