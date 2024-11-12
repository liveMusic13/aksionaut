import { FC, Suspense } from 'react';

import { useEstimateData } from '../../../hooks/useEstimateData';
import CustomMap from '../../custom-map/CustomMap';
import Filters from '../../filters/Filters';
import Header from '../../header/Header';
import Layout from '../../layout/Layout';
import WorthBlock from '../../worth-block/WorthBlock';
import ErrorPage from '../error-page/ErrorPage';

const Home: FC = () => {
	const { data, error, isSuccess, refetch, isError } = useEstimateData();

	console.log(data);

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
				<Suspense>
					<Filters />
				</Suspense>
				<Suspense>
					<WorthBlock />
				</Suspense>
			</div>
			<Suspense>
				<CustomMap />
			</Suspense>
			{/* <Button>Найти</Button> */}
			{/* <h1>APP</h1> */}
		</Layout>
	);
};

export default Home;
