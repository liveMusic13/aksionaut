import { useEffect } from 'react';

import {
	useCalendarStore,
	useEstimateStore,
	useRegionStore,
} from '../store/store';
import { IFullEstimateData } from '../types/requests.types';

import { useCalendar } from './useCalendar';

// export const useFilters = (
// 	data: { values: IFullEstimateData[] },
// 	arr_month_full: string[],
// 	setTest: any,
// ) => {
// 	const { getSelectedMonths } = useCalendar();
// 	const selectedRange = useCalendarStore(store => store.selectedRange);
// 	const estimate = useEstimateStore(store => store.estimate);
// 	const region = useRegionStore(store => store.region);

// 	useEffect(() => {
// 		data?.values.filter((month: IFullEstimateData) => {
// 			const isData = filteredMonth(
// 				month.month,
// 				getSelectedMonths(arr_month_full, selectedRange),
// 				arr_month_full,
// 			);

// 			if (isData) {
// 				month.values.filter(est => {
// 					const isEstimate =
// 						est.cennost_name === estimate[0] ||
// 						est.cennost_name === estimate[1];

// 					if (isEstimate) {
// 						console.log('isEstimate', est);

// 						est.regions.filter(reg => {
// 							const isRegion =
// 								reg.region_name === region[0] || reg.region_name === region[1];

// 							if (isRegion) {
// 								console.log('isRegion', isRegion, reg);
// 								setTest((prev: any) => [...prev, reg]);
// 							}
// 						});
// 					}
// 				});
// 			}
// 		});
// 	}, [data, region, estimate, selectedRange]);
// };

export const useFilters = (
	{ values: data }: { values: IFullEstimateData[] },
	arr_month_full: string[],
	setTargetRegion: any,
) => {
	const { getSelectedMonths } = useCalendar();
	const selectedRange = useCalendarStore(store => store.selectedRange);
	const estimate = useEstimateStore(store => store.estimate);
	const region = useRegionStore(store => store.region);

	function formatDate(dateString: string, arr_month_full: string[]): string {
		const [year, month] = dateString.split('-');
		const monthIndex = parseInt(month, 10) - 1; // Преобразуем месяц в индекс // Получаем название месяца и формируем строку в формате "Месяц YYYY"
		const formattedDate = `${arr_month_full[monthIndex]} ${year}`;
		return formattedDate;
	}

	function filterData(
		fullEstimateData: IFullEstimateData[], // Исходные данные
		arrMonthFull: string[], // Массив названий месяцев
		regions: string[], // Выбранные регионы
	) {
		const selectedMonths = getSelectedMonths(arrMonthFull, selectedRange); // Получаем выбранные месяцы
		const result: { name: string; data: number[]; color: string }[][] = [];

		regions.forEach(regionName => {
			const regionGroup: { name: string; data: number[]; color: string }[] = [];

			estimate.slice(0, 2).forEach((cennostName, estimateIndex) => {
				const color =
					estimateIndex === 0 ? 'rgba(255,255,255, 0.8)' : '#A2BFF5';
				const data: number[] = [];

				// Перебираем все месяцы и добавляем value либо 0, если данные не соответствуют фильтрам
				selectedMonths.forEach(month => {
					let monthValue = 0;

					fullEstimateData.forEach(dataItem => {
						if (formatDate(dataItem.month, arrMonthFull) === month) {
							dataItem.values.forEach(value => {
								if (value.cennost_name === cennostName) {
									value.regions.forEach(region => {
										if (region.region_name === regionName) {
											monthValue += region.value; // Суммируем значение для текущего региона
										}
									});
								}
							});
						}
					});

					data.push(monthValue); // Добавляем значение для текущего месяца
				});

				// Добавляем объект для текущего региона и ценности
				regionGroup.push({
					name: cennostName,
					data,
					color,
				});
			});

			// Добавляем группу для текущего региона в итоговый массив
			result.push(regionGroup);
		});

		return result;
	}

	useEffect(() => {
		setTargetRegion(filterData(data, arr_month_full, region));
	}, [data, region, estimate, selectedRange]);
};
