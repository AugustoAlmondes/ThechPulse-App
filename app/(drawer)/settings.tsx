import Header from '@/src/components/layout/Header'
import Card from '@/src/components/shared/Card';
import { COLORS } from '@/src/theme/global';
import Feather from '@expo/vector-icons/Feather';
import { DrawerActions } from '@react-navigation/native';
import { router, useNavigation } from 'expo-router'
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { useThemeColors } from '@/src/hooks/useThemeColors';

export default function Settings() {

    const [isLogin, setIsLogin] = useState(false);
    const navigation = useNavigation();
    const theme = useThemeColors();

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
                {isLogin ?

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
                }

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
                        onPress={() => router.push('/(drawer)/notifications')}
                    >
                        <View style={styles.itemLeft}>
                            <Feather name="bell" size={20} color={COLORS.badges.indigo} />
                            <Text style={[styles.itemText, { color: theme.textPrimary }]}>Notificações</Text>
                        </View>
                        <Feather name="chevron-right" size={20} color={theme.chevronColor} />
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

                {isLogin && <TouchableOpacity
                    style={[styles.settingItem, styles.logoutItem]}
                    activeOpacity={0.7}
                    onPress={() => router.replace('/login')}
                >
                    <View style={styles.itemLeft}>
                        <Feather name="log-out" size={20} color={COLORS.feedback.error[500]} />
                        <Text style={[styles.itemText, { color: COLORS.feedback.error[500] }]}>Sair</Text>
                    </View>
                </TouchableOpacity>}

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
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 40,
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
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    itemText: {
        fontSize: 16,
        fontWeight: '500',
    },
    logoutItem: {
        marginTop: 30,
        backgroundColor: COLORS.feedback.error[500] + '15', // Light red background
        borderWidth: 1,
        borderColor: COLORS.feedback.error[500] + '30',
    },
});
