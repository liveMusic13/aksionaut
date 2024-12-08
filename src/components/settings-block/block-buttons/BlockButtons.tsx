import { FC } from 'react';

import {
	useCalendarStore,
	useEstimateStore,
	useRegionStore,
	useSettingsStore,
	useViewFilters,
} from '../../../store/store';
import Button from '../../ui/button/Button';

import styles from './BlockButtons.module.scss';

const BlockButtons: FC = () => {
	const estimate = useEstimateStore(store => store.estimate);
	const selectedRange = useCalendarStore(store => store.selectedRange);
	const region = useRegionStore(store => store.region);
	const { isCalendar, isEstimate, isRegion, setIsFilter } = useViewFilters();
	const setIsSettings = useSettingsStore(store => store.setIsSettings);
	const setRegion = useRegionStore(store => store.setRegion);
	const setEstimate = useEstimateStore(store => store.setEstimate);
	const resetRange = useCalendarStore(store => store.resetRange);

	const confirm = () => {
		setIsFilter(0, false);
		setIsFilter(1, false);
		setIsFilter(2, false);

		if (!isCalendar && !isEstimate && !isRegion) setIsSettings(false);
	};

	const clear = () => {
		setRegion([]);
		setEstimate([]);
		resetRange();
	};

	return (
		<div className={styles.block__buttons}>
			{(region.length > 0 ||
				estimate.length > 0 ||
				selectedRange.start ||
				selectedRange.end) &&
				!isCalendar &&
				!isEstimate &&
				!isRegion && (
					<>
						<Button
							style={{
								width: 'calc(109/390*100vw)',
								height: 'calc(52/390*100vw)',
								backgroundColor: 'transparent',
								color: '#FFFFFF99',
							}}
							onClick={clear}
						>
							Сбросить
						</Button>
						<Button
							style={{
								width: 'calc(135/390*100vw)',
								height: 'calc(52/390*100vw)',
							}}
							onClick={confirm}
						>
							Применить
						</Button>
					</>
				)}
			{(region.length > 0 ||
				estimate.length > 0 ||
				selectedRange.start ||
				selectedRange.end) &&
				(isCalendar || isEstimate || isRegion) && (
					<Button
						style={{
							width: '100%',
							height: 'calc(52/390*100vw)',
						}}
						onClick={confirm}
					>
						Применить
					</Button>
				)}
		</div>
	);
};

export default BlockButtons;
