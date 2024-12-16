import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCheckWidth } from '../../../hooks/useCheckWidth';
import Button from '../../ui/button/Button';

import styles from './NoHistory.module.scss';

const NoHistory: FC = () => {
	const { windowSize } = useCheckWidth();
	const isTablet = windowSize.width <= 768.98;
	const nav = useNavigate();

	const onClick = () => {
		nav('/');
	};

	return (
		<div className={styles.block__noHistory}>
			<img
				src='/images/icons/no_history.svg'
				alt='time'
				className={styles.image}
			/>
			<h3 className={styles.title}>Здесь вы найдете свою историю поиска</h3>
			<p className={styles.description}>
				Вы можете просматривать созданные ранее запросы
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
				Вернуться на главную
			</Button>
		</div>
	);
};

export default NoHistory;
