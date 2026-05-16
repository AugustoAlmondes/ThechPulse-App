import Header from '@/src/components/layout/Header'
import { COLORS } from '@/src/theme/global';
import Feather from '@expo/vector-icons/Feather';
import { DrawerActions } from '@react-navigation/native';
import { router, useNavigation } from 'expo-router'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { useThemeColors } from '@/src/hooks/useThemeColors';
import { useHistoricStore } from '@/src/store/historicStore';
import { useFavoriteStore } from '@/src/store/useFavoriteStore';
import { useReadStore } from '@/src/store/useReadStore';
import { useFontSizeStore, FontSizeOption } from '@/src/store/useFontSizeStore';

const FONT_SIZE_LABELS: Record<FontSizeOption, string> = {
    small: 'Pequena',
    medium: 'Média',
    large: 'Grande',
};

export default function Settings() {

    const navigation = useNavigation();
    const theme = useThemeColors();

    // Data stores
    const clearHistoric = useHistoricStore(s => s.clearHistoric);
    const clearFavorites = useFavoriteStore(s => s.favoriteNews);
    const setFavoriteNews = useFavoriteStore(s => s);
    const clearReadNews = useReadStore(s => s);

    // Font size
    const fontSize = useFontSizeStore(s => s.fontSize);
    const setFontSize = useFontSizeStore(s => s.setFontSize);

    const handleClearHistory = () => {
        Alert.alert(
            'Limpar histórico',
            'Tem certeza que deseja apagar todo o histórico de leitura?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Limpar', style: 'destructive', onPress: () => clearHistoric() },
            ]
        );
    };

    const handleClearFavorites = () => {
        Alert.alert(
            'Limpar favoritos',
            'Tem certeza que deseja remover todos os favoritos?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Limpar', style: 'destructive', onPress: () => {
                        // Reset favoriteNews to empty array via removeItem trick
                        setFavoriteNews.favoriteNews.forEach(n => setFavoriteNews.removeFavoriteNews(n));
                    }
                },
            ]
        );
    };

    const handleClearReadList = () => {
        Alert.alert(
            'Limpar lista de leitura',
            'Tem certeza que deseja remover todos os itens da lista de leitura?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Limpar', style: 'destructive', onPress: () => {
                        clearReadNews.readNews.forEach(n => clearReadNews.removeReadNews(n));
                    }
                },
            ]
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
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
                            color={theme.headerIcon}
                            style={{ alignSelf: 'center', marginTop: 2 }}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: theme.headerText }]}>Configurações</Text>
                </View>
            </Header>

            <ScrollView style={styles.container}>
                {/* {isLogin ?

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: theme.sectionTitleColor }]}>Conta</Text>
                        <View style={{
                            gap: 5,
                            backgroundColor: theme.settingItemBackground,
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 20
                        }}>
                            <View>
                                <Image source={{ uri: 'https://i.pravatar.cc/100' }} style={styles.avatar} />
                            </View>
                            <Text
                                style={{ fontSize: 18, color: theme.textPrimary }}
                            >
                                Augusto Almondes
                            </Text>
                            <Text
                                style={{ fontSize: 12, color: theme.textTertiary }}
                            >
                                augusto@teste.com
                            </Text>
                        </View>
                    </View>
                    :

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: theme.sectionTitleColor }]}>Conta</Text>
                        <TouchableOpacity
                            style={[styles.settingItem, { backgroundColor: theme.settingItemBackground }]}
                            activeOpacity={0.7}
                            onPress={() => router.push('/login')}
                        >
                            <View style={styles.itemLeft}>
                                <Feather name="user" size={20} color={COLORS.badges.indigo} />
                                <Text style={[styles.itemText, { color: theme.textPrimary }]}>Entrar</Text>
                            </View>
                            <Feather name="chevron-right" size={20} color={theme.chevronColor} />
                        </TouchableOpacity>
                    </View>
                } */}

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.sectionTitleColor }]}>Preferências</Text>
                    <TouchableOpacity
                        style={[styles.settingItem, { backgroundColor: theme.settingItemBackground }]}
                        activeOpacity={0.7}
                        onPress={() => router.push('/(drawer)/theme')}
                    >
                        <View style={styles.itemLeft}>
                            <Feather name="moon" size={20} color={COLORS.badges.indigo} />
                            <Text style={[styles.itemText, { color: theme.textPrimary }]}>Tema</Text>
                        </View>
                        <Feather name="chevron-right" size={20} color={theme.chevronColor} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.settingItem, { backgroundColor: theme.settingItemBackground }]}
                        activeOpacity={0.7}
                        onPress={() => router.push('/(drawer)/language')}
                    >
                        <View style={styles.itemLeft}>
                            <Feather name="globe" size={20} color={COLORS.badges.indigo} />
                            <Text style={[styles.itemText, { color: theme.textPrimary }]}>Idioma das Notícias</Text>
                        </View>
                        <Feather name="chevron-right" size={20} color={theme.chevronColor} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.settingItem, { backgroundColor: theme.settingItemBackground }]}
                        activeOpacity={0.7}
                        onPress={() => router.push('/(drawer)/notifications')}
                    >
                        <View style={styles.itemLeft}>
                            <Feather name="bell" size={20} color={COLORS.badges.indigo} />
                            <Text style={[styles.itemText, { color: theme.textPrimary }]}>Notificações</Text>
                        </View>
                        <Feather name="chevron-right" size={20} color={theme.chevronColor} />
                    </TouchableOpacity>
                </View>

                {/* ── Leitura ────────────────────────────────────────────── */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.sectionTitleColor }]}>Leitura</Text>
                    <View style={[styles.settingCard, { backgroundColor: theme.settingItemBackground }]}>
                        <View style={styles.itemLeft}>
                            <Feather name="type" size={20} color={COLORS.badges.purple} />
                            <Text style={[styles.itemText, { color: theme.textPrimary }]}>Tamanho da fonte</Text>
                        </View>
                        <View style={styles.fontSizeRow}>
                            {(['small', 'medium', 'large'] as FontSizeOption[]).map((size) => (
                                <TouchableOpacity
                                    key={size}
                                    activeOpacity={0.7}
                                    style={[
                                        styles.fontSizeOption,
                                        {
                                            backgroundColor: fontSize === size
                                                ? COLORS.badges.indigo
                                                : theme.backgroundTertiary,
                                            borderColor: fontSize === size
                                                ? COLORS.badges.indigo
                                                : theme.border,
                                        }
                                    ]}
                                    onPress={() => setFontSize(size)}
                                >
                                    <Text style={[
                                        styles.fontSizeLabel,
                                        { color: fontSize === size ? '#fff' : theme.textSecondary }
                                    ]}>
                                        {FONT_SIZE_LABELS[size]}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>

                {/* ── Dados e armazenamento ──────────────────────────────── */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.sectionTitleColor }]}>Dados e armazenamento</Text>

                    <TouchableOpacity
                        style={[styles.settingItem, styles.dangerItem, { backgroundColor: theme.settingItemBackground }]}
                        activeOpacity={0.7}
                        onPress={handleClearHistory}
                    >
                        <View style={styles.itemLeft}>
                            <Feather name="clock" size={20} color={COLORS.badges.blue} />
                            <View>
                                <Text style={[styles.itemText, { color: theme.textPrimary }]}>Limpar histórico</Text>
                                <Text style={[styles.itemSubtext, { color: theme.textTertiary }]}>Remove todo o histórico de leitura</Text>
                            </View>
                        </View>
                        <Feather name="trash-2" size={18} color={COLORS.badges.blue} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.settingItem, styles.dangerItem, { backgroundColor: theme.settingItemBackground }]}
                        activeOpacity={0.7}
                        onPress={handleClearFavorites}
                    >
                        <View style={styles.itemLeft}>
                            <Feather name="heart" size={20} color={COLORS.badges.blue} />
                            <View>
                                <Text style={[styles.itemText, { color: theme.textPrimary }]}>Limpar favoritos</Text>
                                <Text style={[styles.itemSubtext, { color: theme.textTertiary }]}>Remove todas as notícias favoritas</Text>
                            </View>
                        </View>
                        <Feather name="trash-2" size={18} color={COLORS.badges.blue} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.settingItem, styles.dangerItem, { backgroundColor: theme.settingItemBackground }]}
                        activeOpacity={0.7}
                        onPress={handleClearReadList}
                    >
                        <View style={styles.itemLeft}>
                            <Feather name="bookmark" size={20} color={COLORS.badges.blue} />
                            <View>
                                <Text style={[styles.itemText, { color: theme.textPrimary }]}>Limpar lista de leitura</Text>
                                <Text style={[styles.itemSubtext, { color: theme.textTertiary }]}>Remove todos os itens salvos para ler</Text>
                            </View>
                        </View>
                        <Feather name="trash-2" size={18} color={COLORS.badges.blue} />
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.sectionTitleColor }]}>Mais</Text>
                    <TouchableOpacity
                        style={[styles.settingItem, { backgroundColor: theme.settingItemBackground }]}
                        activeOpacity={0.7}
                        onPress={() => router.push('/(drawer)/about')}
                    >
                        <View style={styles.itemLeft}>
                            <Feather name="info" size={20} color={COLORS.badges.teal} />
                            <Text style={[styles.itemText, { color: theme.textPrimary }]}>Sobre</Text>
                        </View>
                        <Feather name="chevron-right" size={20} color={theme.chevronColor} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.settingItem, { backgroundColor: theme.settingItemBackground }]}
                        activeOpacity={0.7}
                        onPress={() => router.push('/(drawer)/privacy')}
                    >
                        <View style={styles.itemLeft}>
                            <Feather name="shield" size={20} color={COLORS.badges.green} />
                            <Text style={[styles.itemText, { color: theme.textPrimary }]}>Políticas de Privacidade</Text>
                        </View>
                        <Feather name="chevron-right" size={20} color={theme.chevronColor} />
                    </TouchableOpacity>
                </View>

                {/* {isLogin && <TouchableOpacity
                    style={[styles.settingItem, styles.logoutItem]}
                    activeOpacity={0.7}
                    onPress={() => router.replace('/login')}
                >
                    <View style={styles.itemLeft}>
                        <Feather name="log-out" size={20} color={COLORS.feedback.error[500]} />
                        <Text style={[styles.itemText, { color: COLORS.feedback.error[500] }]}>Sair</Text>
                    </View>
                </TouchableOpacity>} */}

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
    headerTitle: {
        fontSize: 24,
    },
    section: {
        marginTop: 25,
        gap: 10,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginLeft: 5,
        marginBottom: 5,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: 8,
    },
    settingCard: {
        flexDirection: 'column',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: 8,
        gap: 14,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    itemText: {
        fontSize: 16,
        fontWeight: '500',
    },
    itemSubtext: {
        fontSize: 12,
        marginTop: 2,
    },
    dangerItem: {
        borderRadius: 12,
    },
    fontSizeRow: {
        flexDirection: 'row',
        gap: 10,
    },
    fontSizeOption: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fontSizeLabel: {
        fontSize: 13,
        fontWeight: '600',
    },
    logoutItem: {
        marginTop: 30,
        backgroundColor: COLORS.feedback.error[500] + '15',
        borderWidth: 1,
        borderColor: COLORS.feedback.error[500] + '30',
    },
});
