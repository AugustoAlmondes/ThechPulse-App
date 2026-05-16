import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type FontSizeOption = 'small' | 'medium' | 'large'

export const FONT_SIZE_VALUES: Record<FontSizeOption, number> = {
    small: 14,
    medium: 17,
    large: 21,
}

type FontSizeState = {
    fontSize: FontSizeOption
    setFontSize: (size: FontSizeOption) => void
}

export const useFontSizeStore = create<FontSizeState>()(
    persist(
        (set) => ({
            fontSize: 'medium',
            setFontSize: (size) => set({ fontSize: size }),
        }),
        {
            name: 'font-size-storage',
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
