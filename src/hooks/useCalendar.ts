import { Dispatch, SetStateAction } from 'react';

import { useCalendarStore } from '../store/store';
import { ISelectedRange } from '../types/calendar.types';

export const useCalendar = () => {
	const { selectedRange, setStart, setEnd, resetRange } = useCalendarStore();

	// Обработчик выбора месяца
	const handleSelectMonth = (
		monthIndex: number,
		uniqueYear: string[],
		currentIndex: number,
		arr_month_full: string[],
	) => {
		if (!selectedRange.start) {
			setStart(`${arr_month_full[monthIndex]} ${uniqueYear[currentIndex]}`);
		} else if (!selectedRange.end) {
			const [startMonth, startYear] = selectedRange.start.split(' ');
			const startMonthIndex = arr_month_full.indexOf(startMonth);
			const startDate = new Date(`${startYear}-${startMonthIndex + 1}-01`);
			const selectedDate = new Date(
				`${uniqueYear[currentIndex]}-${monthIndex + 1}-01`,
			);

			if (startDate > selectedDate) {
				setStart(`${arr_month_full[monthIndex]} ${uniqueYear[currentIndex]}`);
				setEnd(selectedRange.start);
			} else {
				setEnd(`${arr_month_full[monthIndex]} ${uniqueYear[currentIndex]}`);
			}
		} else {
			resetRange();
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

			// Перебираем годы в диапазоне
			for (let year = +startYear; year <= +endYear; year++) {
				const startIndex = year === +startYear ? startMonthIndex : 0;
				const endIndex =
					year === +endYear ? endMonthIndex : arr_month_full.length - 1;

				// Перебираем месяцы в каждом году
				for (let i = startIndex; i <= endIndex; i++) {
					selectedMonths.push(`${arr_month_full[i]} ${year}`);
				}
			}

			return selectedMonths;
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
