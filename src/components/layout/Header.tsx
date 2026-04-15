import { COLORS } from "@/src/theme/global";
import { StyleSheet, Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import React from "react";

export default function Header({ children }: { children: React.ReactNode }) {
    return (
        <>
            <View style={styles.container}>
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
        backgroundColor: COLORS.neutral[900],
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 80,
        paddingLeft: 30,
        paddingRight: 30,
    }
})