import { FC, useMemo, useState } from 'react';

import { colors } from '../../../app.constants';
import { arr_month_full } from '../../../data/calendar.data';
import { useCalendar } from '../../../hooks/useCalendar';
import { useFilterFinalData } from '../../../hooks/useFilterFinalData';
import { useCalendarStore } from '../../../store/store';
import {
	extractUniqueYears,
	getDateInData,
} from '../../../utils/editRequestData';

import styles from './Calendar.module.scss';

const Calendar: FC = () => {
	const [isViewCalendar, setIsViewCalendar] = useState<boolean>(false);
	const { finalData: data } = useFilterFinalData();
	const [currentIndex, setCurrentIndex] = useState<number>(0);

	const { selectedRange } = useCalendarStore();

	const arr_month = useMemo(
		() => [
			'Янв',
			'Фев',
			'Мар',
			'Апр',
			'Май',
			'Июн',
			'Июл',
			'Авг',
			'Сен',
			'Окт',
			'Ноя',
			'Дек',
		],
		[],
	);

	const {
		getSelectedMonths,
		handleSelectMonth,
		showNextYear,
		showPreviousYear,
	} = useCalendar();

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

	const styleWrapper = isViewCalendar
		? {
				backgroundColor: 'rgba(255,255,255, 0.08)',
				borderColor: colors.white,
			}
		: {};

	return (
		<div className={styles.wrapper_calendar} style={styleWrapper}>
			<div className={styles.block__target}>
				<p className={styles.target}>
					{selectedRange.start && selectedRange.end
						? `${selectedRange.start} - ${selectedRange.end}`
						: selectedRange.start
							? selectedRange.start
							: 'Выберите период'}
				</p>
				<img
					className={styles.arrow}
					src='/images/icons/arrow_bot.svg'
					alt='arrow'
					onClick={() => setIsViewCalendar(!isViewCalendar)}
				/>
			</div>

			{isViewCalendar && (
				<div className={styles.block__calendar}>
					<div className={styles.block__year}>
						<button
							className={`${styles.button} ${styles.prev}`}
							onClick={() => showPreviousYear(setCurrentIndex, uniqueYear)}
						>
							<img src='/images/icons/arrow_bot.svg' alt='arrow' />
						</button>
						<p className={styles.year}>{uniqueYear[currentIndex]}</p>
						<button
							className={`${styles.button} ${styles.next}`}
							onClick={() => showNextYear(setCurrentIndex, uniqueYear)}
						>
							<img src='/images/icons/arrow_bot.svg' alt='arrow' />
						</button>
					</div>
					<div className={styles.block__month}>
						{arr_month.map((month, ind) => {
							const isActive = editData.some(
								([year, monthName]) =>
									year === uniqueYear[currentIndex] && monthName === month,
							);

							const isSelected =
								// Проверяем, что это старт диапазона
								(selectedRange.start?.includes(arr_month_full[ind]) &&
									selectedRange.start.includes(uniqueYear[currentIndex])) ||
								// Проверяем, что это конец диапазона
								(selectedRange.end?.includes(arr_month_full[ind]) &&
									selectedRange.end.includes(uniqueYear[currentIndex])) ||
								// Проверяем, что месяц и год находятся внутри диапазона
								selectedMonths.includes(
									`${arr_month_full[ind]} ${uniqueYear[currentIndex]}`,
								);

							return (
								<button
									key={ind}
									className={`${styles.month} ${isSelected ? styles.selected : ''}`}
									disabled={!isActive}
									onClick={() =>
										handleSelectMonth(ind, uniqueYear, currentIndex)
									}
								>
									{month}
								</button>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
};

export default Calendar;
