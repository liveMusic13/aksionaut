import Cookies from 'js-cookie';
import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { TOKEN } from '../../app.constants';
import { useAuth } from '../../hooks/useAuth';
import { useCheckWidth } from '../../hooks/useCheckWidth';
import { IHeader } from '../../types/props.types';

import styles from './Header.module.scss';

const Header: FC<IHeader> = ({ isViewFilter, setIsViewFilter }) => {
	const { windowSize } = useCheckWidth();
	const isMobile = windowSize.width <= 425;
	const navigate = useNavigate();
	const { setIsAuth, isAuth } = useAuth();
	const { pathname } = useLocation();

	useEffect(() => {
		if (!isAuth) navigate('/intro');
	}, [isAuth]);

	const logout = () => {
		Cookies.remove(TOKEN);
		setIsAuth(false);
		navigate('/auth');
	};

	console.log('pathname', pathname);

	return (
		<header className={styles.header}>
			<img
				src={
					windowSize.width <= 425
						? '/images/icons/logo.svg'
						: '/images/icons/logo_full.svg'
				}
				alt='logo'
				className={`${styles.logo} ${styles.logo_mobile}`}
			/>
			<div className={styles.block__right}>
				{/* <Geolocation /> */}
				{!isMobile && pathname !== '/intro' && (
					<button
						onClick={() =>
							setIsViewFilter ? setIsViewFilter(!isViewFilter) : undefined
						}
						className={styles.button}
					>
						{isViewFilter ? 'Скрыть' : 'Показать'} фильтры
					</button>
				)}
				<button
					className={styles.button}
					onClick={isAuth ? logout : () => navigate('/auth')}
				>
					{isAuth ? 'Выйти' : 'Войти'}
					<img
						src='/images/icons/logout.svg'
						alt='logout'
						className={styles.logout__image}
					/>
				</button>
			</div>
		</header>
	);
};

export default Header;
