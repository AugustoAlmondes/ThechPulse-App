import Header from '@/src/components/layout/Header'
import Card from '@/src/components/shared/Card';
import { COLORS } from '@/src/theme/global';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router'
import { useMemo } from 'react';
import { Alert, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useThemeColors } from '@/src/hooks/useThemeColors';
import { useHistoricStore } from '@/src/store/historicStore';

export default function History() {

    const days = useHistoricStore(state => state.days);
    const removeHistoricEntry = useHistoricStore(state => state.removeHistoricEntry);
    const clearHistoric = useHistoricStore(state => state.clearHistoric);
    const totalHistoric = useHistoricStore(state => state.totalHistoric());

    const navigation = useNavigation();
    const theme = useThemeColors();

    const sections = useMemo(() => {
        const todayStr = new Date().toISOString().split('T')[0];
        const yesterdayDate = new Date();
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        const yesterdayStr = yesterdayDate.toISOString().split('T')[0];

        return days.map(day => {
            let label = day.date;
            if (day.date === todayStr) {
                label = 'Hoje';
            } else if (day.date === yesterdayStr) {
                label = 'Ontem';
            } else {
                const parts = day.date.split('-');
                if (parts.length === 3) {
                    label = `${parts[2]}/${parts[1]}/${parts[0]}`;
                }
            }

            return {
                title: label,
                dateStr: day.date,
                data: day.entries.map(e => e.news)
            };
        });
    }, [days]);

    const handleClearAll = () => {
        Alert.alert(
            "Limpar histórico",
            "Tem certeza que deseja apagar todo o histórico de leituras?",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Limpar", style: "destructive", onPress: clearHistoric },
            ]
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            <Header>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%'
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
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
                        <Text style={[styles.headerTitle, { color: theme.headerText }]}>Histórico</Text>
                    </View>
                    {totalHistoric > 0 && (
                        <TouchableOpacity
                            onPress={handleClearAll}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Feather name="trash-2" size={20} color={theme.headerText} />
                        </TouchableOpacity>
                    )}
                </View>
            </Header>

            {sections.length === 0 ? (
                <View style={styles.emptyState}>
                    <Ionicons
                        name="time-outline"
                        size={48}
                        color={theme.textDisabled + "80"}
                    />
                    <Text style={[styles.emptyTitle, { color: theme.textPrimary }]}>
                        Nenhuma notícia lida
                    </Text>
                    <Text style={[styles.emptySubtitle, { color: theme.textMuted }]}>
                        As notícias que você abrir aparecerão aqui, organizadas por dia.
                    </Text>
                </View>
            ) : (
                <SectionList
                    style={styles.container}
                    sections={sections}
                    keyExtractor={(item) => item.id}
                    renderSectionHeader={({ section: { title } }) => (
                        <View style={[styles.sectionHeader, { backgroundColor: theme.background }]}>
                            <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>{title}</Text>
                        </View>
                    )}
                    renderItem={({ item, section }) => (
                        <Card
                            data={item}
                            showDescription={false}
                            showImage={false}
                            showSubjects={false}
                            showDate={false}
                            minHeigth={50}
                            showAction={true}
                            showCreator={false}
                            color={theme.cardBackground}
                            actions={
                                <TouchableOpacity
                                    onPress={() => removeHistoricEntry(item.id, section.dateStr)}
                                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                    activeOpacity={0.7}
                                >
                                    <Feather
                                        name="x"
                                        size={16}
                                        color={theme.textMuted}
                                    />
                                </TouchableOpacity>
                            }
                        />
                    )}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    SectionSeparatorComponent={() => <View style={{ height: 8 }} />}
                    contentContainerStyle={{ paddingBottom: 24 }}
                />
            )}
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
    sectionHeader: {
        paddingTop: 20,
        paddingBottom: 8,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: 0.6,
    },
    separator: {
        height: 10,
    },
    emptyState: {
        flex: 1,
        marginTop: 120,
        alignItems: "center",
        gap: 14,
        paddingHorizontal: 30,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
    },
    emptySubtitle: {
        fontSize: 14,
        textAlign: "center",
        lineHeight: 20,
    },
});
