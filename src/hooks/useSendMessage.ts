import { useMutation } from '@tanstack/react-query';

import { otherService } from '../services/other.service';

export const useSendMessage = () => {
	const { data, error, isSuccess, isError, isPending, mutate } = useMutation({
		mutationKey: ['message'],
		mutationFn: (data: { valueInput: string; user_id: string }) =>
			otherService.sendMessage(data.valueInput, data.user_id),
	});

	return { data, error, isSuccess, isError, isPending, mutate };
};
