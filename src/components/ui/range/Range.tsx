import { FC } from 'react';

import { IRange } from '../../../types/props.types';

import styles from './Range.module.scss';

const Range: FC<IRange> = ({ estimate }) => {
	return (
		<div className={styles.block__range}>
			<div className={styles.block__title}>
				<h2 className={styles.title}>{estimate.cennost_name}</h2>
				<p className={styles.percent}>10%</p>
			</div>
			<div className={styles.full__range}>
				<div
					className={styles.percent__range}
					style={{ width: `${'10%'}` }}
				></div>
			</div>
		</div>
	);
};

export default Range;
