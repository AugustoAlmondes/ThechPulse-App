import { COLORS } from "@/src/theme/global";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

export default function Login() {
    return (
        <View style={styles.container}>
            <ImageBackground 
                source={require('@/public/images/1.jpg')} 
                style={styles.background}
                resizeMode="cover"
            >
                <View style={styles.overlay}>
                    <View style={styles.content}>
                        <View style={styles.header}>
                            <View style={styles.logoContainer}>
                                <Text style={styles.logoText}>TP</Text>
                            </View>
                            <Text style={styles.title}>TeachPulse</Text>
                            <Text style={styles.subtitle}>Sua pulsação no mundo da educação e tecnologia</Text>
                        </View>

                        <View style={styles.footer}>
                            <TouchableOpacity 
                                activeOpacity={0.8} 
                                style={styles.googleButton}
                                onPress={() => router.replace('/(drawer)/(tabs)')}
                            >
                                <Image 
                                    source={require('@/assets/google-icon.png')} 
                                    style={styles.googleIcon} 
                                />
                                <Text style={styles.googleButtonText}>Continuar com Google</Text>
                            </TouchableOpacity>
                            
                            <Text style={styles.termsText}>
                                Ao continuar, você concorda com nossos{" "}
                                <Text style={styles.linkText}>Termos de Serviço</Text> e{" "}
                                <Text style={styles.linkText}>Política de Privacidade</Text>.
                            </Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(18, 23, 29, 0.85)', // dark overlay using COLORS.neutral[950] logic
        padding: 30,
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 60,
    },
    header: {
        alignItems: 'center',
    },
    logoContainer: {
        width: 80,
        height: 80,
        borderRadius: 20,
        backgroundColor: COLORS.primary[500],
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: COLORS.primary[500],
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    logoText: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.neutral[400],
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 22,
    },
    footer: {
        gap: 20,
    },
    googleButton: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        borderRadius: 16,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    googleIcon: {
        width: 24,
        height: 24,
    },
    googleButtonText: {
        color: '#1f2933', // neutral 900
        fontSize: 16,
        fontWeight: '600',
    },
    termsText: {
        textAlign: 'center',
        color: COLORS.neutral[500],
        fontSize: 12,
        lineHeight: 18,
    },
    linkText: {
        color: COLORS.primary[400],
        fontWeight: '600',
    }
});