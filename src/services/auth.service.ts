import { $axios } from '../api';
import { API_URL } from '../app.constants';

export const authService = {
	registr: async data => {
		const body = {
			...data,
			is_active: true,
			is_superuser: false,
			is_verified: false,
			username: 'string',
			role_id: 0,
			comments: 'string',
		};
		const response = await $axios.post(`${API_URL}/auth/register`, body);

		console.log(response.data);
	},
};
