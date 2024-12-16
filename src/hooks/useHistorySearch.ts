import { useQuery } from '@tanstack/react-query';

import { lkService } from '../services/lk.service';

export const useHistorySearch = () => {
	const { data, error, isSuccess, refetch, isStale, isError, isLoading } =
		useQuery({
			queryKey: ['history_search'],
			queryFn: async () => {
				try {
					const idResponse = await lkService.user_id();
					if (idResponse.status === 200) {
						console.log('idResponse.data', idResponse);
						return lkService.history_search(idResponse.data); //TODO: поставить при релизе это
						// return lkService.history_search('36');
					} else {
						throw new Error('Failed to fetch user id');
					}
				} catch (err: any) {
					throw new Error(
						'An error occurred while fetching data: ' + err.message,
					);
				}
			},
			select: data => data.data.history,
			staleTime: 5 * 60 * 1000, // кэширование на 5 минут
			retry: 1,
			refetchOnWindowFocus: false, // отключаем повторные запросы при фокусе
			refetchOnReconnect: true, //повторный запрос при восстановлении сетевого соединения
		});

	return {
		data,
		error,
		isSuccess,
		refetch,
		isStale,
		isError,
		isLoading,
	};
};
