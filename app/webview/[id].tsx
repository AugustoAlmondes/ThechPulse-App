import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useThemeColors } from '@/src/hooks/useThemeColors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function NewsWebView() {
    const { url, title } = useLocalSearchParams();
    const theme = useThemeColors();
    const router = useRouter();

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={[styles.header, { backgroundColor: theme.background, borderBottomColor: theme.cardBackground }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={theme.textPrimary} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: theme.textPrimary }]} numberOfLines={1}>
                    {title || 'Notícia'}
                </Text>
                <View style={{ width: 24 }} />
            </View>
            
            {url ? (
                <WebView 
                    source={{ uri: url as string }} 
                    style={styles.webview}
                    startInLoadingState={true}
                />
            ) : (
                <View style={styles.errorContainer}>
                    <Text style={[styles.errorText, { color: theme.textPrimary }]}>Erro: URL não fornecida.</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
    },
    backButton: {
        padding: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 10,
    },
    webview: {
        flex: 1,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorText: {
        fontSize: 16,
    }
});
