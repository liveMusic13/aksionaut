import ErrorPage from '../components/screens/error-page/ErrorPage';
import Home from '../components/screens/home/Home';
import Intro from '../components/screens/intro/Intro';

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
	{
		path: '/intro',
		component: Intro,
		isAuth: false,
	},
];
