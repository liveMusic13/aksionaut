import { FC, useEffect, useState } from 'react';

import { useRegionStore } from '../../store/store';
import { IPopupRegion } from '../../types/props.types';
import ColumnChart from '../graphs/column-chart/ColumnChart';

import styles from './PopupRegion.module.scss';

const PopupRegion: FC<IPopupRegion> = ({ targetRegion, position }) => {
	const setRegion = useRegionStore(store => store.setRegion);
	const [positionNew, setPositionNew] = useState(position);
	const [dragging, setDragging] = useState(false);
	const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(
		null,
	);

	useEffect(() => {
		setPositionNew(position);
	}, [position]);

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		setDragging(true);
		setDragStart({
			x: e.clientX - positionNew.x,
			y: e.clientY - positionNew.y,
		});
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (dragging && dragStart) {
			setPositionNew({
				id: positionNew.id,
				x: e.clientX - dragStart.x,
				y: e.clientY - dragStart.y,
			});
			console.log('e.currentTarget.closest()', e);
		}
	};

	const handleMouseUp = () => {
		setDragging(false);
		setDragStart(null);
		// Здесь вы можете сохранить позицию в глобальное состояние или сделать другой нужный вам запрос
		console.log('Новая позиция:', positionNew);
	};

	useEffect(() => {
		if (dragging) {
			window.addEventListener('mousemove', handleMouseMove);
			window.addEventListener('mouseup', handleMouseUp);
		} else {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		}

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		};
	}, [dragging]);

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
			<h2>{position.id}</h2>
			<p onClick={() => setRegion([])}>test</p>
			<ColumnChart data={targetRegion} />
		</div>
	);
};

export default PopupRegion;
