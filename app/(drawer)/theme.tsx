import Header from '@/src/components/layout/Header';
import { useThemeColors } from '@/src/hooks/useThemeColors';
import { ThemeMode, useThemeStore } from '@/src/store/useThemeStore';
import { COLORS } from '@/src/theme/global';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const OPTIONS: { key: ThemeMode; label: string; icon: 'moon' | 'sun' | 'monitor' }[] = [
    { key: 'dark', label: 'Escuro', icon: 'moon' },
    { key: 'light', label: 'Claro', icon: 'sun' },
    { key: 'system', label: 'Sistema', icon: 'monitor' },
];

export default function Theme() {
    const theme = useThemeColors();
    const { mode, setMode } = useThemeStore();

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
                            color={theme.headerIcon}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: theme.headerText }]}>Tema</Text>
                </View>
            </Header>

            <View style={[styles.container, { backgroundColor: theme.background }]}>
                <View style={styles.content}>
                    <Feather name="moon" size={64} color={COLORS.primary[500]} />
                    <Text style={[styles.title, { color: theme.textPrimary }]}>Preferências de Tema</Text>
                    <Text style={[styles.description, { color: theme.textMuted }]}>
                        Escolha entre o modo claro, escuro ou seguir o sistema.
                    </Text>
                    
                    <View style={styles.optionList}>
                        {OPTIONS.map((opt) => {
                            const isSelected = mode === opt.key;
                            return (
                                <TouchableOpacity
                                    key={opt.key}
                                    style={[
                                        styles.option,
                                        { backgroundColor: theme.surface },
                                        isSelected && styles.selectedOption,
                                    ]}
                                    onPress={() => setMode(opt.key)}
                                    activeOpacity={0.7}
                                >
                                    <Feather
                                        name={opt.icon}
                                        size={20}
                                        color={isSelected ? theme.textPrimary : theme.textMuted}
                                    />
                                    <Text
                                        style={[
                                            styles.optionText,
                                            { color: isSelected ? theme.textPrimary : theme.textMuted },
                                        ]}
                                    >
                                        {opt.label}
                                    </Text>
                                    {isSelected && (
                                        <Feather name="check" size={20} color={COLORS.primary[500]} />
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
        marginTop: 40,
        alignItems: 'center',
        gap: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
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
        fontWeight: '500',
    },
});
