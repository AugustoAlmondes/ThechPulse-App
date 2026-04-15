import Header from "@/src/components/layout/Header";
import { SUBJECTS } from "@/src/constants/subjects";
import { COLORS } from "@/src/theme/global";
import Feather from '@expo/vector-icons/Feather';
import { FlatList, Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function News() {
    return (
        <>
            <Header>
                <Text style={styles.headerTitle}>Notícias</Text>
            </Header>

            <ScrollView style={styles.container}
                keyboardShouldPersistTaps='handled'
            >

                <View style={styles.searchContainer}>
                    <Feather name="search" color={COLORS.neutral[400]} size={24} />
                    <TextInput
                        placeholder="Buscar"
                        placeholderTextColor={COLORS.neutral[400]}
                        style={styles.searchInput}
                    />
                </View>

                <View style={styles.subjectsBody}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={(SUBJECTS)}
                        contentContainerStyle={styles.subjects}
                        renderItem={({ item, index }) => (
                            <Text key={index} style={styles.subject}>{item}</Text>
                        )}
                    />
                </View>

                <Text style={styles.title}>Notícias</Text>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.neutral[900],
        paddingHorizontal: 15,
    },
    title: {
        color: COLORS.neutral.white
    },
    headerTitle: {
        width: '100%',
        color: COLORS.neutral.white,
        fontSize: 22,
        fontWeight: '200'
    },
    searchContainer: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginBottom: 20,
        paddingVertical: 4,
        gap: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: COLORS.neutral[700] + 70,
    },
    searchInput: {
        width: '100%',
        color: COLORS.neutral.white,
        height: 40,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    subjectsBody: {
        width: '100%',
        marginBottom: 15,
    },
    subjects: {
        color: COLORS.neutral.white,
        fontSize: 14,
        paddingVertical: 6,
        borderRadius: 20
    },
    subject: {
        color: COLORS.neutral.white,
        fontSize: 16,
        marginRight: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: 'flex-start',
        backgroundColor: COLORS.primary[700],
        borderRadius: 20,
    },
})