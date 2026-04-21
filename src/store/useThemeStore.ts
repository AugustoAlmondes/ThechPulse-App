import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type ThemeMode = 'dark' | 'light' | 'system'

type ThemeState = {
    mode: ThemeMode
    setMode: (mode: ThemeMode) => void
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            mode: 'dark',
            setMode: (mode) => set({ mode }),
        }),
        {
            name: 'theme-storage',
            storage: {
                getItem: async (name) => {
                    const value = await AsyncStorage.getItem(name)
                    return value ? JSON.parse(value) : null
                },
                setItem: async (name, value) => {
                    await AsyncStorage.setItem(name, JSON.stringify(value))
                },
                removeItem: async (name) => {
                    await AsyncStorage.removeItem(name)
                },
            },
        }
    )
)
