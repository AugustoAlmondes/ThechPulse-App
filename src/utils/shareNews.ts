import { Share } from 'react-native';
import { TypeNews } from '@/src/types/NewsType';

export async function shareNews(news: TypeNews) {
    try {
        await Share.share({
            title: news.title,
            message: `${news.title}\n\nConfira essa notícia: ${news.url}`,
            url: news.url, // usado no iOS
        });
    } catch (error) {
        console.error('Erro ao compartilhar notícia:', error);
    }
}
