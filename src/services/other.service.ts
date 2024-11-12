import axios from 'axios';

export const otherService = {
	getLocation: async (position: GeolocationPosition) => {
		console.log(position);
		return await axios.get(
			`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=ru`,
		);
	},
};
