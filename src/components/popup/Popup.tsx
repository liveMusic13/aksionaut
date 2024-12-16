import { FC } from 'react';

import { useIsHistoryPopupStore } from '../../store/store';

import styles from './Popup.module.scss';

const Popup: FC = () => {
	const { setIsViewPopup, text } = useIsHistoryPopupStore(store => store);
	return (
		<div className={styles.block__popup}>
			<button onClick={() => setIsViewPopup(false, '')}>
				<img src='/images/icons/exit.svg' alt='exit' />
			</button>
			<p>{text}</p>
		</div>
	);
};

export default Popup;
