import { $axios } from '../api';

export const downloadService = {
	about_project: async () =>
		await $axios.get('/return-files?file=about_project', {
			headers: { 'Cache-Control': 'no-cache', Accept: 'application/pdf' },
			responseType: 'arraybuffer',
		}),
	users_guide: async () =>
		await $axios.get('/return-files?file=users_guide', {
			headers: { 'Cache-Control': 'no-cache', Accept: 'application/pdf' },
			responseType: 'arraybuffer',
		}),
};
