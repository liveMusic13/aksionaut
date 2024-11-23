import { FC, Suspense, useCallback, useEffect, useMemo, useState } from 'react';

import { useEstimateData } from '../../../hooks/useEstimateData';
import { useFilters } from '../../../hooks/useFilters';
import {
	useCalendarStore,
	useEstimateStore,
	useRegionStore,
	useRegionsCoordinateStore,
} from '../../../store/store';
import { IRegionCoordinate } from '../../../types/store.types';
import CustomMap from '../../custom-map/CustomMap';
import Filters from '../../filters/Filters';
import Header from '../../header/Header';
import Layout from '../../layout/Layout';
import PopupRegion from '../../popup-region/PopupRegion';
import WorthBlock from '../../worth-block/WorthBlock';
import ErrorPage from '../error-page/ErrorPage';

const Home: FC = () => {
	const { data, error, isSuccess, refetch, isError } = useEstimateData();
	const region = useRegionStore(store => store.region);
	const setRegion = useRegionStore(store => store.setRegion);
	const estimate = useEstimateStore(store => store.estimate);
	const selectedRange = useCalendarStore(store => store.selectedRange);
	const [targetRegion, setTargetRegion] = useState([
		// {
		// 	name: 'Corn',
		// 	data: [387749, 280000, 129000, 64300, 54000, 34300],
		// 	color: 'rgba(255,255,255, 0.8)',
		// },
		// {
		// 	name: 'Wheat',
		// 	data: [45321, 140000, 10000, 140500, 19500, 113500],
		// 	color: '#A2BFF5',
		// },
	]);

	const arr_month_full = useMemo(
		() => [
			'Январь',
			'Февраль',
			'Март',
			'Апрель',
			'Май',
			'Июнь',
			'Июль',
			'Август',
			'Сентябрь',
			'Октябрь',
			'Ноябрь',
			'Декабрь',
		],
		[],
	);

	useFilters(data ? data : { values: [] }, arr_month_full, setTargetRegion);
	useEffect(
		() => console.log('testtesttest', targetRegion, estimate),
		[targetRegion],
	);

	const regionsCoordinate = useRegionsCoordinateStore(state => state.regions);
	const getPositionsFunck = (
		regionsCoordinate: IRegionCoordinate[],
	): IRegionCoordinate[] => {
		const firstRegionName = region.length > 0 ? region[0] : '';
		const secondRegionName = region.length === 2 ? region[1] : '';

		const firstRegion = regionsCoordinate.find(
			region => region.id === firstRegionName,
		) || { id: '', x: 0, y: 0 };
		const secondRegion = regionsCoordinate.find(
			region => region.id === secondRegionName,
		) || { id: '', x: 0, y: 0 };

		return [firstRegion, secondRegion];
	};

	const updateRegionById = useRegionsCoordinateStore(
		store => store.updateRegionById,
	);
	const onClick = useCallback((e: any) => {
		const groupElement = e.currentTarget.closest('g');
		if (groupElement) {
			console.log(groupElement.id, e.clientX, e.clientY);
			setRegion([groupElement.id]);
			updateRegionById(groupElement.id, e.clientX, e.clientY);
		} else {
			console.log('Родительский элемент не найден.');
		}
	}, []);

	if (isError) {
		return <ErrorPage />;
	}

	return (
		<Layout
			style={{
				backgroundImage: 'url("/images/backgrounds/stars_home.jpg")',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
			}}
		>
			<Header />
			<Suspense>
				<Filters />
			</Suspense>
			<Suspense>
				{!(
					region.length > 0 ||
					estimate.length > 0 ||
					selectedRange.start ||
					selectedRange.end
				) && <WorthBlock />}
			</Suspense>
			<Suspense>
				<CustomMap onClick={onClick} />
			</Suspense>

			{targetRegion && targetRegion && targetRegion.length === 1 && (
				<PopupRegion
					targetRegion={targetRegion[0]}
					position={getPositionsFunck(regionsCoordinate)[0]}
				/>
			)}
			{targetRegion && targetRegion && targetRegion.length === 2 && (
				<>
					<PopupRegion
						targetRegion={targetRegion[0]}
						position={getPositionsFunck(regionsCoordinate)[0]}
					/>
					<PopupRegion
						targetRegion={targetRegion[1]}
						position={getPositionsFunck(regionsCoordinate)[1]}
					/>
				</>
			)}
		</Layout>
	);
};

export default Home;
