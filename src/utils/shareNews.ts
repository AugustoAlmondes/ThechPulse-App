import { Share } from 'react-native';

interface ShareNewsProps {
    title: string,
    url: string
}

export async function shareNews({ title, url }: ShareNewsProps) {
    try {
        await Share.share({
            title: title,
            message: `${title}\n\nConfira essa notícia: ${url}`,
            url: url, // usado no iOS
        });
    } catch (error) {
        console.error('Erro ao compartilhar notícia:', error);
    }
}
