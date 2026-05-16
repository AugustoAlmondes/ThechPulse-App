import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type LanguageCode = 'pt' | 'en' | 'es';

export const ALL_LANGUAGES: LanguageCode[] = ['pt', 'en', 'es'];

export const LANGUAGE_OPTIONS: { key: LanguageCode; label: string; icon: 'flag' }[] = [
    { key: 'pt', label: 'Português', icon: 'flag' },
    { key: 'en', label: 'Inglês', icon: 'flag' },
    { key: 'es', label: 'Espanhol', icon: 'flag' },
];

interface LanguageState {
    selectedLanguages: LanguageCode[];
    toggleLanguage: (lang: LanguageCode) => void;
    setAllLanguages: () => void;
}

export const useLanguageStore = create<LanguageState>()(
    persist(
        (set) => ({
            selectedLanguages: ALL_LANGUAGES,
            toggleLanguage: (lang) => set((state) => {
                const isSelected = state.selectedLanguages.includes(lang);
                if (isSelected) {
                    if (state.selectedLanguages.length === 1) return state;
                    return { selectedLanguages: state.selectedLanguages.filter((l) => l !== lang) };
                } else {
                    return { selectedLanguages: [...state.selectedLanguages, lang] };
                }
            }),
            setAllLanguages: () => set({ selectedLanguages: ALL_LANGUAGES }),
        }),
        {
            name: 'teachpulse-language-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
