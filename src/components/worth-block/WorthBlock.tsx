import { FC } from 'react';

import { startGraphColor } from '../../app.constants';
import { useGetTopEstimateInCountry } from '../../hooks/useGetTopEstimateInCountry';
import { transformForPercent } from '../../utils/convertForPercent';
import { generateColors } from '../../utils/generateColors';
import PieChartGraph from '../graphs/pie-chart-graph/PieChartGraph';

import styles from './WorthBlock.module.scss';

const WorthBlock: FC = () => {
	const { data, isSuccess } = useGetTopEstimateInCountry();

	const percentData = data
		? transformForPercent(data?.cennosti_by_all_period_regions)
		: [];

	return (
		<div className={styles.block__worth}>
			<h2 className={styles.title}>Топ ценностей Страны</h2>
			<div className={styles.block__content}>
				<div className={styles.block__graph}>
					{isSuccess && data && (
						<PieChartGraph data={data.cennosti_by_all_period_regions} />
					)}
				</div>
				<div className={styles.block__source}>
					{isSuccess &&
						data &&
						percentData.map((el, ind) => (
							<p key={ind} className={styles.source}>
								<span
									className={styles.color}
									style={{
										backgroundColor: generateColors(
											startGraphColor,
											percentData.length,
										)[ind],
									}}
								></span>
								{el.name} <span className={styles.percent}>{el.value}%</span>
							</p>
						))}
				</div>
			</div>
		</div>
	);
};

export default WorthBlock;
