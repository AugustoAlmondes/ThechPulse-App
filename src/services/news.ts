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

export interface CheckUpdatesParams {
    after: string;
    languages?: LanguageCode[];
}

export interface CheckUpdatesResponse {
    hasNew: boolean;
    count: number;
    // compat with old naming
    hasUpdates?: boolean;
}

export async function checkUpdates(
    after: string,
    languages?: LanguageCode[]
): Promise<CheckUpdatesResponse> {
    try {
        const params: Record<string, unknown> = { after };
        if (languages && languages.length > 0) {
            params.languages = formatLanguagesQuery(languages);
        }
        const response = await api.get(
            '/news/check-updates',
            { params }
        );
        return response.data as CheckUpdatesResponse;
    } catch (error) {
        console.log("Error", error)
        return {
            hasNew: false,
            hasUpdates: false,
            count: 0
        };
    }
}

export async function checkUpdatesWithParams(params: CheckUpdatesParams): Promise<CheckUpdatesResponse> {
    return checkUpdates(params.after, params.languages);
}

