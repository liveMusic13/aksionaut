import Cookies from 'js-cookie';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { TOKEN } from '../../../app.constants';
import { useAuth } from '../../../hooks/useAuth';
import { useCheckWidth } from '../../../hooks/useCheckWidth';
import Layout from '../../layout/Layout';
import Button from '../../ui/button/Button';

import styles from './ErrorPage.module.scss';

const ErrorPage: FC = () => {
	const nav = useNavigate();
	const { windowSize } = useCheckWidth();
	const isTablet = windowSize.width <= 768.98;

	const { setIsAuth } = useAuth();

	const onClick = () => {
		Cookies.remove(TOKEN);
		setIsAuth(false);
		nav('/intro');
	};

	return (
		<Layout
			style={{
				backgroundImage: 'url("/images/backgrounds/stars_home.jpg")',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				flexDirection: 'column',
				justifyContent: 'flex-start',
			}}
		>
			<h1>
				<img
					src='/images/icons/logo_error.svg'
					alt='logo'
					className={styles.logo__image}
				/>
			</h1>
			<div className={styles.block__error}>
				<img
					src='/images/astronaut.svg'
					alt='astronaut'
					className={styles.astronaut}
				/>
				<p className={styles.num__error}>520</p>
				<p className={styles.text__error}>
					Произошла серверная ошибка.
					<br />
					Попробуйте ещё раз
				</p>
				<Button
					style={{
						width: isTablet
							? `calc(224/${windowSize.width}*100vw)`
							: 'calc(224/1920*100vw)',
						height: isTablet
							? `calc(52/${windowSize.width}*100vw)`
							: 'calc(52/1920*100vw)',
						borderRadius: isTablet
							? `calc(8/${windowSize.width}*100vw)`
							: 'calc(8/1920*100vw)',
						fontSize: '1rem',
					}}
					onClick={onClick}
				>
					Вернуться в начало
				</Button>
			</div>
		</Layout>
	);
};

export default ErrorPage;
