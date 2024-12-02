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

export const getDateInData = (
	data: IFullEstimateData[],
	monthNames: string[],
): string[][] => {
	return data.map(item => {
		const [year, month] = item.month.split('-');
		const monthIndex = parseInt(month, 10) - 1;
		const monthName = monthNames[monthIndex];
		return [year, monthName];
	});
};

export const extractUniqueYears = (dateInfo: string[][]): string[] => {
	const yearSet = new Set<string>();
	dateInfo.forEach(item => {
		const year = item[0];
		yearSet.add(year);
	});
	return Array.from(yearSet);
};

export const filteredMonth = (
	dateString: string,
	dateArray: string[],
	months: string[],
): boolean => {
	const [year, month] = dateString.split('-'); // Разделяем год и месяц из строки формата "YYYY-MM"
	const monthIndex = parseInt(month, 10) - 1; // Получаем индекс месяца // Создаем строку в формате "Месяц YYYY"
	const formattedDate = `${months[monthIndex]} ${year}`; // Сравниваем с каждым элементом массива

	return dateArray.includes(formattedDate);
};

export const totalValue = (data: { name: string; value: number }[]): number => {
	let total = 0;
	data.forEach(el => (total += el.value));
	return total;
};
