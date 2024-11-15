import { FC } from 'react';

import ColumnChart from '../graphs/column-chart/ColumnChart';

const PopupRegion: FC = ({ targetRegion }) => {
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
			style={{
				width: 'calc(358/1920*100vw',
				height: 'calc(363/1920*100vw)',
				position: 'absolute',
				top: '25%',
				left: '25%',
				zIndex: '20',
				backdropFilter: 'blur(4px)',
				backgroundColor: 'rgba(28, 37, 57, 0.6)',
			}}
		>
			<ColumnChart data={targetRegion} />
		</div>
	);
};

export default PopupRegion;
