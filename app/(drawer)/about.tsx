import Header from '@/src/components/layout/Header';
import { useThemeColors } from '@/src/hooks/useThemeColors';
import { COLORS } from '@/src/theme/global';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const APP_VERSION = '1.0.0';

interface FeatureCardProps {
    icon: keyof typeof Feather.glyphMap;
    color: string;
    title: string;
    description: string;
    theme: ReturnType<typeof useThemeColors>;
}

function FeatureCard({ icon, color, title, description, theme }: FeatureCardProps) {
    return (
        <View style={[styles.featureCard, { backgroundColor: theme.settingItemBackground }]}>
            <View style={[styles.featureIconBg, { backgroundColor: color + '22' }]}>
                <Feather name={icon} size={22} color={color} />
            </View>
            <View style={styles.featureTextWrap}>
                <Text style={[styles.featureTitle, { color: theme.textPrimary }]}>{title}</Text>
                <Text style={[styles.featureDesc, { color: theme.textTertiary }]}>{description}</Text>
            </View>
        </View>
    );
}

interface RatingStarProps {
    filled: boolean;
    color: string;
}

function StarRow({ color }: { color: string }) {
    return (
        <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map((i) => (
                <Ionicons key={i} name="star" size={16} color={color} />
            ))}
        </View>
    );
}

export default function About() {
    const theme = useThemeColors();

    const features = [
        {
            icon: 'rss' as keyof typeof Feather.glyphMap,
            color: COLORS.badges.blue,
            title: 'Notícias em tempo real',
            description: 'Acompanhe os últimos acontecimentos do universo tech, atualizados continuamente.',
        },
        {
            icon: 'bookmark' as keyof typeof Feather.glyphMap,
            color: COLORS.badges.purple,
            title: 'Salve para ler depois',
            description: 'Adicione artigos à sua lista de leitura e acesse-os quando quiser.',
        },
        {
            icon: 'heart' as keyof typeof Feather.glyphMap,
            color: COLORS.badges.red,
            title: 'Favoritos organizados',
            description: 'Marque as notícias que você mais gosta e encontre-as rapidamente.',
        },
        {
            icon: 'clock' as keyof typeof Feather.glyphMap,
            color: COLORS.badges.orange,
            title: 'Histórico de leitura',
            description: 'Volte facilmente a qualquer artigo que você já acessou.',
        },
        {
            icon: 'moon' as keyof typeof Feather.glyphMap,
            color: COLORS.badges.indigo,
            title: 'Tema escuro e claro',
            description: 'Leia com conforto a qualquer hora, no tema que preferir.',
        },
        {
            icon: 'globe' as keyof typeof Feather.glyphMap,
            color: COLORS.badges.teal,
            title: 'Notícias em PT e EN',
            description: 'Escolha o idioma das suas notícias: Português ou Inglês.',
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

                {/* ── Hero ─────────────────────────────────────────────── */}
                <View style={[styles.heroCard, { backgroundColor: theme.settingItemBackground }]}>
                    <View style={[styles.appIconWrapper, { backgroundColor: COLORS.primary[500] + '1A' }]}>
                        {/* <Ionicons name="pulse" size={52} color={COLORS.primary[500]} /> */}
                        <Image style={{ width: '100%', height: '100%' }} source={require('@/assets/images/icon.png')} />
                    </View>

                    <Text style={[styles.appName, { color: theme.textPrimary }]}>TechPulse</Text>

                    <Text style={[styles.appTagline, { color: theme.textTertiary }]}>
                        O mundo tech na palma da sua mão.
                    </Text>

                    <View style={[styles.versionPill, { backgroundColor: COLORS.primary[500] + '18', borderColor: COLORS.primary[500] + '40' }]}>
                        <Text style={[styles.versionPillText, { color: COLORS.primary[500] }]}>
                            Versão {APP_VERSION}
                        </Text>
                    </View>

                    <View style={[styles.dividerHero, { backgroundColor: theme.border }]} />

                    <StarRow color={COLORS.badges.orange} />

                    <Text style={[styles.ratingLabel, { color: theme.textSubtle }]}>
                        Avalie-nos na Play Store
                    </Text>
                </View>

                {/* ── Sobre o app ──────────────────────────────────────── */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.sectionTitleColor }]}>O aplicativo</Text>
                    <View style={[styles.descCard, { backgroundColor: theme.settingItemBackground }]}>
                        <Text style={[styles.descText, { color: theme.textSecondary }]}>
                            O <Text style={{ fontWeight: '700', color: theme.textPrimary }}>TechPulse</Text> é o seu portal de notícias de tecnologia — rápido, organizado e elegante.
                        </Text>
                        <Text style={[styles.descText, { color: theme.textSecondary, marginTop: 10 }]}>
                            Fique por dentro de lançamentos, tendências, análises e novidades do setor tech, com uma experiência de leitura agradável e personalizável.
                        </Text>
                    </View>
                </View>

                {/* ── Funcionalidades ──────────────────────────────────── */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.sectionTitleColor }]}>O que você encontra aqui</Text>
                    <View style={styles.featureList}>
                        {features.map((f, i) => (
                            <FeatureCard key={i} {...f} theme={theme} />
                        ))}
                    </View>
                </View>

                {/* ── Compromisso ──────────────────────────────────────── */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.sectionTitleColor }]}>Nosso compromisso</Text>
                    <View style={[styles.commitmentCard, { backgroundColor: theme.settingItemBackground }]}>
                        <View style={styles.commitmentRow}>
                            <View style={[styles.commitIconBg, { backgroundColor: COLORS.badges.green + '20' }]}>
                                <Feather name="shield" size={18} color={COLORS.badges.green} />
                            </View>
                            <View style={styles.commitTextWrap}>
                                <Text style={[styles.commitTitle, { color: theme.textPrimary }]}>Privacidade em primeiro lugar</Text>
                                <Text style={[styles.commitDesc, { color: theme.textTertiary }]}>Seus dados de leitura ficam armazenados apenas no seu dispositivo.</Text>
                            </View>
                        </View>

                        <View style={[styles.divider, { backgroundColor: theme.border }]} />

                        <View style={styles.commitmentRow}>
                            <View style={[styles.commitIconBg, { backgroundColor: COLORS.badges.blue + '20' }]}>
                                <Feather name="zap" size={18} color={COLORS.badges.blue} />
                            </View>
                            <View style={styles.commitTextWrap}>
                                <Text style={[styles.commitTitle, { color: theme.textPrimary }]}>Rápido e leve</Text>
                                <Text style={[styles.commitDesc, { color: theme.textTertiary }]}>Desenvolvido com foco em performance e fluidez em qualquer dispositivo.</Text>
                            </View>
                        </View>

                        <View style={[styles.divider, { backgroundColor: theme.border }]} />

                        <View style={styles.commitmentRow}>
                            <View style={[styles.commitIconBg, { backgroundColor: COLORS.badges.purple + '20' }]}>
                                <Feather name="refresh-cw" size={18} color={COLORS.badges.purple} />
                            </View>
                            <View style={styles.commitTextWrap}>
                                <Text style={[styles.commitTitle, { color: theme.textPrimary }]}>Sempre atualizado</Text>
                                <Text style={[styles.commitDesc, { color: theme.textTertiary }]}>Melhorias contínuas com novidades e correções a cada atualização.</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* ── Links úteis ──────────────────────────────────────── */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: theme.sectionTitleColor }]}>Links úteis</Text>
                    <View style={styles.linksCol}>
                        <TouchableOpacity
                            style={[styles.linkItem, { backgroundColor: theme.settingItemBackground }]}
                            activeOpacity={0.7}
                            onPress={() => router.push('/(drawer)/privacy')}
                        >
                            <View style={styles.linkLeft}>
                                <View style={[styles.linkIconBg, { backgroundColor: COLORS.badges.green + '20' }]}>
                                    <Feather name="file-text" size={18} color={COLORS.badges.green} />
                                </View>
                                <Text style={[styles.linkLabel, { color: theme.textPrimary }]}>Políticas de Privacidade</Text>
                            </View>
                            <Feather name="chevron-right" size={18} color={theme.chevronColor} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.linkItem, { backgroundColor: theme.settingItemBackground }]}
                            activeOpacity={0.7}
                            onPress={() => Linking.openURL('https://play.google.com/store')}
                        >
                            <View style={styles.linkLeft}>
                                <View style={[styles.commitIconBg, { backgroundColor: COLORS.badges.teal + '20' }]}>
                                    <Ionicons name="logo-google-playstore" size={18} color={COLORS.badges.teal} />
                                </View>
                                <Text style={[styles.linkLabel, { color: theme.textPrimary }]}>Avaliar na Play Store</Text>
                            </View>
                            <Feather name="chevron-right" size={18} color={theme.chevronColor} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* ── Footer ───────────────────────────────────────────── */}
                <View style={styles.footer}>
                    <Ionicons name="pulse" size={20} color={COLORS.primary[500] + '80'} />
                    <Text style={[styles.footerApp, { color: theme.textSubtle }]}>TechPulse · Versão {APP_VERSION}</Text>
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
        borderRadius: 18,
        paddingVertical: 32,
        paddingHorizontal: 24,
        marginTop: 20,
        gap: 8,
    },
    appIconWrapper: {
        width: 88,
        height: 88,
        borderRadius: 26,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 6,
    },
    appName: {
        fontSize: 32,
        fontWeight: '800',
        letterSpacing: -0.8,
    },
    appTagline: {
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 4,
    },
    versionPill: {
        paddingHorizontal: 14,
        paddingVertical: 5,
        borderRadius: 20,
        borderWidth: 1,
        marginTop: 2,
    },
    versionPillText: {
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 0.3,
    },
    dividerHero: {
        width: '60%',
        height: 1,
        marginVertical: 12,
        opacity: 0.5,
    },
    starRow: {
        flexDirection: 'row',
        gap: 4,
    },
    ratingLabel: {
        fontSize: 12,
        marginTop: 4,
    },

    /* Sections */
    section: {
        marginTop: 26,
        gap: 10,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginLeft: 4,
        marginBottom: 2,
    },

    /* Description */
    descCard: {
        borderRadius: 14,
        paddingVertical: 18,
        paddingHorizontal: 18,
    },
    descText: {
        fontSize: 14,
        lineHeight: 22,
    },

    /* Features */
    featureList: {
        gap: 8,
    },
    featureCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        borderRadius: 13,
        paddingVertical: 14,
        paddingHorizontal: 15,
    },
    featureIconBg: {
        width: 44,
        height: 44,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    featureTextWrap: {
        flex: 1,
    },
    featureTitle: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 3,
    },
    featureDesc: {
        fontSize: 12,
        lineHeight: 17,
    },

    /* Commitment */
    commitmentCard: {
        borderRadius: 14,
        paddingVertical: 6,
        paddingHorizontal: 16,
    },
    commitmentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        paddingVertical: 14,
    },
    commitIconBg: {
        width: 38,
        height: 38,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    commitTextWrap: {
        flex: 1,
    },
    commitTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 2,
    },
    commitDesc: {
        fontSize: 12,
        lineHeight: 17,
    },
    divider: {
        height: 1,
        opacity: 0.35,
    },

    /* Links */
    linksCol: {
        gap: 8,
    },
    linkItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 13,
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    linkLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
    },
    linkIconBg: {
        width: 38,
        height: 38,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    linkLabel: {
        fontSize: 15,
        fontWeight: '500',
    },

    /* Footer */
    footer: {
        alignItems: 'center',
        marginTop: 32,
        gap: 5,
    },
    footerApp: {
        fontSize: 13,
        fontWeight: '500',
        marginTop: 2,
    },
    footerCopy: {
        fontSize: 11,
    },
});
