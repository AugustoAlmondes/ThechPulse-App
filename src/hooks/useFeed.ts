import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useRef, useState } from 'react'
import { getLatestNews } from '../services/news'
import { TypeNews } from '../types/NewsType'
import { formatLanguagesQuery, useLanguageStore } from '../store/useLanguageStore'

interface UseFeedResponse {
    news: TypeNews[];
    page: number;
    totalPages: number;
}

export function useFeed() {
    const selectedLanguages = useLanguageStore(state => state.selectedLanguages);
    const languagesKey = formatLanguagesQuery(selectedLanguages);
    const queryClient = useQueryClient();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const refreshingRef = useRef(false);

    const query = useInfiniteQuery({
        queryKey: ['feed', languagesKey],

        queryFn: ({ pageParam = 1 }) =>
            getLatestNews({ page: pageParam as number, languages: selectedLanguages }),

        initialPageParam: 1,

        getNextPageParam: (lastPage) => {
            // Respeita hasMore da API (nova) com fallback para length>0 (compatibilidade)
            if (typeof lastPage.hasMore === 'boolean') {
                return lastPage.hasMore ? (lastPage.page + 1) : undefined;
            }
            const hasMore = lastPage.news?.length > 0;
            if (!hasMore) return undefined;
            return (lastPage.page ?? 0) + 1;
        },
        select: (data) => {
            return {
                ...data,
                pages: data.pages.map(page => ({
                    ...page,
                    // Filtro client-side como fallback enquanto backend não filtra;
                    // quando backend enviar languages, já virá filtrado e select apenas mantém.
                    news: page.news.filter((n: TypeNews) => selectedLanguages.includes(n.language as any))
                }))
            };
        }
    });

    const refresh = useCallback(async () => {
        if (query.isFetching || refreshingRef.current) return;
        refreshingRef.current = true;
        setIsRefreshing(true);
        try {
            const fresh = await getLatestNews({ page: 1, refresh: true, languages: selectedLanguages });
            const key = ['feed', languagesKey] as const;
            queryClient.setQueryData(key, (old: any) => {
                if (!old) {
                    return {
                        pages: [fresh],
                        pageParams: [1],
                    };
                }
                // Substitui apenas a primeira página com dados frescos, limpa páginas seguintes
                // para evitar duplicação e respeitar hasMore atualizado.
                // Páginas seguintes serão buscadas via fetchNextPage sem refresh.
                return {
                    ...old,
                    pages: [fresh],
                    pageParams: [1],
                };
            });
        } catch {
            // Preserva dados existentes em caso de falha (não altera cache)
        } finally {
            refreshingRef.current = false;
            setIsRefreshing(false);
        }
    }, [query.isFetching, queryClient, selectedLanguages, languagesKey]);

    return {
        ...query,
        refresh,
        isRefreshing,
    };
}