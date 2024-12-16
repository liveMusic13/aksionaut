import { FC, useState } from 'react';

import { IInputAuth } from '../../../types/props.types';

import styles from './InputAuth.module.scss';

const isValidEmail = (email: string): boolean => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

const InputAuth: FC<IInputAuth> = ({
	type,
	value,
	onChange,
	placeholder,
	validateEmail,
	isEmailValid,
	setIsEmailValid,
	style,
}) => {
	const [isViewPass, setIsViewPass] = useState<boolean>(false);
	const onViewPass = () => {
		if (placeholder !== '') setIsViewPass(!isViewPass);
	};
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		placeholder: string,
	) => {
		const newValue = e.target.value;
		if (validateEmail && setIsEmailValid) {
			setIsEmailValid(newValue === '' || isValidEmail(newValue));
		}
		onChange(e, placeholder);
	};

	return (
		<div
			className={`${styles.block__input} ${validateEmail && !isEmailValid ? styles.valid_block : ''}`}
			style={style}
		>
			<input
				placeholder={placeholder}
				type={!isViewPass ? type : 'text'}
				value={value}
				onChange={e => handleChange(e, placeholder)}
				className={`${styles.input} ${validateEmail && !isEmailValid ? styles.valid : ''}`}
			/>
			{type === 'password' && (
				<button className={styles.image} onClick={onViewPass}>
					<img
						src={
							!isViewPass
								? '/images/icons/viewPass_not.svg'
								: '/images/icons/viewPass.svg'
						}
						alt='icon-pass'
					/>
				</button>
			)}
			{validateEmail && !isEmailValid && (
				<span className={styles.error}>Введите корректный email</span>
			)}
		</div>
	);
};

export default InputAuth;
