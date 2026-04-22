import { create } from 'zustand'

export type ThemeMode = 'dark' | 'light' | 'system'

type ThemeState = {
    mode: ThemeMode
    setMode: (mode: ThemeMode) => void
}

/**
 * Plain Zustand store — no persist middleware.
 * Persistence is handled externally by ThemeProvider using expo-secure-store,
 * which avoids the AsyncStorage LegacyImpl crash on React Native New Architecture.
 */
export const useThemeStore = create<ThemeState>()((set) => ({
    mode: 'dark',
    setMode: (mode) => set({ mode }),
}))
