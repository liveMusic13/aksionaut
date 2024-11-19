import { FC, Suspense, useState } from 'react';

import { useEstimateData } from '../../../hooks/useEstimateData';
import {
	useCalendarStore,
	useEstimateStore,
	useRegionStore,
} from '../../../store/store';
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
	const estimate = useEstimateStore(store => store.estimate);
	const selectedRange = useCalendarStore(store => store.selectedRange);
	const [targetRegion, setTargetRegion] = useState([
		{
			name: 'Corn',
			data: [387749, 280000, 129000, 64300, 54000, 34300],
			color: 'rgba(255,255,255, 0.8)',
		},
		{
			name: 'Wheat',
			data: [45321, 140000, 10000, 140500, 19500, 113500],
			color: '#A2BFF5',
		},
	]);

	const [position, setPosition] = useState({ x: 0, y: 0 });

	console.log(region, estimate);

	const onClick = (e: any) => {
		const groupElement = e.currentTarget.closest('g');
		if (groupElement) {
			console.log(groupElement.id, e.clientX, e.clientY);
			setPosition({ x: e.clientX, y: e.clientY });
		} else {
			console.log('Родительский элемент не найден.');
		}
	};

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

			<PopupRegion targetRegion={targetRegion} position={position} />
			{/* <Button>Найти</Button> */}
			{/* <h1>APP</h1> */}
		</Layout>
	);
};

export default Home;
