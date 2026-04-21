import Header from '@/src/components/layout/Header';
import { COLORS } from '@/src/theme/global';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Theme() {
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
                    <Text style={styles.headerTitle}>Tema</Text>
                </View>
            </Header>

            <View style={styles.container}>
                <View style={styles.content}>
                    <Feather name="moon" size={64} color={COLORS.primary[500]} />
                    <Text style={styles.title}>Preferências de Tema</Text>
                    <Text style={styles.description}>
                        Escolha entre o modo claro, escuro ou seguir o sistema.
                    </Text>
                    
                    <View style={styles.optionList}>
                        <TouchableOpacity style={[styles.option, styles.selectedOption]}>
                            <Feather name="moon" size={20} color="white" />
                            <Text style={styles.optionText}>Escuro</Text>
                            <Feather name="check" size={20} color={COLORS.primary[500]} />
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.option}>
                            <Feather name="sun" size={20} color={COLORS.neutral[400]} />
                            <Text style={[styles.optionText, { color: COLORS.neutral[400] }]}>Claro</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.option}>
                            <Feather name="monitor" size={20} color={COLORS.neutral[400]} />
                            <Text style={[styles.optionText, { color: COLORS.neutral[400] }]}>Sistema</Text>
                        </TouchableOpacity>
                    </View>
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
        marginTop: 40,
        alignItems: 'center',
        gap: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.neutral.white,
    },
    description: {
        fontSize: 16,
        color: COLORS.neutral[400],
        textAlign: 'center',
        marginBottom: 20,
    },
    optionList: {
        width: '100%',
        gap: 12,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.neutral[800],
        padding: 16,
        borderRadius: 12,
        gap: 12,
    },
    selectedOption: {
        borderWidth: 1,
        borderColor: COLORS.primary[500],
    },
    optionText: {
        flex: 1,
        fontSize: 16,
        color: COLORS.neutral.white,
        fontWeight: '500',
    },
});
