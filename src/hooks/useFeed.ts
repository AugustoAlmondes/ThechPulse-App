import { useInfiniteQuery } from '@tanstack/react-query'
import { getLatestNews } from '../services/news'
import { TypeNews } from '../types/NewsType'
import { useLanguageStore } from '../store/useLanguageStore'

interface UseFeedResponse {
    news: TypeNews[];
    page: number;
    totalPages: number;
}

export function useFeed() {
    const selectedLanguages = useLanguageStore(state => state.selectedLanguages);

    return useInfiniteQuery({
        queryKey: ['feed', selectedLanguages.join(',')],

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
        select: (data) => {
            return {
                ...data,
                pages: data.pages.map(page => ({
                    ...page,
                    news: page.news.filter((n: TypeNews) => selectedLanguages.includes(n.language as any))
                }))
            };
        }
    });
}