import Auth from '../components/screens/auth/Auth';
import ErrorPage from '../components/screens/error-page/ErrorPage';
import Home from '../components/screens/home/Home';
import Intro from '../components/screens/intro/Intro';

export const routes = [
	{
		path: '/',
		component: Home,
		// isAuth: false,
		isAuth: true,
	},
	{
		path: '/error',
		component: ErrorPage,
		isAuth: false,
	},
	{
		path: '/intro',
		component: Intro,
		isAuth: false,
	},
	{
		path: '/auth',
		component: Auth,
		isAuth: false,
	},
];
