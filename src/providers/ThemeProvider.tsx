import { useThemeStore, ThemeMode } from '@/src/store/useThemeStore'
import * as SecureStore from 'expo-secure-store'
import React, { createContext, useContext, useEffect, useRef } from 'react'
import { Platform, useColorScheme } from 'react-native'
import * as NavigationBar from 'expo-navigation-bar'
import { lightTheme, darkTheme } from '@/src/design/tokens'

const STORAGE_KEY = 'app_theme_mode'

interface ThemeContextValue {
    isLoaded: boolean
}

const ThemeContext = createContext<ThemeContextValue>({ isLoaded: false })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const setMode = useThemeStore((s) => s.setMode)
    const mode = useThemeStore((s) => s.mode)
    const systemScheme = useColorScheme()
    const [isLoaded, setIsLoaded] = React.useState(false)
    const isFirstRun = useRef(true)

    useEffect(() => {
        SecureStore.getItemAsync(STORAGE_KEY)
            .then((saved) => {
                if (saved === 'dark' || saved === 'light' || saved === 'system') {
                    setMode(saved as ThemeMode)
                }
            })
            .catch(() => {})
            .finally(() => {
                setIsLoaded(true)
            })
    }, [])

    useEffect(() => {
        const unsub = useThemeStore.subscribe((state) => {
            if (isFirstRun.current) {
                isFirstRun.current = false
                return
            }
            SecureStore.setItemAsync(STORAGE_KEY, state.mode).catch(() => {})
        })
        return unsub
    }, [])

    useEffect(() => {
        if (Platform.OS !== 'android') return
        if (!isLoaded) return
        const resolvedIsDark = mode === 'system' ? (systemScheme ?? 'dark') === 'dark' : mode === 'dark'
        const bg = resolvedIsDark ? darkTheme.bg.primary : lightTheme.bg.primary
        const buttonStyle = resolvedIsDark ? 'light' : 'dark'
        NavigationBar.setBackgroundColorAsync(bg).catch(() => {})
        NavigationBar.setButtonStyleAsync(buttonStyle as any).catch(() => {})
    }, [mode, systemScheme, isLoaded])

    return (
        <ThemeContext.Provider value={{ isLoaded }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useThemeLoaded() {
    return useContext(ThemeContext).isLoaded
}