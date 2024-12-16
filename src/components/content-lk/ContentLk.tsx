import { FC, useCallback, useState } from 'react';

import { arrDownload } from '../../data/download.data';
import { arrTarget } from '../../data/panelTarget.data';
import { useCheckWidth } from '../../hooks/useCheckWidth';
import { useDownload } from '../../hooks/useDownload';
import { useHistorySearch } from '../../hooks/useHistorySearch';
import { useIsHistoryPopupStore } from '../../store/store';
import { formatDate, sortByDateDescending } from '../../utils/actualDate';
import Popup from '../popup/Popup';
import ErrorPage from '../screens/error-page/ErrorPage';
import PanelTarget from '../ui/panel-target/PanelTarget';

import styles from './ContentLk.module.scss';
import FormLk from './form-lk/FormLk';
import NoHistory from './no-history/NoHistory';

const ContentLk: FC = () => {
	const {
		windowSize: { width },
	} = useCheckWidth();
	const isMobile = width <= 451;
	const [activeButton, setActiveButton] = useState(isMobile ? '' : 'История');
	const { setIsViewPopup, isViewPopup } = useIsHistoryPopupStore(
		store => store,
	);

	const handleClick = useCallback(
		(but: string) => {
			setActiveButton(but);
		},
		[activeButton],
	);

	const { mutate, mutate_guide, isPending, isPending_guide } = useDownload();

	const onClick_download = (id: number) => {
		if (id === 0) {
			mutate();
		} else if (id === 1) {
			mutate_guide();
		}
	};

	const { data, isSuccess, isLoading, isError } = useHistorySearch();

	if (isError) {
		return <ErrorPage />;
	}

	return (
		<div className={styles.wrapper_lk}>
			{!isMobile && (
				<PanelTarget
					activeButton={activeButton}
					dataButtons={arrTarget}
					handleClick={handleClick}
				/>
			)}
			<div className={styles.block__title_mobile}>
				{activeButton && (
					<button
						onClick={() => setActiveButton('')}
						className={styles.button__back}
					>
						<img src='/images/icons/arrow_back.svg' alt='arrow' />
					</button>
				)}
				<h2 className={styles.title__mobile}>
					{activeButton === 'История'
						? 'История'
						: activeButton === 'Документы'
							? 'Документы'
							: activeButton === 'Управление аккаунтом'
								? 'Управление аккаунтом'
								: 'Аккаунт'}
				</h2>
			</div>
			<div className={styles.block__content_mobile}>
				{activeButton === '' &&
					arrTarget.map(sel => (
						<div
							key={sel.id}
							className={styles.block__select}
							onClick={() => handleClick(sel.name)}
						>
							<div className={styles.block__titleSelect}>
								<h3 className={styles.title__select}>{sel.name}</h3>
							</div>
							<img
								src='/images/icons/arrow_bot.svg'
								alt='arrow'
								className={styles.arrow}
							/>
						</div>
					))}
			</div>

			{activeButton === 'История' && (
				<div
					className={styles.block__history}
					style={
						isSuccess && data && data.length === 0 ? { height: '85%' } : {}
					}
				>
					{isViewPopup && <Popup />}
					{isLoading && <div>Loading</div>}
					{isSuccess && data && data.length === 0 && <NoHistory />}
					{isSuccess &&
						data &&
						data.length > 0 &&
						sortByDateDescending(data).map((el, ind) => (
							<div key={ind} className={styles.block__day}>
								<h3 className={styles.title__date}>{formatDate(el.date)}</h3>
								<div className={styles.block__questions}>
									{el.values.map((hist, index) => (
										<p
											key={index}
											className={styles.question}
											onClick={() => setIsViewPopup(true, hist.resp)}
										>
											{hist.query}
										</p>
									))}
								</div>
							</div>
						))}
				</div>
			)}
			{activeButton === 'Управление аккаунтом' && <FormLk />}
			{activeButton === 'Документы' && (
				<div className={styles.block__downloads}>
					{arrDownload.map(el => (
						<div key={el.id} className={styles.block__download}>
							<h3>{el.name}</h3>
							{((isPending && el.id === 0) ||
								(isPending_guide && el.id === 1)) && <div>Loading...</div>}
							<button onClick={() => onClick_download(el.id)}>
								<img src='/images/icons/download.svg' alt='download' />
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default ContentLk;
