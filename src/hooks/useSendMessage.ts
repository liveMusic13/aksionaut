import { useMutation } from '@tanstack/react-query';

import { otherService } from '../services/other.service';

export const useSendMessage = () => {
	const { data, error, isSuccess, isError, isPending, mutate } = useMutation({
		mutationKey: ['message'],
		mutationFn: (valueInput: string) => otherService.sendMessage(valueInput),
	});

	return { data, error, isSuccess, isError, isPending, mutate };
};
