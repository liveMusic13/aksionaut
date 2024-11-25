import { FC } from 'react';

import styles from './SelectMobile.module.scss';

const SelectMobile: FC = () => {
	return (
		<div className={styles.block__selects_mobile}>
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
