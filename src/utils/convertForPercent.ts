import { ITopEstimateInCountry } from '../types/requests.types';

export const transformForPercent = (
	data: ITopEstimateInCountry[],
): ITopEstimateInCountry[] => {
	const totalValue = data.reduce((sum, item) => sum + item.value, 0);

	const percentData = data.map(item => ({
		name: item.name,
		value: Math.round((item.value / totalValue) * 100),
	}));

	return percentData.sort((a, b) => b.value - a.value);
};
