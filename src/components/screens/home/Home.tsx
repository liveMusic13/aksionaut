import { FC, Suspense, useState } from 'react';

import { useEstimateData } from '../../../hooks/useEstimateData';
import CustomMap from '../../custom-map/CustomMap';
import Header from '../../header/Header';
import Layout from '../../layout/Layout';
import PopupRegion from '../../popup-region/PopupRegion';
import ErrorPage from '../error-page/ErrorPage';

const Home: FC = () => {
	const { data, error, isSuccess, refetch, isError } = useEstimateData();

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

	console.log(data);

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
			{/* <BlockEstimate /> */}
			<div
				style={{
					position: 'absolute',
					zIndex: '5',
					left: '50%',
					top: 'calc(120/1920*100vw)',
					transform: 'translateX(-50%)',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 'calc(46/1920*100vw)',
				}}
			>
				{/* <Suspense>
					<Filters />
				</Suspense> */}
				{/* <Suspense>
					<WorthBlock />
				</Suspense> */}
			</div>
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
