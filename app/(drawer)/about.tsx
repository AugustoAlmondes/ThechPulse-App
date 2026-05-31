import Header from '@/src/components/layout/Header';
import { useThemeColors } from '@/src/hooks/useThemeColors';
import { COLORS } from '@/src/theme/global';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const APP_VERSION = '1.0.0';
const BUILD_NUMBER = '1';
const RELEASE_DATE = 'Maio de 2026';
const DEVELOPER = 'Augusto Almondes';
const GITHUB_URL = 'https://github.com/augustoalmondes/TechPulse-App';
const BUNDLE_ID = 'com.augustoalmondes.techpulse';

interface InfoRowProps {
    label: string;
    value: string;
    theme: ReturnType<typeof useThemeColors>;
}

function InfoRow({ label, value, theme }: InfoRowProps) {
    return (
        <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.textSubtle }]}>{label}</Text>
            <Text style={[styles.infoValue, { color: theme.textPrimary }]}>{value}</Text>
        </View>
    );
}

interface FeatureItemProps {
    icon: keyof typeof Feather.glyphMap;
    color: string;
    title: string;
    description: string;
    theme: ReturnType<typeof useThemeColors>;
}

function FeatureItem({ icon, color, title, description, theme }: FeatureItemProps) {
    return (
        <View style={[styles.featureItem, { backgroundColor: theme.settingItemBackground }]}>
            <View style={[styles.featureIconBg, { backgroundColor: color + '20' }]}>
                <Feather name={icon} size={20} color={color} />
            </View>
            <View style={styles.featureText}>
                <Text style={[styles.featureTitle, { color: theme.textPrimary }]}>{title}</Text>
                <Text style={[styles.featureDescription, { color: theme.textTertiary }]}>{description}</Text>
            </View>
        </View>
    );
}

interface TechBadgeProps {
    label: string;
    color: string;
    theme: ReturnType<typeof useThemeColors>;
}

function TechBadge({ label, color, theme }: TechBadgeProps) {
    return (
        <View style={[styles.techBadge, { backgroundColor: color + '18', borderColor: color + '40' }]}>
            <Text style={[styles.techBadgeText, { color }]}>{label}</Text>
        </View>
    );
}

interface LinkRowProps {
    icon: keyof typeof Feather.glyphMap;
    color: string;
    label: string;
    subtitle: string;
    onPress: () => void;
    theme: ReturnType<typeof useThemeColors>;
}

function LinkRow({ icon, color, label, subtitle, onPress, theme }: LinkRowProps) {
    return (
        <TouchableOpacity
            style={[styles.linkRow, { backgroundColor: theme.settingItemBackground }]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.linkRowLeft}>
                <View style={[styles.linkIconBg, { backgroundColor: color + '20' }]}>
                    <Feather name={icon} size={18} color={color} />
                </View>
                <View>
                    <Text style={[styles.linkLabel, { color: theme.textPrimary }]}>{label}</Text>
                    <Text style={[styles.linkSubtitle, { color: theme.textSubtle }]}>{subtitle}</Text>
                </View>
            </View>
            <Feather name="external-link" size={16} color={theme.chevronColor} />
        </TouchableOpacity>
    );
}

export default function About() {
    const theme = useThemeColors();

    const techStack = [
        { label: 'React Native', color: COLORS.badges.cyan },
        { label: 'Expo', color: COLORS.badges.indigo },
        { label: 'TypeScript', color: COLORS.badges.blue },
        { label: 'Expo Router', color: COLORS.badges.purple },
        { label: 'Zustand', color: COLORS.badges.orange },
        { label: 'TanStack Query', color: COLORS.badges.red },
        { label: 'React Native Reanimated', color: COLORS.badges.teal },
        { label: 'Axios', color: COLORS.badges.green },
    ];

    const features = [
        {
            icon: 'rss' as keyof typeof Feather.glyphMap,
            color: COLORS.badges.blue,
            title: 'Notícias em tempo real',
            description: 'Acesse as últimas novidades do mundo tech com atualização automática.',
        },
        {
            icon: 'bookmark' as keyof typeof Feather.glyphMap,
            color: COLORS.badges.purple,
            title: 'Lista de leitura',
            description: 'Salve artigos para ler mais tarde, mesmo sem internet.',
        },
        {
            icon: 'heart' as keyof typeof Feather.glyphMap,
            color: COLORS.badges.red,
            title: 'Favoritos',
            description: 'Marque as notícias favoritas e acesse-as rapidamente.',
        },
        {
            icon: 'clock' as keyof typeof Feather.glyphMap,
            color: COLORS.badges.orange,
            title: 'Histórico de leitura',
            description: 'Acompanhe tudo que você já leu com data e hora.',
        },
        {
            icon: 'moon' as keyof typeof Feather.glyphMap,
            color: COLORS.badges.indigo,
            title: 'Modo escuro e claro',
            description: 'Adapta-se ao tema do sistema ou à sua preferência.',
        },
        {
            icon: 'globe' as keyof typeof Feather.glyphMap,
            color: COLORS.badges.teal,
            title: 'Idioma das notícias',
            description: 'Leia em Português ou Inglês conforme sua preferência.',
        },
        {
            icon: 'type' as keyof typeof Feather.glyphMap,
            color: COLORS.badges.cyan,
            title: 'Tamanho de fonte',
            description: 'Personalize o tamanho do texto para maior conforto.',
        },
        {
            icon: 'bell' as keyof typeof Feather.glyphMap,
            color: COLORS.badges.green,
            title: 'Notificações',
            description: 'Receba alertas das notícias mais importantes do dia.',
        },
    ];

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            <Header>
                <View style={styles.headerContent}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => router.replace('/(drawer)/settings')}
                    >
                        <Feather name="arrow-left" size={27} color={theme.headerIcon} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: theme.headerText }]}>Sobre</Text>
                </View>
            </Header>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* ── Hero ────────────────────────────────────────────── */}
                <View style={[styles.heroCard, { backgroundColor: theme.settingItemBackground }]}>
                    <View style={[styles.appIconWrapper, { backgroundColor: COLORS.primary[500] + '20' }]}>
                        <Ionicons name="pulse" size={48} color={COLORS.primary[500]} />
                    </View>
                    <Text style={[styles.appName, { color: theme.textPrimary }]}>TechPulse</Text>
                    <Text style={[styles.appTagline, { color: theme.textTertiary }]}>
                        As últimas notícias de tecnologia na palma da sua mão.
                    </Text>
                    <View style={[styles.versionBadge, { backgroundColor: COLORS.primary[500] + '20', borderColor: COLORS.primary[500] + '50' }]}>
                        <Text style={[styles.versionBadgeText, { color: COLORS.primary[500] }]}>
                            v{APP_VERSION} · Build {BUILD_NUMBER}
                        </Text>
                    </View>
                </View>

                {/* ── Descrição ────────────────────────────────────────── */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.sectionTitleColor }]}>O aplicativo</Text>
                    <View style={[styles.card, { backgroundColor: theme.settingItemBackground }]}>
                        <Text style={[styles.description, { color: theme.textSecondary }]}>
                            TechPulse é um aplicativo de notícias de tecnologia que traz as últimas novidades do mundo tech de forma rápida, intuitiva e elegante.
                        </Text>
                        <Text style={[styles.description, { color: theme.textSecondary, marginTop: 10 }]}>
                            Acompanhe lançamentos, tendências, análises e muito mais — com suporte a favoritos, lista de leitura e histórico completo.
                        </Text>
                    </View>
                </View>

                {/* ── Informações ──────────────────────────────────────── */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.sectionTitleColor }]}>Informações</Text>
                    <View style={[styles.card, { backgroundColor: theme.settingItemBackground }]}>
                        <InfoRow label="Versão" value={`${APP_VERSION} (${BUILD_NUMBER})`} theme={theme} />
                        <View style={[styles.divider, { backgroundColor: theme.border }]} />
                        <InfoRow label="Plataformas" value="iOS · Android · Web" theme={theme} />
                        <View style={[styles.divider, { backgroundColor: theme.border }]} />
                        <InfoRow label="Bundle ID" value={BUNDLE_ID} theme={theme} />
                        <View style={[styles.divider, { backgroundColor: theme.border }]} />
                        <InfoRow label="Lançamento" value={RELEASE_DATE} theme={theme} />
                        <View style={[styles.divider, { backgroundColor: theme.border }]} />
                        <InfoRow label="Desenvolvedor" value={DEVELOPER} theme={theme} />
                        <View style={[styles.divider, { backgroundColor: theme.border }]} />
                        <InfoRow label="SDK mínimo (Android)" value="Android 7.0 (API 24)" theme={theme} />
                        <View style={[styles.divider, { backgroundColor: theme.border }]} />
                        <InfoRow label="Privacidade" value="Pública · Código aberto" theme={theme} />
                    </View>
                </View>

                {/* ── Funcionalidades ──────────────────────────────────── */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.sectionTitleColor }]}>Funcionalidades</Text>
                    <View style={styles.featureList}>
                        {features.map((f, i) => (
                            <FeatureItem key={i} {...f} theme={theme} />
                        ))}
                    </View>
                </View>

                {/* ── Stack tecnológico ────────────────────────────────── */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.sectionTitleColor }]}>Stack tecnológico</Text>
                    <View style={[styles.card, { backgroundColor: theme.settingItemBackground }]}>
                        <Text style={[styles.stackDescription, { color: theme.textTertiary }]}>
                            Construído com tecnologias modernas de desenvolvimento mobile:
                        </Text>
                        <View style={styles.techGrid}>
                            {techStack.map((t, i) => (
                                <TechBadge key={i} label={t.label} color={t.color} theme={theme} />
                            ))}
                        </View>
                    </View>
                </View>

                {/* ── Links ────────────────────────────────────────────── */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.sectionTitleColor }]}>Links</Text>
                    <View style={styles.linksContainer}>
                        <LinkRow
                            icon="github"
                            color={theme.textPrimary}
                            label="Repositório no GitHub"
                            subtitle={GITHUB_URL.replace('https://', '')}
                            onPress={() => Linking.openURL(GITHUB_URL)}
                            theme={theme}
                        />
                        <LinkRow
                            icon="shield"
                            color={COLORS.badges.green}
                            label="Políticas de Privacidade"
                            subtitle="Veja como seus dados são tratados"
                            onPress={() => router.push('/(drawer)/privacy')}
                            theme={theme}
                        />
                        <LinkRow
                            icon="mail"
                            color={COLORS.badges.blue}
                            label="Contato"
                            subtitle="augustoalmondes@email.com"
                            onPress={() => Linking.openURL('mailto:augustoalmondes@email.com')}
                            theme={theme}
                        />
                    </View>
                </View>

                {/* ── Rodapé ───────────────────────────────────────────── */}
                <View style={styles.footer}>
                    <Text style={[styles.footerText, { color: theme.textSubtle }]}>
                        Feito com ❤️ por {DEVELOPER}
                    </Text>
                    <Text style={[styles.footerCopy, { color: theme.textSubtle }]}>
                        © {new Date().getFullYear()} TechPulse · Todos os direitos reservados
                    </Text>
                </View>

                <View style={{ height: 30 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 15,
        paddingBottom: 20,
    },

    /* Header */
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    headerTitle: {
        fontSize: 24,
    },

    /* Hero */
    heroCard: {
        alignItems: 'center',
        borderRadius: 16,
        paddingVertical: 30,
        paddingHorizontal: 20,
        marginTop: 20,
        gap: 10,
    },
    appIconWrapper: {
        width: 84,
        height: 84,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    appName: {
        fontSize: 30,
        fontWeight: '700',
        letterSpacing: -0.5,
    },
    appTagline: {
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
    },
    versionBadge: {
        marginTop: 6,
        paddingHorizontal: 14,
        paddingVertical: 5,
        borderRadius: 20,
        borderWidth: 1,
    },
    versionBadgeText: {
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 0.3,
    },

    /* Sections */
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
        marginBottom: 4,
    },

    /* Generic card */
    card: {
        borderRadius: 14,
        paddingVertical: 16,
        paddingHorizontal: 18,
    },
    description: {
        fontSize: 14,
        lineHeight: 22,
    },

    /* Info rows */
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 9,
    },
    infoLabel: {
        fontSize: 14,
        flex: 1,
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '500',
        flex: 1,
        textAlign: 'right',
    },
    divider: {
        height: 1,
        opacity: 0.4,
    },

    /* Feature items */
    featureList: {
        gap: 8,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        borderRadius: 12,
        paddingVertical: 13,
        paddingHorizontal: 14,
    },
    featureIconBg: {
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    featureText: {
        flex: 1,
    },
    featureTitle: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 2,
    },
    featureDescription: {
        fontSize: 12,
        lineHeight: 17,
    },

    /* Tech badges */
    stackDescription: {
        fontSize: 13,
        lineHeight: 20,
        marginBottom: 14,
    },
    techGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    techBadge: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 20,
        borderWidth: 1,
    },
    techBadgeText: {
        fontSize: 12,
        fontWeight: '600',
    },

    /* Link rows */
    linksContainer: {
        gap: 8,
    },
    linkRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    linkRowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        flex: 1,
    },
    linkIconBg: {
        width: 36,
        height: 36,
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    linkLabel: {
        fontSize: 15,
        fontWeight: '500',
    },
    linkSubtitle: {
        fontSize: 11,
        marginTop: 1,
    },

    /* Footer */
    footer: {
        alignItems: 'center',
        marginTop: 30,
        gap: 4,
    },
    footerText: {
        fontSize: 13,
    },
    footerCopy: {
        fontSize: 11,
    },
});
