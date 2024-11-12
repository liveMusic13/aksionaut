import { FC } from 'react';

import { useEstimateData } from '../../hooks/useEstimateData';
import Range from '../ui/range/Range';

import styles from './BlockEstimate.module.scss';

const BlockEstimate: FC = () => {
	const { data } = useEstimateData();

	return (
		<div className={styles.block__estimate}>
			<h2 className={styles.title}>Топ ценностей в приморском крае</h2>
			<div className={styles.block__statistics}>
				{data?.values.map((est, ind) => <Range key={ind} estimate={est} />)}
			</div>
		</div>
	);
};

export default BlockEstimate;
