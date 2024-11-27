import { FC } from 'react';

import {
	useCalendarStore,
	useEstimateStore,
	useRegionStore,
	useSettingsStore,
} from '../../../store/store';
import { truncateDescription } from '../../../utils/egitText';

import styles from './SelectMobile.module.scss';

const SelectMobile: FC = () => {
	const setIsSettings = useSettingsStore(store => store.setIsSettings);
	const region = useRegionStore(store => store.region);
	const estimate = useEstimateStore(store => store.estimate);
	const selectedRange = useCalendarStore(store => store.selectedRange);

	const countFunck = () => {
		let count = 0;

		if (region.length > 0) count += 1;
		if (estimate.length > 0) count += 1;
		if (selectedRange.start || selectedRange.end) count += 1;

		return count;
	};

	const valueTarget = () => {
		let result = '';
		if (region && region.length > 0) {
			result += region.join(',');
		}
		if (estimate && estimate.length > 0) {
			if (result) result += ',';
			result += estimate.join(',');
		}
		if (selectedRange) {
			const { start, end } = selectedRange;
			if (start && end) {
				if (result) result += ',';
				result += `${start}-${end}`;
			}
		}
		return result === '' ? 'Фильтры' : result;
	};

	const onClick = () => {
		setIsSettings(true);
	};

	return (
		<div className={styles.block__selects_mobile} onClick={onClick}>
			<p className={styles.target}>{truncateDescription(valueTarget(), 33)}</p>
			<div className={styles.block__image}>
				{countFunck() !== 0 && (
					<div className={styles.block__count}>
						<p className={styles.count}>{countFunck()}</p>
					</div>
				)}
				<img
					className={styles.image}
					src='/images/icons/settings.svg'
					alt='settings'
				/>
			</div>
		</div>
	);
};

export default SelectMobile;
