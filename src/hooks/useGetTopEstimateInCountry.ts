import { useQuery } from '@tanstack/react-query';

import { regionsService } from '../services/regions.service';

export const useGetTopEstimateInCountry = () => {
	const { data, error, isSuccess, refetch, isStale, isError } = useQuery({
		queryKey: ['topEstimateInCountry'],
		queryFn: regionsService.getTopEstimateInCountry,
		// enabled: isClicked, // отключаем автоматический запрос при рендере
		staleTime: 5 * 60 * 1000, // кэширование на 5 минут
		retry: 1,
		refetchOnWindowFocus: false, // отключаем повторные запросы при фокусе
	});

	return { data, error, isSuccess, refetch, isStale, isError };
};
