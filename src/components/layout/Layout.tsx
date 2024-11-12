import { FC } from 'react';

import { ILayoutProps } from '../../types/props.types';

import styles from './Layout.module.scss';

const Layout: FC<ILayoutProps> = ({ children, style }) => {
	return (
		<div className={styles.wrapper} style={style}>
			{children}
		</div>
	);
};

export default Layout;
