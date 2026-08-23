import { NewsAPIResponse } from '../types/NewsType';
import { normalizeImage } from '../types/NewsType';
import { api } from './api';
import { formatLanguagesQuery, LanguageCode } from '../store/useLanguageStore';

export async function getLatestNews(
    { page = 1, refresh = false, languages }: { page?: number; refresh?: boolean; languages?: LanguageCode[] }
): Promise<NewsAPIResponse> {
    const params: Record<string, unknown> = { page };
    if (refresh) params.refresh = true;
    if (languages && languages.length > 0) {
        params.languages = formatLanguagesQuery(languages);
    }

    const response = await api.get('/news', {
        params,
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

