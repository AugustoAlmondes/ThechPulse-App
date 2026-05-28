'use no memo'; // Desativa o React Compiler neste arquivo — Animated.Value é mutável e incompatível com memoização automática

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Dimensions, useColorScheme } from 'react-native';
import { COLORS } from '@/src/theme/global';
import { useThemeStore } from '@/src/store/useThemeStore';

const { width, height } = Dimensions.get('window');

/**
 * LoadingScreen
 *
 * Exibida enquanto o ThemeProvider carrega o tema salvo do disco.
 * Adapta automaticamente ao esquema do sistema enquanto o tema
 * do usuário ainda não foi hidratado.
 */
export function LoadingScreen() {
    const mode = useThemeStore((s) => s.mode);
    const systemScheme = useColorScheme();

    const resolvedScheme =
        mode === 'system' ? (systemScheme ?? 'dark') : mode;
    const isDark = resolvedScheme === 'dark';

    const bg = isDark ? COLORS.neutral[950] : '#f1f5fc';
    const textColor = isDark ? COLORS.neutral.white : COLORS.neutral[900];
    const mutedColor = isDark ? COLORS.neutral[500] : COLORS.neutral[500];
    const glowColor = isDark
        ? COLORS.primary[500] + '30'
        : COLORS.primary[200] + '60';

    // ── Animated values ────────────────────────────────────────
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.88)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const ring1Anim = useRef(new Animated.Value(0)).current;
    const ring2Anim = useRef(new Animated.Value(0)).current;
    const dotAnim1 = useRef(new Animated.Value(0)).current;
    const dotAnim2 = useRef(new Animated.Value(0)).current;
    const dotAnim3 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Entrada: fade + scale
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 550,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 55,
                friction: 8,
                useNativeDriver: true,
            }),
        ]).start();

        // Pulse suave do logo
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.07,
                    duration: 950,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 950,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
            ])
        );

        // Ripple rings
        const ripple = (anim: Animated.Value, delay: number) =>
            Animated.loop(
                Animated.sequence([
                    Animated.delay(delay),
                    Animated.timing(anim, {
                        toValue: 1,
                        duration: 2000,
                        easing: Easing.out(Easing.quad),
                        useNativeDriver: true,
                    }),
                    Animated.timing(anim, {
                        toValue: 0,
                        duration: 0,
                        useNativeDriver: true,
                    }),
                ])
            );

        // Dots bounce
        const dot = (anim: Animated.Value, delay: number) =>
            Animated.loop(
                Animated.sequence([
                    Animated.delay(delay),
                    Animated.timing(anim, {
                        toValue: 1,
                        duration: 380,
                        easing: Easing.inOut(Easing.sin),
                        useNativeDriver: true,
                    }),
                    Animated.timing(anim, {
                        toValue: 0,
                        duration: 380,
                        easing: Easing.inOut(Easing.sin),
                        useNativeDriver: true,
                    }),
                    Animated.delay(620),
                ])
            );

        const ring1 = ripple(ring1Anim, 0);
        const ring2 = ripple(ring2Anim, 950);
        const d1 = dot(dotAnim1, 0);
        const d2 = dot(dotAnim2, 200);
        const d3 = dot(dotAnim3, 400);

        pulse.start();
        ring1.start();
        ring2.start();
        d1.start();
        d2.start();
        d3.start();

        // Cleanup: para todas as animações ao desmontar
        return () => {
            pulse.stop();
            ring1.stop();
            ring2.stop();
            d1.stop();
            d2.stop();
            d3.stop();
        };
    }, []); // sem deps — roda uma única vez

    const ringInterpolation = (anim: Animated.Value) => ({
        opacity: anim.interpolate({
            inputRange: [0, 0.25, 1],
            outputRange: [0, 0.45, 0],
        }),
        transform: [
            {
                scale: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 2.3],
                }),
            },
        ],
    });

    const dotInterpolation = (anim: Animated.Value) => ({
        opacity: anim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }),
        transform: [
            {
                translateY: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -7],
                }),
            },
        ],
    });

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    backgroundColor: bg,
                    opacity: fadeAnim,
                    transform: [{ scale: scaleAnim }],
                },
            ]}
        >
            {/* Ripple rings */}
            <View style={styles.rippleWrapper}>
                <Animated.View
                    style={[
                        styles.ring,
                        { backgroundColor: glowColor },
                        ringInterpolation(ring1Anim),
                    ]}
                />
                <Animated.View
                    style={[
                        styles.ring,
                        { backgroundColor: glowColor },
                        ringInterpolation(ring2Anim),
                    ]}
                />

                {/* Logo */}
                <Animated.View
                    style={[
                        styles.logoContainer,
                        {
                            backgroundColor: isDark
                                ? COLORS.neutral[900]
                                : '#ffffff',
                        },
                        { transform: [{ scale: pulseAnim }] },
                    ]}
                >
                    <View
                        style={[
                            styles.logoGlow,
                            { backgroundColor: glowColor },
                        ]}
                    />
                    <View style={styles.logoMark}>
                        <Text
                            style={[
                                styles.logoLetter,
                                { color: COLORS.primary[400] },
                            ]}
                        >
                            T
                        </Text>
                        <Text
                            style={[
                                styles.logoLetterAccent,
                                { color: textColor },
                            ]}
                        >
                            P
                        </Text>
                    </View>
                </Animated.View>
            </View>

            {/* Nome do app */}
            <View style={styles.nameRow}>
                <Text style={[styles.appName, { color: textColor }]}>
                    Tech
                </Text>
                <Text
                    style={[
                        styles.appNameAccent,
                        { color: COLORS.primary[400] },
                    ]}
                >
                    Pulse
                </Text>
            </View>

            {/* Tagline */}
            <Text style={[styles.tagline, { color: mutedColor }]}>
                Tecnologia em tempo real
            </Text>

            {/* Loading dots */}
            <View style={styles.dotsRow}>
                {([dotAnim1, dotAnim2, dotAnim3] as Animated.Value[]).map(
                    (anim, i) => (
                        <Animated.View
                            key={i}
                            style={[
                                styles.dot,
                                { backgroundColor: COLORS.primary[400] },
                                dotInterpolation(anim),
                            ]}
                        />
                    )
                )}
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rippleWrapper: {
        width: 120,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
    },
    ring: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    logoContainer: {
        width: 88,
        height: 88,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.primary[500],
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 20,
        elevation: 16,
        overflow: 'hidden',
    },
    logoGlow: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 24,
    },
    logoMark: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    logoLetter: {
        fontSize: 34,
        fontWeight: '800',
        letterSpacing: -1,
        lineHeight: 40,
    },
    logoLetterAccent: {
        fontSize: 28,
        fontWeight: '700',
        letterSpacing: -0.5,
        lineHeight: 36,
        marginBottom: 1,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 8,
    },
    appName: {
        fontSize: 30,
        fontWeight: '700',
        letterSpacing: -0.5,
    },
    appNameAccent: {
        fontSize: 30,
        fontWeight: '700',
        letterSpacing: -0.5,
    },
    tagline: {
        fontSize: 14,
        fontWeight: '400',
        letterSpacing: 0.3,
        marginBottom: 48,
    },
    dotsRow: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    dot: {
        width: 7,
        height: 7,
        borderRadius: 4,
    },
});
