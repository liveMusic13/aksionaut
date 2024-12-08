import { FC } from 'react';

import { IButtonProps } from '../../../types/props.types';

import styles from './Button.module.scss';

const Button: FC<IButtonProps> = ({ children, onClick, style, disabled }) => {
	return (
		<button
			className={styles.button}
			style={style}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
