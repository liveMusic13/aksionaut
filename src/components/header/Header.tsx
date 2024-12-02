import Cookies from 'js-cookie';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { TOKEN } from '../../app.constants';
import { useAuth } from '../../hooks/useAuth';
import { useCheckWidth } from '../../hooks/useCheckWidth';

import styles from './Header.module.scss';

const Header: FC = () => {
	const { windowSize } = useCheckWidth();
	const navigate = useNavigate();
	const { setIsAuth, isAuth } = useAuth();

	const logout = () => {
		Cookies.remove(TOKEN);
		setIsAuth(false);
		navigate('/auth');
	};

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
