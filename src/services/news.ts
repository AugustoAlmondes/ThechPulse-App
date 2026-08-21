import { NewsAPIResponse } from '../types/NewsType';
import { normalizeImage } from '../types/NewsType';
import { api } from './api';

export async function getLatestNews(
    { page = 1 }: { page: number }
): Promise<NewsAPIResponse> {
    const response = await api.get('/news', {
        params: {
            page
        }
    });

    const data: NewsAPIResponse = response.data;
    // Normalização centralizada: trata null, "", "None" e URLs inválidas
    const normalized = {
        ...data,
        news: (data.news || []).map((n) => ({
            ...n,
            image: normalizeImage(n.image),
        })),
    };
    return normalized;
};

export async function checkUpdates(
    after: string
) {
    try {
        const response = await api.get(
            '/news/check-updates',
            {
                params: {
                    after
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log("Error", error)
        return {
            hasUpdates: false,
            count: 0
        };
    }
}

