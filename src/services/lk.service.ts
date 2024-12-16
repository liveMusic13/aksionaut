import { $axios } from '../api';
import { IHistoryRequest } from '../types/requests.types';

export const lkService = {
	history_search: async (
		id: string,
	): Promise<{ data: { history: IHistoryRequest[] } }> =>
		await $axios.get(`/history_search?user_id=${id}`),
	user_id: async () => await $axios.get('/user-id'),
};
