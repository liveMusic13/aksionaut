import { useQuery } from '@tanstack/react-query';

import { lkService } from '../services/lk.service';

export const useGetUserId = () => {
	const { data, error, isSuccess, refetch, isStale, isError, isLoading } =
		useQuery({
			queryKey: ['user_id'],
			queryFn: lkService.user_id,
			select: data => data.data,
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
