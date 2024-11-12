import {
	IFullEstimateData,
	ITopEstimateInCountry,
	ITopEstimateInCountryEdit,
} from '../types/requests.types';
import { IDataForSelectOption } from '../types/transformData.types';

export const getEstimateForRequest = (data: {
	values: IFullEstimateData[];
}): IDataForSelectOption[] => {
	let newData: IDataForSelectOption[] = [];

	data.values[0].values.forEach((el, index) => {
		newData.push({ id: index, name: el.cennost_name });
	});

	return newData;
};

export const editTopEstimateInCountry = (
	data: ITopEstimateInCountry[],
): ITopEstimateInCountryEdit[] => {
	return data.map(el => ({ name: el.name, y: el.value }));
};
