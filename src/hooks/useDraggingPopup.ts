import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { IRegionCoordinate } from '../types/store.types';

export const useDraggingPopup = (
	positionNew: IRegionCoordinate,
	setPositionNew: Dispatch<SetStateAction<IRegionCoordinate>>,
) => {
	const [dragging, setDragging] = useState(false);
	const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(
		null,
	);

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
		}
	};

	const handleMouseUp = () => {
		setDragging(false);
		setDragStart(null);
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

	return {
		handleMouseDown,
		dragging,
	};
};
