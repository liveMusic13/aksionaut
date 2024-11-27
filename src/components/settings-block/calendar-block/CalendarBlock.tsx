import { FC, useCallback, useMemo, useState } from 'react';

import { arr_month, arr_month_full } from '../../../data/calendar.data';
import { useCalendar } from '../../../hooks/useCalendar';
import { useFilterFinalData } from '../../../hooks/useFilterFinalData';
import { usePeriodNameMobile } from '../../../hooks/usePeriodNameMobile';
import { useCalendarStore, useViewFilters } from '../../../store/store';
import {
	extractUniqueYears,
	getDateInData,
} from '../../../utils/editRequestData';
import Checkbox from '../../ui/checkbox/Checkbox';
import BlockButtons from '../block-buttons/BlockButtons';

import styles from './CalendarBlock.module.scss';

const CalendarBlock: FC = () => {
	const setIsFilter = useViewFilters(store => store.setIsFilter);
	const { finalData: data } = useFilterFinalData();
	const { selectedRange } = useCalendarStore();

	const { getSelectedMonths, handleSelectMonth } = useCalendar();

	const selectedMonths = getSelectedMonths(arr_month_full, selectedRange);

	const uniqueYear = useMemo(() => {
		if (data) {
			return extractUniqueYears(getDateInData(data.values, arr_month));
		} else {
			return [];
		}
	}, [data]);

	const editData = useMemo(() => {
		if (data) {
			return getDateInData(data.values, arr_month);
		} else {
			return [];
		}
	}, [data]);

	const onClick = () => setIsFilter(2, false);

	const [isCheck, setIsCheck] = useState<boolean>(false);

	const onChange = useCallback(() => {
		setIsCheck(!isCheck);

		if (!isCheck && editData.length > 0) {
			// Найти минимальную и максимальную дату
			const dates = editData.map(([year, month]) => {
				const monthIndex = arr_month.indexOf(month); // Индекс месяца (0-11)
				return new Date(Number(year), monthIndex);
			});

			// Сортировка по дате
			dates.sort((a, b) => a.getTime() - b.getTime());

			// Установка выбранного диапазона
			if (dates.length > 0) {
				useCalendarStore.setState({
					selectedRange: {
						start: `${arr_month_full[dates[0].getMonth()]} ${dates[0].getFullYear()}`,
						end: `${arr_month_full[dates[dates.length - 1].getMonth()]} ${dates[
							dates.length - 1
						].getFullYear()}`,
					},
				});
			}
		} else {
			// Сброс диапазона, если чекбокс снят
			useCalendarStore.setState({
				selectedRange: { start: '', end: '' },
			});
		}
	}, [isCheck, editData]);

	const startMonth = selectedRange.start
		? `${selectedRange.start.split(' ')[0]} ${selectedRange.start.split(' ')[1]}`
		: null;
	const endMonth = selectedRange.end
		? `${selectedRange.end.split(' ')[0]} ${selectedRange.end.split(' ')[1]}`
		: null;

	const periodName = usePeriodNameMobile(editData);

	return (
		<div className={styles.block__calendar}>
			<div className={styles.block__title}>
				<div className={styles.title_and_button}>
					<button className={styles.arrow__back} onClick={onClick}>
						<img src='/images/icons/arrow_back.svg' alt='arrow' />
					</button>
					<h2 className={styles.title}>Период</h2>
				</div>
				<button className={styles.exit} onClick={onClick}>
					<img src='/images/icons/exit.svg' alt='exit' />
				</button>
			</div>
			<div className={styles.for__margin}>
				<Checkbox
					isCheck={isCheck}
					onChange={onChange}
					checkbox={{
						id: 0,
						name: periodName,
					}}
				/>
			</div>

			<div className={styles.block__years}>
				{uniqueYear
					.slice()
					.reverse()
					.map(year => (
						<div key={year} className={styles.block__year}>
							<p className={styles.year}>{year}</p>
							<div className={styles.block__month}>
								{arr_month.map((month, ind) => {
									// Проверка на активность месяца для текущего года
									const isActive = editData.some(
										([dataYear, monthName]) =>
											dataYear === year && monthName === month,
									);

									// Проверка на выбранность месяца для текущего года
									const isSelected =
										(selectedRange.start?.includes(arr_month_full[ind]) &&
											selectedRange.start.includes(year)) ||
										(selectedRange.end?.includes(arr_month_full[ind]) &&
											selectedRange.end.includes(year)) ||
										selectedMonths.includes(`${arr_month_full[ind]} ${year}`);

									// Определяем, является ли месяц началом или концом выделенного диапазона
									const isFirstSelected =
										isSelected &&
										`${arr_month_full[ind]} ${year}` === startMonth;

									const isLastSelected =
										isSelected && `${arr_month_full[ind]} ${year}` === endMonth;

									return (
										<button
											key={ind}
											className={`${styles.month} ${isSelected ? styles.selected : ''} ${
												isFirstSelected ? styles.firstSelected : ''
											} ${isLastSelected ? styles.lastSelected : ''}`}
											disabled={!isActive}
											onClick={() =>
												handleSelectMonth(
													ind,
													uniqueYear,
													uniqueYear.indexOf(year),
												)
											}
										>
											{month}
										</button>
									);
								})}
							</div>
						</div>
					))}
			</div>

			<BlockButtons />
		</div>
	);
};

export default CalendarBlock;
