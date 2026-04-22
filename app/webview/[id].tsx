import React, { useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Animated, PanResponder } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useThemeColors } from '@/src/hooks/useThemeColors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '@/src/theme/global';
import Entypo from '@expo/vector-icons/Entypo';
import { useFavoriteStore } from '@/src/store/useFavoriteStore';
import { TypeNews } from '@/src/types/NewsType';

export default function NewsWebView() {
    const { url, title, newsData, id } = useLocalSearchParams();
    const theme = useThemeColors();
    const router = useRouter();
    
    // Favorite Logic
    const parsedData: TypeNews | null = newsData ? JSON.parse(newsData as string) : null;
    const isFav = useFavoriteStore(state => state.favoriteNews.some(n => n.id === id));
    const addFavoriteNews = useFavoriteStore(state => state.addFavoriteNews);
    const removeFavoriteNews = useFavoriteStore(state => state.removeFavoriteNews);

    const handleFavorite = () => {
        if (!parsedData) return;
        if (isFav) {
            removeFavoriteNews(parsedData);
        } else {
            addFavoriteNews(parsedData);
        }
    };

    // FAB Draggable Logic
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pan = useRef(new Animated.ValueXY()).current;
    
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (e, gestureState) => {
                return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
            },
            onPanResponderGrant: () => {
                pan.setOffset({
                    x: (pan.x as any)._value,
                    y: (pan.y as any)._value
                });
                pan.setValue({ x: 0, y: 0 });
            },
            onPanResponderMove: Animated.event(
                [null, { dx: pan.x, dy: pan.y }],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
                pan.flattenOffset();
            }
        })
    ).current;

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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

            {/* Draggable FAB */}
            <Animated.View
                style={[
                    styles.fabContainer,
                    { transform: [{ translateX: pan.x }, { translateY: pan.y }] }
                ]}
                {...panResponder.panHandlers}
            >
                {isMenuOpen && (
                    <View style={styles.menuOptions}>
                        <TouchableOpacity activeOpacity={0.7} style={[styles.menuItem, { backgroundColor: theme.cardBackground }]} onPress={() => {}}>
                            <Entypo name="share" size={20} color={theme.textPrimary} />
                        </TouchableOpacity>
                        
                        <TouchableOpacity activeOpacity={0.7} style={[styles.menuItem, { backgroundColor: theme.cardBackground }]} onPress={() => {}}>
                            <Ionicons name="bookmark" size={20} color={theme.textPrimary} />
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.7} style={[styles.menuItem, { backgroundColor: theme.cardBackground }]} onPress={handleFavorite}>
                            <Ionicons name="heart" size={20} color={isFav ? COLORS.badges.red : theme.textPrimary} />
                        </TouchableOpacity>
                    </View>
                )}
                <TouchableOpacity activeOpacity={0.8} style={[styles.fabButton, { backgroundColor: COLORS.badges.blue }]} onPress={toggleMenu}>
                    <Ionicons name={isMenuOpen ? "close" : "add"} size={28} color="#fff" />
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
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
        marginLeft: -5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        marginHorizontal: 10,
    },
    webview: {
        flex: 1,
        position: 'relative',
        zIndex: 1,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
    },
    fabContainer: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        alignItems: 'center',
        zIndex: 999,
        elevation: 10,
    },
    menuOptions: {
        alignItems: 'center',
        marginBottom: 10,
        gap: 10,
    },
    menuItem: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    fabButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 6,
    }
});
