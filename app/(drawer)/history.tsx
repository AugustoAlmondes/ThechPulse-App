import Header from '@/src/components/layout/Header'
import Card from '@/src/components/shared/Card';
import { HISTORY, NEWS } from '@/src/constants/news';
import { COLORS } from '@/src/theme/global';
import { groupNewsByDate } from '@/src/utils/groupNewsByDate';
import Feather from '@expo/vector-icons/Feather';
import { DrawerActions } from '@react-navigation/native';
import { router, useNavigation } from 'expo-router'
import { useMemo } from 'react';
import { SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useThemeColors } from '@/src/hooks/useThemeColors';

export default function History() {

    const sections = useMemo(() => groupNewsByDate(HISTORY), [HISTORY])
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
                    <Text style={[styles.headerTitle, { color: theme.headerText }]}>Histórico</Text>
                </View>
            </Header>

            <SectionList
                style={styles.container}
                sections={sections}
                keyExtractor={(item) => item.title}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={[styles.sectionHeader, { backgroundColor: theme.background }]}>
                        <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>{title}</Text>
                    </View>
                )}
                renderItem={({ item }) => (
                    <Card
                        data={item}
                        showDescription={false}
                        showImage={false}
                        showSubjects={false}
                        showDate={false}
                        minHeigth={50}
                        showAction={false}
                        showCreator={false}
                        color={theme.cardBackground}
                    />
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                SectionSeparatorComponent={() => <View style={{ height: 8 }} />}
                contentContainerStyle={{ paddingBottom: 24 }}
            />
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
});
