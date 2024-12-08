import { FC } from 'react';
import { Link } from 'react-router-dom';

import { useCheckWidth } from '../../hooks/useCheckWidth';
import { useSaveImageGraph } from '../../hooks/useSaveImageGraph';
import {
	useCalendarStore,
	useDownloadStore,
	useEstimateStore,
	useRegionStore,
	useScaleDownloadStore,
} from '../../store/store';
import { IChartData, IDownload } from '../../types/props.types';
import {
	formatDateStringToNumber,
	getFormattedDate,
} from '../../utils/actualDate';
import DownloadChart from '../graphs/download-chart/DownloadChart';
import Button from '../ui/button/Button';

import styles from './Download.module.scss';

const Download: FC<IDownload> = ({ data }) => {
	const setIsViewDownload = useDownloadStore(store => store.setIsViewDownload);
	const estimate = useEstimateStore(store => store.estimate);
	const selectedRange = useCalendarStore(store => store.selectedRange);
	const region = useRegionStore(store => store.region);
	const { windowSize } = useCheckWidth();
	const isMobile = windowSize.width <= 451;
	const isTablet = windowSize.width <= 768;

	const close = () => setIsViewDownload(false);
	const isScaleDownload = useScaleDownloadStore(store => store.isScaleDownload);
	const setIsScaleDownload = useScaleDownloadStore(
		store => store.setIsScaleDownload,
	);
	const handleDownloadImage = useSaveImageGraph(setIsScaleDownload);

	return (
		<div
			className={`${styles.block__download} ${isScaleDownload ? styles.scale : ''}`}
			id='download-container'
		>
			<div className={`${styles.block__title}`}>
				<h2 className={styles.title}>Статистика по ценностям</h2>
				<button className={styles.exit} onClick={close}>
					<img src='/images/icons/exit_black.svg' alt='exit' />
				</button>
			</div>
			<p className={`${styles.date}`}>{getFormattedDate()}</p>
			<div
				className={`${styles.block__graphs} ${isScaleDownload ? styles.scale__graphs : ''}`}
			>
				{data.length > 1 ? (
					<>
						<DownloadChart
							data={data[0] as IChartData[]}
							estimate={estimate}
							region={region[0]}
							max_period={formatDateStringToNumber(
								selectedRange.start ? selectedRange.start : '',
								selectedRange.end ? selectedRange.end : '',
							)}
						/>
						<DownloadChart
							data={data[1] as IChartData[]}
							estimate={estimate}
							region={region[1]}
							max_period={formatDateStringToNumber(
								selectedRange.start ? selectedRange.start : '',
								selectedRange.end ? selectedRange.end : '',
							)}
						/>
					</>
				) : (
					<DownloadChart
						data={data[0] as IChartData[]}
						estimate={estimate}
						region={region[0]}
						max_period={formatDateStringToNumber(
							selectedRange.start ? selectedRange.start : '',
							selectedRange.end ? selectedRange.end : '',
						)}
					/>
				)}
			</div>

			<div className={styles.block__button}>
				<div className={styles.block__link}>
					<img
						className={styles.image__logo}
						src='/images/icons/logo_full_black.svg'
						alt='download'
					/>
					<Link
						to='http://www.аксионавт.рф'
						target='_blank'
						className={styles.link}
					>
						аксионавт.рф
					</Link>
				</div>
				<Button
					style={{
						width: isMobile
							? 'calc(150/390*100vw)'
							: isTablet
								? 'calc(150/768*100vw)'
								: 'calc(150/1920*100vw)',
						height: isMobile
							? 'calc(52/390*100vw)'
							: isTablet
								? 'calc(50/768*100vw)'
								: undefined,
					}}
					onClick={() => handleDownloadImage('download-container')}
				>
					Скачать{' '}
					<img
						className={styles.image__download}
						src='/images/icons/download.svg'
						alt='download'
					/>
				</Button>
			</div>
		</div>
	);
};

export default Download;
