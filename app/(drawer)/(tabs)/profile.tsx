import Header from "@/src/components/layout/Header";
import { useThemeColors } from "@/src/hooks/useThemeColors";
import { COLORS } from "@/src/theme/global";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { REAL_NEWS } from "@/src/constants/news";
import Card from "@/src/components/shared/Card";
import { useEffect, useRef } from "react";
import { useScrollStore } from "@/src/store/useScrollStore";

export default function Profile() {
    const theme = useThemeColors();
    const { shouldScrollToTop, resetScroll } = useScrollStore();
    const ScrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        if (shouldScrollToTop) {
            ScrollViewRef.current?.scrollTo({ y: 0, animated: true });
            resetScroll();
        }
    }, [shouldScrollToTop, resetScroll])


    return (
        <>
            <Header>
                <Text style={[styles.headerTitle, { color: theme.headerText }]}>Perfil</Text>
            </Header>

            <ScrollView ref={ScrollViewRef} style={[styles.container, { backgroundColor: theme.background }]}
                keyboardShouldPersistTaps='handled'
            >

                <View
                    style={{ flexDirection: 'row', gap: 15, }}
                >
                    <View
                        style={{
                            backgroundColor: theme.statsBackground,
                            height: 100,
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 10,
                            gap: 10
                        }}>

                        <Text style={{
                            textAlign: 'center',
                            width: '100%',
                            color: theme.statsText,
                            fontSize: 14,
                            fontWeight: '200',
                        }}>
                            Total para leitura:
                        </Text>

                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: '600',
                                color: theme.statsText,
                            }}
                        >
                            {REAL_NEWS.news.length}
                        </Text>
                    </View>
                    <View
                        style={{
                            backgroundColor: theme.statsBackground,
                            height: 100,
                            flex: 1,
                            width: 140,
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 10,
                            gap: 10
                        }}>

                        <Text style={{
                            textAlign: 'center',
                            width: '100%',
                            color: theme.statsText,
                            fontSize: 14,
                            fontWeight: '200',
                        }}>
                            Total lido:
                        </Text>

                        <Text
                            style={{
                                fontSize: 25,
                                fontWeight: '600',
                                color: theme.statsText,
                            }}
                        >
                            {REAL_NEWS.news.length + 12}
                        </Text>
                    </View>
                </View>
                <Text style={[styles.title, { color: theme.textPrimary }]}>Veja as notícias salvas por você para ler depois:</Text>
                <View style={{ gap: 15, marginBottom: 10 }}>

                    {
                        REAL_NEWS.news.map((item, index) => (
                            <Card
                                key={index}
                                data={item}
                                showDescription={false}
                                showDate={false}
                                showSubjects={false}
                                color={theme.cardBackground}
                                actions={
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        style={{ backgroundColor: COLORS.primary[700], paddingHorizontal: 13, paddingVertical: 3 }}>
                                        <Text style={{ color: COLORS.neutral.white, fontWeight: '600', fontSize: 12 }}>Lido</Text>
                                    </TouchableOpacity>
                                }
                            />
                        ))
                    }

                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
    title: {
        marginTop: 20,
        marginBottom: 10
    },
    headerTitle: {
        width: '100%',
        fontSize: 22,
        fontWeight: '200'
    },
})