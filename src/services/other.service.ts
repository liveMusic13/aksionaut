import axios from 'axios';

import { $axios } from '../api';
import { API_URL } from '../app.constants';

export const otherService = {
	getLocation: async (position: GeolocationPosition) => {
		return await axios.get(
			`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=ru`,
		);
	},
	sendMessage: async (
		message: string,
		user_id: string,
	): Promise<{ data: { value: string } }> => {
		return await $axios.get(
			`${API_URL}/ai_search?query=${message}&user_id=${user_id}`,
		);
	},
};
