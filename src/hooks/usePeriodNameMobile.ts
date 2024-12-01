import { useMemo } from 'react';

import { arr_month, arr_month_full } from '../data/calendar.data';

export const usePeriodNameMobile = (editData: string[][]) => {
	const [minDate, maxDate] = useMemo(() => {
		if (editData.length > 0) {
			// Преобразуем даты в формат: { year, monthIndex }
			const dates = editData.map(([year, monthName]) => ({
				year,
				monthIndex: arr_month.indexOf(monthName),
			}));

			// Находим минимальную и максимальную дату
			const min = dates.reduce((a, b) =>
				a.year < b.year || (a.year === b.year && a.monthIndex < b.monthIndex)
					? a
					: b,
			);
			const max = dates.reduce((a, b) =>
				a.year > b.year || (a.year === b.year && a.monthIndex > b.monthIndex)
					? a
					: b,
			);

			return [min, max];
		}
		return [null, null];
	}, [editData]);

	const periodName = useMemo(() => {
		if (minDate && maxDate) {
			const start = `${arr_month_full[minDate.monthIndex]} ${minDate.year}`;
			const end = `${arr_month_full[maxDate.monthIndex]} ${maxDate.year}`;
			return `Весь период (${start} - ${end})`;
		}
		return 'Весь период';
	}, [minDate, maxDate]);

	return periodName;
};
