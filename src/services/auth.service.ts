import Cookies from 'js-cookie';
import { Dispatch, SetStateAction } from 'react';

import { $axios } from '../api';
import { API_URL, TOKEN } from '../app.constants';

export const authService = {
	registr: async (data: { email: string; password: string }) => {
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

		return response.data;
	},
	login: async (
		data: { username: string; password: string },
		setIsAuth: Dispatch<SetStateAction<boolean>>,
	) => {
		const response = await $axios.post(
			`${API_URL}/auth/jwt/login`,
			`grant_type=password&password=${data.password}&username=${data.username}&scope=&client_id=string&client_secret=string`,
			// {
			// 	username: data.username,
			// 	password: data.password,
			// },
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			},
		);

		// console.log(data);

		if (response.data.access_token) {
			Cookies.set(TOKEN, response.data.access_token);
			setIsAuth(true);
		}
	},
};
