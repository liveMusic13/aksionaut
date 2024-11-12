import axios from 'axios';

import { API_URL } from './app.constants';

export const $axios = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});
