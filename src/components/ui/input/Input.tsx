import { FC } from 'react';

import { IInput } from '../../../types/props.types';

import styles from './Input.module.scss';

const Input: FC<IInput> = ({
	placeholder,
	style,
	value,
	onChange,
	styleInput,
	styleImage,
	styleLimit,
}) => {
	return (
		<div className={styles.block__input} style={style}>
			<img
				style={styleImage}
				src='/images/icons/search.svg'
				alt='search'
				className={styles.img}
			/>
			<input
				style={styleInput}
				placeholder={placeholder}
				type='text'
				className={styles.input}
				value={value}
				onChange={onChange}
			/>
			<p className={styles.limit} style={styleLimit}>
				{value?.length}/200
			</p>
		</div>
	);
};

export default Input;
