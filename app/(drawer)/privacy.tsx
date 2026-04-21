import Header from '@/src/components/layout/Header';
import { COLORS } from '@/src/theme/global';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Privacy() {
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
                    <Text style={styles.headerTitle}>Privacidade</Text>
                </View>
            </Header>

            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Política de Privacidade</Text>
                <Text style={styles.date}>Última atualização: 21 de Abril de 2026</Text>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>1. Coleta de Dados</Text>
                    <Text style={styles.sectionText}>
                        Coletamos informações básicas para melhorar sua experiência, como preferências de leitura e temas de interesse. 
                        Não vendemos seus dados para terceiros.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>2. Uso de Cookies</Text>
                    <Text style={styles.sectionText}>
                        Utilizamos tecnologias locais para manter sua sessão ativa e salvar suas notícias favoritas no dispositivo.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>3. Segurança</Text>
                    <Text style={styles.sectionText}>
                        Seus dados são protegidos seguindo os padrões da indústria. Recomendamos o uso de senhas fortes em sua conta Google/Github.
                    </Text>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Ao utilizar o TeachPulse, você concorda com nossos termos de serviço.
                    </Text>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.neutral[900],
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
        color: COLORS.neutral.white,
        fontSize: 24,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: COLORS.neutral.white,
    },
    date: {
        fontSize: 14,
        color: COLORS.neutral[500],
        marginBottom: 10,
    },
    section: {
        gap: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primary[500],
    },
    sectionText: {
        fontSize: 16,
        color: COLORS.neutral[400],
        lineHeight: 24,
    },
    footer: {
        marginTop: 40,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: COLORS.neutral[800],
    },
    footerText: {
        fontSize: 14,
        color: COLORS.neutral[600],
        textAlign: 'center',
    },
});
