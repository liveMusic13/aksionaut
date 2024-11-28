import axios from 'axios';

import { $axios } from '../api';
import { API_URL } from '../app.constants';

export const otherService = {
	getLocation: async (position: GeolocationPosition) => {
		console.log(position);
		return await axios.get(
			`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=ru`,
		);
	},
	sendMessage: async (
		message: string,
	): Promise<{ data: { value: string } }> => {
		return await $axios.get(`${API_URL}/ai_search?query=${message}`);
	},
	// sendMessage: async (message: string) => {
	// 	const encodedMessage = encodeURIComponent(message);
	// 	return await $axios.get(`${API_URL}?query=${encodedMessage}`);
	// },
};
