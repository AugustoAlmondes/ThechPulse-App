import { useThemeStore, ThemeMode } from '@/src/store/useThemeStore'
import * as SecureStore from 'expo-secure-store'
import React, { createContext, useContext, useEffect, useRef } from 'react'

const STORAGE_KEY = 'app_theme_mode'

interface ThemeContextValue {
    isLoaded: boolean
}

const ThemeContext = createContext<ThemeContextValue>({ isLoaded: false })

/**
 * ThemeProvider:
 * - On mount: reads saved theme from expo-secure-store and hydrates the Zustand store
 * - When setMode is called: persists the value back to expo-secure-store via a subscription
 *
 * This pattern avoids using AsyncStorage (which crashes on RN New Architecture with v3.x)
 * and avoids Zustand's persist middleware entirely.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const setMode = useThemeStore((s) => s.setMode)
    const [isLoaded, setIsLoaded] = React.useState(false)
    const isFirstRun = useRef(true)

    // Hydrate store from disk on mount
    useEffect(() => {
        SecureStore.getItemAsync(STORAGE_KEY)
            .then((saved) => {
                if (saved === 'dark' || saved === 'light' || saved === 'system') {
                    setMode(saved as ThemeMode)
                }
            })
            .catch(() => {
                // Ignore read errors — default to initial store value ('dark')
            })
            .finally(() => {
                setIsLoaded(true)
            })
    }, [])

    // Subscribe to store changes and persist to disk (skip the first emission)
    useEffect(() => {
        const unsub = useThemeStore.subscribe((state) => {
            if (isFirstRun.current) {
                isFirstRun.current = false
                return
            }
            SecureStore.setItemAsync(STORAGE_KEY, state.mode).catch(() => {
                // Ignore write errors silently
            })
        })
        return unsub
    }, [])

    return (
        <ThemeContext.Provider value={{ isLoaded }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useThemeLoaded() {
    return useContext(ThemeContext).isLoaded
}
