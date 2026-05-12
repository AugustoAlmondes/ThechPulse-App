import { api } from './api';

export async function getLatestNews(
    page = 1
) {
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
            totalPages: 1
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

