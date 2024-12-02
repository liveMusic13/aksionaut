import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

import { authService } from '../services/auth.service';

export const useAccountManagement = () => {
	const {
		data: data_registr,
		error: error_registr,
		isSuccess: isSuccess_registr,
		isError: isError_registr,
		isPending: isPending_registr,
		mutate: mutate_registr,
	} = useMutation({
		mutationKey: ['registr'],
		mutationFn: (data: { email: string; password: string }) =>
			authService.registr(data),
	});

	const { data, error, isSuccess, isError, isPending, mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: ({
			data,
			setIsAuth,
		}: {
			data: { username: string; password: string };
			setIsAuth: Dispatch<SetStateAction<boolean>>;
		}) => authService.login(data, setIsAuth),
	});

	return {
		data,
		error,
		isSuccess,
		isError,
		isPending,
		mutate,
		data_registr,
		error_registr,
		isSuccess_registr,
		isError_registr,
		isPending_registr,
		mutate_registr,
	};
};
