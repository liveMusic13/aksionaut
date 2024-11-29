import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { introArr } from '../../../data/intro.data';
import { useCheckWidth } from '../../../hooks/useCheckWidth';
import Header from '../../header/Header';
import Layout from '../../layout/Layout';
import Button from '../../ui/button/Button';

import styles from './Intro.module.scss';

const Intro: FC = () => {
	const nav = useNavigate();
	const {
		windowSize: { width },
	} = useCheckWidth();
	const isMobile = width <= 425;
	const isTablet = width <= 768.98;
	const [stage, setStage] = useState<number>(1);
	const src =
		stage === 1
			? '/images/intro_one.png'
			: stage === 2
				? '/images/intro_two.png'
				: '/images/intro_three.png';

	const onStart = () => {
		nav('/auth');
		setStage(0);
	};
	const onClick = () => {
		setStage(prev => prev + 1);
	};

	return (
		<Layout
			style={{
				backgroundImage: isMobile
					? 'url("/images/backgrounds/intro_mobile.jpg")'
					: 'url("/images/backgrounds/intro.jpg")',
				backgroundSize: 'cover',
				backgroundRepeat: isTablet ? 'repeat-y' : 'no-repeat',
				gap: 'calc(55/1920*100vw)',
				flexDirection: isTablet ? 'column' : undefined,
				overflowY: isMobile ? 'auto' : undefined,
				display: isMobile ? 'block' : 'flex',
			}}
		>
			<Header />
			<div className={styles.block__content}>
				<div className={styles.block__stage}>
					<p className={`${styles.stage} ${stage >= 1 ? styles.active : ''}`}>
						1
					</p>
					<div className={styles.line}></div>
					<p className={`${styles.stage} ${stage >= 2 ? styles.active : ''}`}>
						2
					</p>
					<div className={styles.line}></div>
					<p className={`${styles.stage} ${stage === 3 ? styles.active : ''}`}>
						3
					</p>
				</div>

				<h2 className={styles.title}>{introArr[stage - 1].title}</h2>
				{introArr[stage - 1].description.length > 1 ? (
					<>
						<p className={styles.description}>
							{introArr[stage - 1].description[0]}
						</p>
						<p className={styles.description}>
							{introArr[stage - 1].description[1]}
						</p>
						<p className={styles.description}>
							{introArr[stage - 1].description[2]}
						</p>
					</>
				) : (
					<p className={styles.description}>
						{introArr[stage - 1].description[0]}
					</p>
				)}

				<div className={styles.block__buttons}>
					{stage !== 3 ? (
						<>
							<Button
								style={{
									width: isMobile
										? 'calc(139/390*100vw)'
										: isTablet
											? 'calc(139/768*100vw)'
											: 'calc(139/1920*100vw)',
									height: isMobile
										? 'calc(52/390*100vw)'
										: isTablet
											? 'calc(52/768*100vw)'
											: 'calc(52/1920*100vw)',
									backgroundColor: 'transparent',
								}}
								onClick={onStart}
							>
								Пропустить
							</Button>
							<Button
								style={{
									width: isMobile
										? 'calc(139/390*100vw)'
										: isTablet
											? 'calc(139/768*100vw)'
											: 'calc(139/1920*100vw)',
									height: isMobile
										? 'calc(52/390*100vw)'
										: isTablet
											? 'calc(52/768*100vw)'
											: 'calc(52/1920*100vw)',
								}}
								onClick={onClick}
							>
								Далее
							</Button>
						</>
					) : (
						<>
							<Button
								style={{
									width: isMobile
										? 'calc(139/390*100vw)'
										: isTablet
											? 'calc(139/768*100vw)'
											: 'calc(199/1920*100vw)',
									height: isMobile
										? 'calc(52/390*100vw)'
										: isTablet
											? 'calc(52/768*100vw)'
											: 'calc(52/1920*100vw)',
								}}
								onClick={onStart}
							>
								Начать работу
							</Button>
							<img
								className={styles.astronaut}
								src='/images/icons/astronaut_chat.svg'
								alt='astronaut'
							/>
						</>
					)}
				</div>
			</div>
			<img
				src={src}
				alt='intro'
				className={`${styles.image} ${stage === 2 ? styles.two : stage === 3 ? styles.three : ''}`}
			/>
		</Layout>
	);
};

export default Intro;
