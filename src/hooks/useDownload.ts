import { useMutation } from '@tanstack/react-query';

import { downloadService } from '../services/download.service';

export const useDownload = () => {
	const { data, error, isSuccess, isError, isPending, mutate } = useMutation({
		mutationKey: ['download_about'],
		mutationFn: () => downloadService.about_project(),
		onSuccess: data => {
			const blob = new Blob([data.data], { type: 'application/pdf' });
			const url = URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'about_project.pdf');
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		},
	});

	const {
		data: data_guide,
		error: error_guide,
		isSuccess: isSuccess_guide,
		isError: isError_guide,
		isPending: isPending_guide,
		mutate: mutate_guide,
	} = useMutation({
		mutationKey: ['download_guide'],
		mutationFn: () => downloadService.users_guide(),
		onSuccess: data => {
			const blob = new Blob([data.data], { type: 'application/pdf' });
			const url = URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'user_guide.pdf');
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		},
	});

	return {
		data,
		error,
		isSuccess,
		isError,
		isPending,
		mutate,
		data_guide,
		error_guide,
		isSuccess_guide,
		isError_guide,
		isPending_guide,
		mutate_guide,
	};
};
