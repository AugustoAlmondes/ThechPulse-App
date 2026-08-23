import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type LanguageCode = 'pt' | 'en' | 'es';

export const ALL_LANGUAGES: LanguageCode[] = ['pt', 'en', 'es'];

// Ordem determinística para normalização (evita cache duplicado por permutação)
export const LANGUAGE_ORDER: LanguageCode[] = ['en', 'pt', 'es'];

export const LANGUAGE_OPTIONS: { key: LanguageCode; label: string; icon: 'flag' }[] = [
    { key: 'pt', label: 'Português', icon: 'flag' },
    { key: 'en', label: 'Inglês', icon: 'flag' },
    { key: 'es', label: 'Espanhol', icon: 'flag' },
];

export function normalizeLanguages(languages: LanguageCode[]): LanguageCode[] {
    const deduped = Array.from(new Set(languages.filter((l) => ALL_LANGUAGES.includes(l))));
    return deduped.sort((a, b) => LANGUAGE_ORDER.indexOf(a) - LANGUAGE_ORDER.indexOf(b));
}

export function formatLanguagesQuery(languages: LanguageCode[]): string {
    return normalizeLanguages(languages).join(',');
}

interface LanguageState {
    selectedLanguages: LanguageCode[];
    toggleLanguage: (lang: LanguageCode) => void;
    setLanguages: (langs: LanguageCode[]) => void;
    // Compatibilidade com versão single (v1)
    selectedLanguage?: LanguageCode;
}

export const useLanguageStore = create<LanguageState>()(
    persist(
        (set, get) => ({
            selectedLanguages: ['en', 'pt', 'es'],
            toggleLanguage: (lang) =>
                set((state) => {
                    const isSelected = state.selectedLanguages.includes(lang);
                    if (isSelected) {
                        if (state.selectedLanguages.length === 1) return state; // impede zero
                        const next = state.selectedLanguages.filter((l) => l !== lang);
                        return { selectedLanguages: normalizeLanguages(next) };
                    } else {
                        const next = [...state.selectedLanguages, lang];
                        return { selectedLanguages: normalizeLanguages(next) };
                    }
                }),
            setLanguages: (langs) => {
                const normalized = normalizeLanguages(langs);
                if (normalized.length === 0) return;
                set({ selectedLanguages: normalized });
            },
        }),
        {
            name: 'teachpulse-language-storage',
            storage: createJSONStorage(() => AsyncStorage),
            version: 2,
            migrate: (persistedState: any, version: number) => {
                // v0: array selectedLanguages
                // v1: single selectedLanguage
                if (persistedState) {
                    if (Array.isArray(persistedState.selectedLanguages)) {
                        const normalized = normalizeLanguages(persistedState.selectedLanguages as LanguageCode[]);
                        return {
                            selectedLanguages: normalized.length > 0 ? normalized : (['en', 'pt', 'es'] as LanguageCode[]),
                        } as LanguageState;
                    }
                    if (typeof persistedState.selectedLanguage === 'string' && ALL_LANGUAGES.includes(persistedState.selectedLanguage)) {
                        return {
                            selectedLanguages: [persistedState.selectedLanguage as LanguageCode],
                        } as LanguageState;
                    }
                }
                return { selectedLanguages: ['en', 'pt', 'es'] as LanguageCode[] } as LanguageState;
            },
        }
    )
);
