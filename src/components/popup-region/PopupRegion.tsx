import { FC } from 'react';

import { IPopupRegion } from '../../types/props.types';
import ColumnChart from '../graphs/column-chart/ColumnChart';

import styles from './PopupRegion.module.scss';

const PopupRegion: FC<IPopupRegion> = ({ targetRegion, position }) => {
	// const data = [
	// 	{
	// 		name: 'Corn',
	// 		data: [387749, 280000, 129000, 64300, 54000, 34300],
	// 		color: 'rgba(255,255,255, 0.8)',
	// 	},
	// 	{
	// 		name: 'Wheat',
	// 		data: [45321, 140000, 10000, 140500, 19500, 113500],
	// 		color: '#A2BFF5',
	// 	},
	// ];

	return (
		<div
			className={styles.block__popup}
			style={{
				top: position.y,
				left: position.x,
			}}
		>
			<ColumnChart data={targetRegion} />
		</div>
	);
};

export default PopupRegion;
