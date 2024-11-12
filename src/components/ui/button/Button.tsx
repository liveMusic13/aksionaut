import { FC } from 'react';

import { IButtonProps } from '../../../types/props.types';

import styles from './Button.module.scss';

const Button: FC<IButtonProps> = ({ children, onClick, style }) => {
	return (
		<button className={styles.button} style={style} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
