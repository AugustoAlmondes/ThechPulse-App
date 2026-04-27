import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TypeNews } from '../types/NewsType'

// ─── Tipos ────────────────────────────────────────────────────────────────────

/** Entrada de histórico: notícia + timestamp de quando foi acessada */
export interface HistoricEntry {
    news: TypeNews
    accessedAt: string // ISO string
}

/**
 * Um "dia" do histórico.
 * @example { date: '2026-04-27', entries: [...] }
 */
export interface HistoricDay {
    date: string        // 'YYYY-MM-DD'
    entries: HistoricEntry[]
}

type HistoricState = {
    /** Lista de dias com notícias visitadas, do mais recente ao mais antigo */
    days: HistoricDay[]

    /** Adiciona uma notícia ao histórico do dia atual */
    addHistoricNews: (news: TypeNews) => void

    /** Remove uma entrada específica do histórico */
    removeHistoricEntry: (newsId: string, date: string) => void

    /** Limpa todo o histórico */
    clearHistoric: () => void

    /** Retorna o total de notícias visitadas */
    totalHistoric: () => number
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Retorna a data de hoje no formato 'YYYY-MM-DD' */
const todayKey = (): string => new Date().toISOString().split('T')[0]

// ─── Store ────────────────────────────────────────────────────────────────────

export const useHistoricStore = create<HistoricState>()(
    persist(
        (set, get) => ({
            days: [],

            addHistoricNews: (news: TypeNews) => {
                const { days } = get()
                const today = todayKey()
                const now = new Date().toISOString()

                const existingDayIndex = days.findIndex(d => d.date === today)

                if (existingDayIndex !== -1) {
                    // Já existe o dia — verifica se a notícia já foi acessada hoje
                    const alreadyExists = days[existingDayIndex].entries.some(
                        e => e.news.id === news.id
                    )
                    if (alreadyExists) return

                    // Adiciona ao início das entradas do dia
                    const updatedDays = days.map((day, index) => {
                        if (index !== existingDayIndex) return day
                        return {
                            ...day,
                            entries: [{ news, accessedAt: now }, ...day.entries],
                        }
                    })

                    set({ days: updatedDays })
                } else {
                    // Cria novo dia, inserindo no início
                    const newDay: HistoricDay = {
                        date: today,
                        entries: [{ news, accessedAt: now }],
                    }
                    set({ days: [newDay, ...days] })
                }
            },

            removeHistoricEntry: (newsId: string, date: string) => {
                const { days } = get()

                const updatedDays = days
                    .map(day => {
                        if (day.date !== date) return day
                        return {
                            ...day,
                            entries: day.entries.filter(e => e.news.id !== newsId),
                        }
                    })
                    // Remove dias que ficaram sem entradas
                    .filter(day => day.entries.length > 0)

                set({ days: updatedDays })
            },

            clearHistoric: () => set({ days: [] }),

            totalHistoric: () => {
                const { days } = get()
                return days.reduce((acc, day) => acc + day.entries.length, 0)
            },
        }),
        {
            name: 'historic-storage',
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