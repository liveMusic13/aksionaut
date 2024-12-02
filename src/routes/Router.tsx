import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ErrorPage from '../components/screens/error-page/ErrorPage';
import Intro from '../components/screens/intro/Intro';
import { useAuth } from '../hooks/useAuth';

import { routes } from './routes.data';

const Router: FC = () => {
	const { isAuth } = useAuth();

	return (
		<BrowserRouter>
			<Routes>
				{routes.map(route => {
					if (route.isAuth && !isAuth) {
						return false;
					}

					return (
						<Route
							key={route.path}
							element={<route.component />}
							path={route.path}
						/>
					);
				})}
				<Route element={!isAuth ? <Intro /> : <ErrorPage />} path='*' />
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
