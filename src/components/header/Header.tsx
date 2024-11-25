import { FC } from 'react';

import { useCheckWidth } from '../../hooks/useCheckWidth';

import styles from './Header.module.scss';

const Header: FC = () => {
	const { windowSize } = useCheckWidth();

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
