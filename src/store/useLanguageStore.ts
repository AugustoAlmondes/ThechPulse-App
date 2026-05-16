import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type LanguageMode = 'pt' | 'en' | 'all';

interface LanguageState {
    mode: LanguageMode;
    setMode: (mode: LanguageMode) => void;
}

export const useLanguageStore = create<LanguageState>()(
    persist(
        (set) => ({
            mode: 'all',
            setMode: (mode) => set({ mode }),
        }),
        {
            name: 'teachpulse-language-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
