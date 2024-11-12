import { useQuery } from '@tanstack/react-query';

import { regionsService } from '../services/regions.service';

export const useEstimateData = () => {
	const { data, error, isSuccess, refetch, isStale, isError } = useQuery({
		queryKey: ['data'],
		queryFn: regionsService.getData,
		// enabled: isClicked, // отключаем автоматический запрос при рендере
		staleTime: 5 * 60 * 1000, // кэширование на 5 минут
		retry: 1,
		refetchOnWindowFocus: false, // отключаем повторные запросы при фокусе
		refetchOnReconnect: true, //повторный запрос при восстановлении сетевого соединения
	});

	return { data, error, isSuccess, refetch, isStale, isError };
};
