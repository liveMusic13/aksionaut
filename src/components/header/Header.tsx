import { FC } from 'react';

import Geolocation from '../geolocation/Geolocation';

import styles from './Header.module.scss';

const Header: FC = () => {
	return (
		<header className={styles.header}>
			<img
				src='/images/icons/logo_full.svg'
				alt='logo'
				className={styles.logo}
			/>
			<div className={styles.block__right}>
				<Geolocation />
				<button className={styles.button}>
					Выйти
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
