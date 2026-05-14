import { useThemeColors } from '@/src/hooks/useThemeColors';
import { StyleSheet, View } from "react-native";
import React from "react";

export default function Header({ children }: { children: React.ReactNode }) {
    const theme = useThemeColors();

    return (
        <>
            <View style={[styles.container, { backgroundColor: theme.headerBackground }]}>
                {children}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        top: 0,
        zIndex: 99,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 70,
        paddingLeft: 20,
        paddingRight: 30,
    }
})