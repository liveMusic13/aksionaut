import { FC, useState } from 'react';
import { useControls } from 'react-zoom-pan-pinch';

import styles from './ZoomControl.module.scss';

const ZoomControl: FC = ({}) => {
	const [zoom, setZoom] = useState<number>(0);
	const { zoomIn, zoomOut } = useControls();

	const handleZoomChange = (change_side: string) => {
		if (change_side === '+' && zoom < 5) {
			setZoom(prev => prev + 1);
			zoomIn();
		} else if (change_side === '-' && zoom > 0) {
			setZoom(prev => prev - 1);
			zoomOut();
		}
	};

	const percentZoom =
		zoom === 0
			? '0%'
			: zoom === 1
				? '20%'
				: zoom === 2
					? '40%'
					: zoom === 3
						? '60%'
						: zoom === 4
							? '80%'
							: '100%';

	return (
		<div className={styles.block__zoom}>
			<button onClick={() => handleZoomChange('+')}>+</button>
			<p>{percentZoom}</p>
			<button onClick={() => handleZoomChange('-')}>-</button>
		</div>
	);
};

export default ZoomControl;
