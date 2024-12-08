import { FC, useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import { useDraggingPopup } from '../../hooks/useDraggingPopup';
import { useRegionStore } from '../../store/store';
import { IChartData, IPopupRegion } from '../../types/props.types';
import { IRegionCoordinate } from '../../types/store.types';
import { truncateDescription } from '../../utils/egitText';
import ColumnChart from '../graphs/column-chart/ColumnChart';

import styles from './PopupRegion.module.scss';

const PopupRegion: FC<IPopupRegion> = ({
	targetRegion,
	position,
	isMobile,
	isTablet,
	positionMobile,
}) => {
	const setRegion = useRegionStore(store => store.setRegion);
	const region = useRegionStore(store => store.region);
	const [positionNew, setPositionNew] = useState<IRegionCoordinate>(position);
	const [activeChartIndex, setActiveChartIndex] = useState<number>(0); // Активный график

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
			setRegion(targetClose);
		}
	};

	const findMaxDataValue = (
		targetRegion: IChartData[] = [], // Устанавливаем значение по умолчанию
	): number => {
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

	// Обработка свайпов
	const handlers = useSwipeable({
		onSwipedLeft: () => {
			if (
				(isMobile || isTablet) &&
				targetRegion.length > activeChartIndex + 1
			) {
				setActiveChartIndex(prev => prev + 1);
			}
		},
		onSwipedRight: () => {
			if ((isMobile || isTablet) && activeChartIndex > 0) {
				setActiveChartIndex(prev => prev - 1);
			}
		},
	});

	const data: IChartData[] =
		isMobile || isTablet
			? Array.isArray(targetRegion[activeChartIndex])
				? (targetRegion[activeChartIndex] as IChartData[])
				: []
			: (targetRegion as IChartData[]);

	if (!Array.isArray(data)) {
		console.error("Data format error: 'targetRegion' must be an array.");
		return null;
	}

	return (
		<div
			className={styles.block__popup}
			style={{
				top: !(isMobile || isTablet) ? positionNew.y : undefined,
				left: !(isMobile || isTablet) ? positionNew.x : undefined,
				cursor: dragging ? 'move' : '',
			}}
			onMouseDown={handleMouseDown}
			{...handlers}
		>
			<div className={styles.block__title}>
				<h2 className={styles.title}>
					{truncateDescription(
						(isMobile || isTablet) && positionMobile
							? positionMobile[activeChartIndex].id
							: position.id,
						21,
					)}
				</h2>
				<button onClick={removePopup} className={styles.exit}>
					<img src='/images/icons/exit.svg' alt='exit' />
				</button>
			</div>
			<div className={styles.block__stats}>
				<div className={styles.block__content}>
					<h3 className={styles.title__stats}>Ценность</h3>
					{data.map((est, ind) => (
						<p key={ind} className={styles.value__stats}>
							{est.name}
						</p>
					))}
				</div>
				<div className={styles.block__content}>
					<h3 className={styles.title__stats}>
						Максимальное значение за период
					</h3>
					<p className={styles.value__stats}>{findMaxDataValue(data)}</p>
				</div>
			</div>
			{isMobile || isTablet ? (
				<>
					{targetRegion[activeChartIndex] && (
						<ColumnChart
							key={activeChartIndex}
							data={targetRegion[activeChartIndex] as IChartData[]}
						/>
					)}
					<div className={styles.indicators}>
						{targetRegion.length > 1 &&
							targetRegion.map((_, index) => (
								<div
									key={index}
									className={`${styles.indicator} ${
										index === activeChartIndex ? styles.active : ''
									}`}
								/>
							))}
					</div>
				</>
			) : (
				<ColumnChart data={targetRegion as IChartData[]} />
			)}
		</div>
	);
};

export default PopupRegion;
