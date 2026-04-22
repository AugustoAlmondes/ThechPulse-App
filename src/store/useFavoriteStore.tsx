import { create } from 'zustand'
import { TypeNews } from '../types/NewsType'

type FavoriteState = {
    favoriteNews: TypeNews[];
    addFavoriteNews: (news: TypeNews) => void;
    removeFavoriteNews: (news: TypeNews) => void;
    isFavorite: (news: TypeNews) => boolean;
}

export const useFavoriteStore = create<FavoriteState>(
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
    })
)

