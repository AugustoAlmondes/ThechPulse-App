import { NewsType } from "../types/NewsType";

type Section = {
    title: string;
    data: NewsType[];
};

export function groupNewsByDate(news: NewsType[]): Section[] {

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const fmt = (d: Date) => d.toISOString().split('T')[0];

    const groups: Record<string, NewsType[]> = {};

    for (const item of news) {
        const itemDate = new Date(item.date);
        const itemKey = fmt(itemDate);

        let label: string;

        if (itemKey === fmt(today)) {
            label = 'Hoje';
        } else if (itemKey === fmt(yesterday)) {
            label = 'Ontem'
        } else {
            label = itemDate.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }

        if (!groups[label]) groups[label] = [];
        groups[label].push(item);
    }

    return Object.entries(groups).map(([title, data]) => ({ title, data }));
}