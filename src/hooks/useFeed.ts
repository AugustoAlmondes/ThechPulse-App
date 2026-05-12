import { useInfiniteQuery } from '@tanstack/react-query'
import { getLatestNews } from '../services/news'
import { TypeNews } from '../types/NewsType'

interface UseFeedResponse {
    news: TypeNews[];
    page: number;
    totalPages: number;
}

export function useFeed() {
    return useInfiniteQuery({
        queryKey: ['feed'],

        queryFn: ({ pageParam = 1 }) =>
            getLatestNews({ page: pageParam as number }),

        initialPageParam: 1,

        getNextPageParam: (
            lastPage,
            allPages,
        ) => {

            const hasMore =
                lastPage.news?.length > 0;

            if (!hasMore) {
                return undefined;
            }

            return allPages.length + 1;
        },
    });
}