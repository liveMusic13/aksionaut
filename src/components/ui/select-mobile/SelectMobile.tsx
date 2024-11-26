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
			<img
				className={styles.image}
				src='/images/icons/settings.svg'
				alt='settings'
			/>
		</div>
	);
};

export default SelectMobile;
