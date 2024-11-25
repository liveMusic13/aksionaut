import { FC, useEffect, useState } from 'react';

import { useDraggingPopup } from '../../hooks/useDraggingPopup';
import { useRegionStore } from '../../store/store';
import { IPopupRegion } from '../../types/props.types';
import { IRegionCoordinate } from '../../types/store.types';
import { truncateDescription } from '../../utils/egitText';
import ColumnChart from '../graphs/column-chart/ColumnChart';

import styles from './PopupRegion.module.scss';

const PopupRegion: FC<IPopupRegion> = ({ targetRegion, position }) => {
	const setRegion = useRegionStore(store => store.setRegion);
	const region = useRegionStore(store => store.region);
	const [positionNew, setPositionNew] = useState<IRegionCoordinate>(position);

	useEffect(() => {
		setPositionNew(position);
	}, [position]);

	const { dragging, handleMouseDown } = useDraggingPopup(
		positionNew,
		setPositionNew,
	);

	const removePopup = () => {
		if (region.length === 1) {
			setRegion([]);
		} else {
			const targetClose = region.filter(el => el !== position.id);
			console.log(targetClose);
			setRegion(targetClose);
		}
	};

	const findMaxDataValue = (
		targetRegion: {
			name: string;
			data: number[];
			color: string;
		}[],
	): number => {
		// let maxValue = -Infinity;
		let maxValue = 0;
		targetRegion.forEach(region => {
			region.data.forEach(value => {
				if (value > maxValue) {
					maxValue = value;
				}
			});
		});
		return maxValue;
	};

	return (
		<div
			className={styles.block__popup}
			style={{
				top: positionNew.y,
				left: positionNew.x,
				cursor: dragging ? 'move' : '',
			}}
			onMouseDown={handleMouseDown}
		>
			<div className={styles.block__title}>
				<h2 className={styles.title}>{truncateDescription(position.id, 21)}</h2>
				<button onClick={removePopup} className={styles.exit}>
					<img src='/images/icons/exit.svg' alt='exit' />
				</button>
			</div>
			<div className={styles.block__stats}>
				<div className={styles.block__content}>
					<h3 className={styles.title__stats}>Ценность</h3>
					{targetRegion.map((est, ind) => (
						<p key={ind} className={styles.value__stats}>
							{est.name}
						</p>
					))}
				</div>
				<div className={styles.block__content}>
					<h3 className={styles.title__stats}>
						Максимальное значение за период
					</h3>
					<p className={styles.value__stats}>
						{findMaxDataValue(targetRegion)}
					</p>
				</div>
			</div>
			<ColumnChart data={targetRegion} />
		</div>
	);
};

export default PopupRegion;
