import Header from '@/src/components/layout/Header'
import Card from '@/src/components/shared/Card';
import { HISTORY, NEWS } from '@/src/constants/news';
import { COLORS } from '@/src/theme/global';
import { groupNewsByDate } from '@/src/utils/groupNewsByDate';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router'
import { useMemo } from 'react';
import { SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

export default function History() {

    const sections = useMemo(() => groupNewsByDate(HISTORY), [HISTORY])

    return (
        <>
            <Header>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 15
                }}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                            if (router.canGoBack()) {
                                router.back();
                            } else {
                                router.replace('/(drawer)/(tabs)');
                            }
                        }}
                    >
                        <Feather
                            name="arrow-left"
                            size={27}
                            color="white"
                            style={{ alignSelf: 'center', marginTop: 2 }}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Histórico</Text>
                </View>
            </Header>

            <SectionList
                style={styles.container}
                sections={sections}
                keyExtractor={(item) => item.title}
                // staleWhileRevalidate
                // Cabeçalho de cada grupo de data
                renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>{title}</Text>
                    </View>
                )}
                // Card de cada notícia
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
                        color={COLORS.neutral[800]}
                    />
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                SectionSeparatorComponent={() => <View style={{ height: 8 }} />}
                contentContainerStyle={{ paddingBottom: 24 }}
            />
            {/* <ScrollView style={styles.container}>

                <View style={{ gap: 15, marginBottom: 10 }}>
                    {
                        NEWS.map((item, index) => (
                            <Card
                                key={index}
                                data={item}
                                showDescription={false}
                                showImage={false}
                                showSubjects={false}
                                showDate={false}
                                minHeigth={50}
                                showAction={false}
                                showCreator={false}
                                color={COLORS.neutral[800]}
                            />
                        ))
                    }

                </View>
            </ScrollView> */}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: COLORS.neutral[900],
    },
    headerTitle: {
        color: COLORS.neutral.white,
        fontSize: 24,
    },
    sectionHeader: {
        paddingTop: 20,
        paddingBottom: 8,
        backgroundColor: COLORS.neutral[900], // mesma cor do fundo — "gruda" ao topo
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.neutral[400], // cinza mais claro — hierarquia visual
        textTransform: 'uppercase',
        letterSpacing: 0.6,
    },
    separator: {
        height: 10,
    },
});
