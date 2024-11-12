import ErrorPage from '../components/screens/error-page/ErrorPage';
import Home from '../components/screens/home/Home';

export const routes = [
	{
		path: '/',
		component: Home,
		isAuth: true,
	},
	{
		path: '/error',
		component: ErrorPage,
		isAuth: true,
	},
];
