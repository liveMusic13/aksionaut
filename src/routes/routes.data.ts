import Auth from '../components/screens/auth/Auth';
import ErrorPage from '../components/screens/error-page/ErrorPage';
import Home from '../components/screens/home/Home';
import Intro from '../components/screens/intro/Intro';
import PersonalAccount from '../components/screens/personal-account/PersonalAccount';

export const routes = [
	{
		path: '/',
		component: Home,
		isAuth: true,
	},
	{
		path: '/personal-account',
		component: PersonalAccount,
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
