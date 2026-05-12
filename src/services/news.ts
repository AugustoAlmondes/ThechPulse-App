import { NewsAPIResponse } from '../types/NewsType';
import { api } from './api';

export async function getLatestNews(
    { page = 1 }: { page: number }
): Promise<NewsAPIResponse> {
    try {
        const response = await api.get('/news', {
            params: {
                page
            }
        });

        return response.data;
    } catch (error) {
        console.log("Error", error)
        return {
            news: [],
            page: 1,
            status: "error"
        };
    }
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

