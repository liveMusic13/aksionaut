import { Dispatch, SetStateAction } from 'react';

import { ISelectedRange } from '../types/calendar.types';

export const useCalendar = () => {
	// Обработчик выбора месяца
	const handleSelectMonth = (
		monthIndex: number,
		uniqueYear: string[],
		currentIndex: number,
		arr_month_full: string[],
		selectedRange: ISelectedRange,
		setSelectedRange: Dispatch<SetStateAction<ISelectedRange>>,
	) => {
		const selectedYear = uniqueYear[currentIndex];
		const selectedMonthFull = arr_month_full[monthIndex];
		const selectedDate = new Date(`${selectedYear}-${monthIndex + 1}-01`);

		if (selectedRange.start && selectedRange.end) {
			// Если оба значения (start и end) уже выбраны, сбрасываем диапазон
			setSelectedRange({
				start: null,
				end: null,
			});
		} else if (!selectedRange.start) {
			// Если start не установлен, устанавливаем его
			setSelectedRange({
				start: `${selectedMonthFull} ${selectedYear}`,
				end: null,
			});
		} else if (!selectedRange.end) {
			// Если start установлен, но end нет, устанавливаем end
			const [startMonth, startYear] = selectedRange.start.split(' ');
			const startMonthIndex = arr_month_full.indexOf(startMonth);
			const startDate = new Date(`${startYear}-${startMonthIndex + 1}-01`);

			if (startDate > selectedDate) {
				// Если выбранная дата раньше start, меняем местами
				setSelectedRange({
					start: `${selectedMonthFull} ${selectedYear}`,
					end: selectedRange.start,
				});
			} else {
				setSelectedRange({
					start: selectedRange.start,
					end: `${selectedMonthFull} ${selectedYear}`,
				});
			}
		} else {
			// Если start и end не были установлены, сбрасываем диапазон
			setSelectedRange({
				start: null,
				end: null,
			});
		}
	};

	const getSelectedMonths = (
		arr_month_full: string[],
		selectedRange: ISelectedRange,
	) => {
		if (selectedRange.start && selectedRange.end) {
			const [startMonth, startYear] = selectedRange.start.split(' ');
			const [endMonth, endYear] = selectedRange.end.split(' ');

			const startMonthIndex = arr_month_full.indexOf(startMonth);
			const endMonthIndex = arr_month_full.indexOf(endMonth);

			const selectedMonths: string[] = [];

			// Проходим по всем месяцам между start и end, включая разные года
			for (let year = +startYear; year <= +endYear; year++) {
				const start = year === +startYear ? startMonthIndex : 0;
				const end =
					year === +endYear ? endMonthIndex : arr_month_full.length - 1;

				for (let i = start; i <= end; i++) {
					selectedMonths.push(`${arr_month_full[i]} ${year}`);
				}
			}

			return selectedMonths.map(month => month.split(' ')[0]);
		}
		return [];
	};

	const showPreviousYear = (
		setCurrentIndex: Dispatch<SetStateAction<number>>,
		uniqueYear: string[],
	) => {
		setCurrentIndex(prevIndex =>
			prevIndex > 0 ? prevIndex - 1 : uniqueYear.length - 1,
		);
	};
	const showNextYear = (
		setCurrentIndex: Dispatch<SetStateAction<number>>,
		uniqueYear: string[],
	) => {
		setCurrentIndex(prevIndex =>
			prevIndex < uniqueYear.length - 1 ? prevIndex + 1 : 0,
		);
	};

	return {
		handleSelectMonth,
		getSelectedMonths,
		showPreviousYear,
		showNextYear,
	};
};
