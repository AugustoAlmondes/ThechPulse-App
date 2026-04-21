// src/store/authStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

type User = {
    id: string
    name: string
    email: string
    photo?: string
}

type AuthState = {
    user: User | null
    token: string | null
    isLoading: boolean

    signIn: (data: { user: User; token: string }) => void
    signOut: () => void
    setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isLoading: false,

            signIn: ({ user, token }) =>
                set({
                    user,
                    token,
                }),

            signOut: () =>
                set({
                    user: null,
                    token: null,
                }),

            setLoading: (isLoading) => set({ isLoading }),
        }),
        {
            name: 'auth-storage',
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