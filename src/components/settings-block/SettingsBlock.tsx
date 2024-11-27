import { FC } from 'react';

import { selectsArr } from '../../data/selects.data';
import {
	useCalendarStore,
	useEstimateStore,
	useRegionStore,
	useSettingsStore,
	useViewFilters,
} from '../../store/store';

import styles from './SettingsBlock.module.scss';
import BlockButtons from './block-buttons/BlockButtons';

const SettingsBlock: FC = () => {
	const setIsSettings = useSettingsStore(store => store.setIsSettings);
	const region = useRegionStore(store => store.region);
	const estimate = useEstimateStore(store => store.estimate);
	const selectedRange = useCalendarStore(store => store.selectedRange);
	const setIsFilter = useViewFilters(store => store.setIsFilter);

	const valueFunck = (id: number) => {
		if (id === 0) {
			// Проверка для estimate
			if (estimate.length === 1) {
				return estimate[0];
			} else if (estimate.length === 2) {
				return `${estimate[0]}, ${estimate[1]}`;
			} else {
				return false; // Нет данных в estimate
			}
		} else if (id === 1) {
			// Проверка для region
			if (region.length === 1) {
				return `${region[0]}`;
			} else if (region.length === 2) {
				return `${region[0]}, ${region[1]}`;
			} else {
				return false; // Нет данных в region
			}
		} else if (id === 2) {
			// Проверка для selectedRange
			if (selectedRange.start && selectedRange.end) {
				return `${selectedRange.start} - ${selectedRange.end}`;
			} else if (selectedRange.start && !selectedRange.end) {
				return `${selectedRange.start}`;
			} else if (!selectedRange.start && selectedRange.end) {
				return `${selectedRange.end}`;
			} else {
				return false; // Нет данных в selectedRange
			}
		}

		return false; // На случай, если id не совпадает с известными
	};

	const onClick = () => {
		setIsSettings(false);
	};
	const _onClick = (id: number, selectsArr: { id: number; name: string }[]) => {
		setIsFilter(id, true);
		selectsArr.forEach(el => {
			if (el.id !== id) setIsFilter(el.id, false);
		});
	};

	return (
		<div className={styles.block__settings}>
			<div className={styles.block__title}>
				<h2 className={styles.title}>Параметры</h2>
				<button className={styles.exit} onClick={onClick}>
					<img src='/images/icons/exit.svg' alt='exit' />
				</button>
			</div>
			<div className={styles.block__selects}>
				{selectsArr.map(sel => (
					<div
						key={sel.id}
						className={styles.block__select}
						onClick={() => _onClick(sel.id, selectsArr)}
					>
						<div className={styles.block__titleSelect}>
							<h3 className={styles.title__select}>{sel.name}</h3>
							<p className={styles.value__select}>
								{!valueFunck(sel.id) ? sel.name : valueFunck(sel.id)}
							</p>
						</div>
						<img
							src='/images/icons/arrow_bot.svg'
							alt='arrow'
							className={styles.arrow}
						/>
					</div>
				))}
			</div>
			<BlockButtons />
		</div>
	);
};

export default SettingsBlock;
