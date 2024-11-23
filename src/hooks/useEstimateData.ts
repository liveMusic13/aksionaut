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

	const {
		data: data_grl,
		error: error_grl,
		isSuccess: isSuccess__grl,
		refetch: refetch_grl,
		isStale: isStale_grl,
		isError: isError_grl,
	} = useQuery({
		queryKey: ['data_grl'],
		queryFn: regionsService.getDataGrl,
		// enabled: isClicked, // отключаем автоматический запрос при рендере
		staleTime: 5 * 60 * 1000, // кэширование на 5 минут
		retry: 1,
		refetchOnWindowFocus: false, // отключаем повторные запросы при фокусе
		refetchOnReconnect: true, //повторный запрос при восстановлении сетевого соединения
	});

	const {
		data: data_ukaz,
		error: error_ukaz,
		isSuccess: isSuccess_ukaz,
		refetch: refetch_ukaz,
		isStale: isStale_ukaz,
		isError: isError_ukaz,
	} = useQuery({
		queryKey: ['data_ukaz'],
		queryFn: regionsService.getDataUkaz,
		// enabled: isClicked, // отключаем автоматический запрос при рендере
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
		data_grl,
		error_grl,
		isSuccess__grl,
		refetch_grl,
		isStale_grl,
		isError_grl,
		data_ukaz,
		error_ukaz,
		isSuccess_ukaz,
		refetch_ukaz,
		isStale_ukaz,
		isError_ukaz,
	};
};
