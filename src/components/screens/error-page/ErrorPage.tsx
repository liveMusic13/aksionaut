import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCheckWidth } from '../../../hooks/useCheckWidth';
import Layout from '../../layout/Layout';
import Button from '../../ui/button/Button';

import styles from './ErrorPage.module.scss';

const ErrorPage: FC = () => {
	const nav = useNavigate();
	const { windowSize } = useCheckWidth();

	console.log(windowSize.width);

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
					Чтобы продолжить работу вернитесь на главную страницу
				</p>
				<Button
					style={{
						width: `calc(224/${windowSize.width}*100vw)`,
						height: `calc(52/${windowSize.width}*100vw)`,
						borderRadius: `calc(8/${windowSize.width}*100vw)`,
						fontSize: '1rem',
					}}
					onClick={() => nav('/')}
				>
					Вернуться на главную
				</Button>
			</div>
		</Layout>
	);
};

export default ErrorPage;
