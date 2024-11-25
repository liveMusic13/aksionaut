import { FC } from 'react';

import { useSettingsStore } from '../../../store/store';

import styles from './SelectMobile.module.scss';

const SelectMobile: FC = () => {
	const setIsSettings = useSettingsStore(store => store.setIsSettings);

	const onClick = () => {
		setIsSettings(true);
	};

	return (
		<div className={styles.block__selects_mobile} onClick={onClick}>
			<p className={styles.target}>dsdsd</p>
			<img
				className={styles.image}
				src='/images/icons/settings.svg'
				alt='settings'
			/>
		</div>
	);
};

export default SelectMobile;
