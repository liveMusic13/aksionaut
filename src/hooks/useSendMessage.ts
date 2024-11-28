// import { useQuery } from '@tanstack/react-query';
// import { otherService } from '../services/other.service';
// export const useSendMessage = (valueInput: string) => {
// 	const { data, error, isSuccess, refetch, isStale, isError, isLoading } =
// 		useQuery({
// 			queryKey: ['message'],
// 			queryFn: () => otherService.sendMessage(valueInput),
// 			staleTime: 0,
// 			retry: 1,
// 			enabled: false,
// 			select: data => data.data.value,
// 		});
// 	return { data, error, isSuccess, refetch, isStale, isError, isLoading };
// };
import { useMutation } from '@tanstack/react-query';

import { otherService } from '../services/other.service';

export const useSendMessage = () => {
	const { data, error, isSuccess, isError, isPending, mutate } = useMutation({
		mutationKey: ['message'],
		mutationFn: (valueInput: string) => otherService.sendMessage(valueInput),
	});

	return { data, error, isSuccess, isError, isPending, mutate };
};
