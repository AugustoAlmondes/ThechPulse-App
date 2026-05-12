import { useQuery } from '@tanstack/react-query';
import { checkUpdates } from '../services/news';

export function useCheckUpdates(
    after?: string,
) {

    return useQuery({
        queryKey: ['check-updates', after],

        queryFn: () => {

            if (!after) {
                return {
                    hasNew: false,
                    count: 0,
                };
            }

            return checkUpdates(after);
        },

        refetchInterval:
            1000 * 60 * 5,

        enabled: !!after,
    });
}