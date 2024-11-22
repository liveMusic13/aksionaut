import { useEffect, useRef } from 'react';

import { useRegionsCoordinateStore } from '../store/store';

export const useGetPositionRegions = () => {
	const setRegions = useRegionsCoordinateStore(state => state.setRegions);

	const containerRef = useRef<SVGGElement>(null);

	useEffect(() => {
		if (containerRef.current) {
			const regions = containerRef.current.querySelectorAll('g');
			const coordinates = Array.from(regions).map(region => {
				const rect = region.getBoundingClientRect();
				return { id: region.id, x: rect.left, y: rect.top };
			});
			setRegions(coordinates);
		}
	}, [setRegions]);

	return {
		containerRef,
	};
};
