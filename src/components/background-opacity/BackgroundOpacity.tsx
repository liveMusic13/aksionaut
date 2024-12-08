import { Dispatch, FC, SetStateAction } from 'react';

import { useDownloadStore } from '../../store/store';

import styles from './BackgroundOpacity.module.scss';

const BackgroundOpacity: FC<{
	setIsViewChat?: Dispatch<SetStateAction<boolean>>;
}> = ({ setIsViewChat }) => {
	const setIsViewDownload = useDownloadStore(store => store.setIsViewDownload);

	const onClick = () => {
		setIsViewDownload(false);
		if (setIsViewChat) setIsViewChat(false);
	};

	return <div className={styles.opacity} onClick={onClick}></div>;
};

export default BackgroundOpacity;
