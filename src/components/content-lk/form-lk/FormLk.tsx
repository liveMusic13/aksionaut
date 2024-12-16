import { ChangeEvent, FC, useCallback, useState } from 'react';

import { useCheckWidth } from '../../../hooks/useCheckWidth';
import Button from '../../ui/button/Button';
import InputAuth from '../../ui/input-auth/InputAuth';

import styles from './FormLk.module.scss';

const FormLk: FC = () => {
	const {
		windowSize: { width },
	} = useCheckWidth();
	const isMobile = width <= 451;
	const isTablet = width <= 768.98;
	const [stateInputs, setStateInputs] = useState<{
		email: string;
		password: string;
		repeat_password: string;
		old_password: string;
	}>({
		email: '',
		password: '',
		repeat_password: '',
		old_password: '',
	});
	const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

	const onChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>, placeholder: string) => {
			if (placeholder === 'Введите новый e-mail') {
				setStateInputs(prev => ({ ...prev, email: e.target.value }));
			} else if (placeholder === 'Новый пароль') {
				setStateInputs(prev => ({ ...prev, password: e.target.value }));
			} else if (placeholder === 'Старый пароль') {
				setStateInputs(prev => ({ ...prev, old_password: e.target.value }));
			} else if (placeholder === 'Повторите новый пароль') {
				setStateInputs(prev => ({ ...prev, repeat_password: e.target.value }));
			}
		},
		[stateInputs],
	);

	return (
		<div className={styles.block__form}>
			<div className={styles.block__title}>
				<h2 className={styles.title}>Смена e-mail</h2>
				<InputAuth
					onChange={onChange}
					value={stateInputs.email}
					type='text'
					placeholder='Введите новый e-mail'
					validateEmail={true}
					isEmailValid={isEmailValid}
					setIsEmailValid={setIsEmailValid}
					style={{
						width: isTablet
							? `calc(371/${width}*100vw)`
							: 'calc(371/1920*100vw)',
					}}
				/>
			</div>
			<div className={styles.block__title}>
				<h2 className={styles.title}>Смена пароля</h2>
				<InputAuth
					onChange={onChange}
					value={stateInputs.old_password}
					type='password'
					placeholder='Старый пароль'
					style={{
						width: isTablet
							? `calc(371/${width}*100vw)`
							: 'calc(371/1920*100vw)',
						marginBottom: `calc(16/${width}*100vw)`,
					}}
				/>
				<InputAuth
					onChange={onChange}
					value={stateInputs.password}
					type='password'
					placeholder='Новый пароль'
					style={{
						width: isTablet
							? `calc(371/${width}*100vw)`
							: 'calc(371/1920*100vw)',
						marginBottom: `calc(16/${width}*100vw)`,
					}}
				/>
				<InputAuth
					onChange={onChange}
					value={stateInputs.repeat_password}
					type='password'
					placeholder='Повторите новый пароль'
					style={{
						width: isTablet
							? `calc(371/${width}*100vw)`
							: 'calc(371/1920*100vw)',
					}}
				/>
			</div>
			{((stateInputs.email && isEmailValid) ||
				(stateInputs.password &&
					stateInputs.old_password &&
					stateInputs.repeat_password &&
					stateInputs.password === stateInputs.repeat_password)) && (
				<div className={styles.block__saveEditing}>
					<p>
						После сохранения изменений e-mail и/или пароля вы будете
						перенаправлены на страницу входа
					</p>
					<Button
						disabled={true}
						style={{
							width: 'calc(221/1920*100vw)',
						}}
					>
						{/* Сохранить изменения */}В разработке
					</Button>
				</div>
			)}
		</div>
	);
};

export default FormLk;
