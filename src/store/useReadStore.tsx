import { create } from 'zustand'
import { TypeNews } from '../types/NewsType'

const LIMIT_NEWS = 3;

type TypeReadStore = {
    readNews: TypeNews[];
    totalReadNews: number;
    addReadNews: (news: TypeNews) => void;
    addTotalReadNews: () => void | string;
    removeReadNews: (news: TypeNews) => void;
    isRead: (news: TypeNews) => boolean;
}

export const useReadStore = create<TypeReadStore>((set, get) => ({
    readNews: [],
    totalReadNews: 0,

    addReadNews: (news: TypeNews) => {
        const { readNews } = get();
        const exist = readNews.some(n => n.id === news.id);
        if (exist) return;

        const { totalReadNews } = get();
        if (totalReadNews >= LIMIT_NEWS) return "limite atingido de leitura atingido";
        set(state => ({ totalReadNews: state.totalReadNews + 1 }))

        set(state => ({ readNews: [...state.readNews, news] }))
    },

    addTotalReadNews: () => {
        const { totalReadNews } = get();
        if (totalReadNews >= LIMIT_NEWS) return "limite atingido de leitura atingido";
        set(state => ({ totalReadNews: state.totalReadNews + 1 }))
    },

    removeReadNews: (news: TypeNews) => {
        const { readNews } = get();
        const exist = readNews.some(n => n.id === news.id);
        if (!exist) return;

        set(state => ({ readNews: state.readNews.filter(n => n.id !== news.id) }))
        set(state => ({ totalReadNews: state.totalReadNews - 1 }))
    },

    isRead: (news) => {
        const { readNews } = get();
        return readNews.some(n => n.id === news.id);
    }
}))
