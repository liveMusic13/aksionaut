import { FC, useState } from 'react';

import { IInputAuth } from '../../../types/props.types';

import styles from './InputAuth.module.scss';

const InputAuth: FC<IInputAuth> = ({ type, value, onChange, placeholder }) => {
	const [isViewPass, setIsViewPass] = useState<boolean>(false);
	const onViewPass = () => {
		if (placeholder !== '') setIsViewPass(!isViewPass);
	};

	return (
		<div className={styles.block__input}>
			<input
				placeholder={placeholder}
				type={isViewPass ? type : 'text'}
				value={value}
				onChange={e => onChange(e, placeholder)}
				className={styles.input}
			/>
			{type === 'password' && (
				<button className={styles.image} onClick={onViewPass}>
					<img src='/images/icons/viewPass.svg' alt='icon-pass' />
				</button>
			)}
		</div>
	);
};

export default InputAuth;
