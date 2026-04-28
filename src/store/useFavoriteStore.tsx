import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TypeNews } from '../types/NewsType'

type FavoriteState = {
    favoriteNews: TypeNews[];
    addFavoriteNews: (news: TypeNews) => void;
    removeFavoriteNews: (news: TypeNews) => void;
    isFavorite: (news: TypeNews) => boolean;
}

export const useFavoriteStore = create<FavoriteState>()(
    persist(
        (set, get) => ({
            favoriteNews: [] as TypeNews[],

            addFavoriteNews: (news) => {
                const { favoriteNews } = get();
                const exist = favoriteNews.some(n => n.id === news.id);
                if (exist) return;

                set({ favoriteNews: [...favoriteNews, news] });
            },

            removeFavoriteNews: (news) => {
                const { favoriteNews } = get();

                const updatedNews = favoriteNews.filter(n => n.id !== news.id);
                set({ favoriteNews: updatedNews });
            },

            isFavorite: (news) => {
                const { favoriteNews } = get();
                return favoriteNews.some(n => n.id === news.id);
            }
        }),
        {
            name: 'favorite-storage',
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

