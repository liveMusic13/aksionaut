import { FC, Suspense, lazy } from 'react';

import { useCheckWidth } from '../../../hooks/useCheckWidth';
import Header from '../../header/Header';
import Layout from '../../layout/Layout';

const ContentLk = lazy(() => import('../../content-lk/ContentLk'));

const PersonalAccount: FC = () => {
	const {
		windowSize: { width },
	} = useCheckWidth();
	const isMobile = width <= 451;

	return (
		<Layout
			style={{
				backgroundImage: 'url("/images/backgrounds/stars_home.jpg")',
				backgroundSize: 'cover',
				display: isMobile ? 'block' : 'flex',
			}}
		>
			<Header />
			<Suspense fallback={<div>Loading...</div>}>
				<ContentLk />
			</Suspense>
		</Layout>
	);
};

export default PersonalAccount;
