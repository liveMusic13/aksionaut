import { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAccountManagement } from '../../../hooks/useAccountManagement';
import { useAuth } from '../../../hooks/useAuth';
import { useCheckWidth } from '../../../hooks/useCheckWidth';
import Layout from '../../layout/Layout';
import Button from '../../ui/button/Button';
import InputAuth from '../../ui/input-auth/InputAuth';

import styles from './Auth.module.scss';

const Auth: FC = () => {
	const navigate = useNavigate();
	const { setIsAuth, isAuth } = useAuth();
	const textAuth = 'Авторизуйтесь';
	const textRegistr = 'Зарегистрируйтесь';
	// const textRepass = 'Забыли пароль?';
	const {
		windowSize: { width },
	} = useCheckWidth();
	const isMobile = width <= 425;
	const isTablet = width <= 768.98;
	const [stateForm, setStateForm] = useState<string>(textAuth);
	const [stateInputs, setStateInputs] = useState<{
		email: string;
		password: string;
		repeat_password: string;
	}>({
		email: '',
		password: '',
		repeat_password: '',
	});
	const [isViewInfo, setIsViewInfo] = useState<{
		text: string;
		isView: boolean;
	}>({ text: '', isView: false });
	const {
		mutate_registr,
		isSuccess_registr,
		isError_registr,
		mutate,
		isError,
	} = useAccountManagement();

	useEffect(() => {
		if (isAuth) navigate('/');
	}, [isAuth]);

	const onAuth = () => {
		if (stateInputs.password && stateInputs.email)
			mutate({
				data: {
					username: stateInputs.email,
					password: stateInputs.password,
				},
				setIsAuth,
			});
	};

	const onRegistr = () => {
		if (
			stateInputs.password === stateInputs.repeat_password &&
			stateInputs.email &&
			stateInputs.password &&
			stateInputs.repeat_password
		)
			mutate_registr({
				email: stateInputs.email,
				password: stateInputs.password,
			});
	};

	const repeatError = () => {
		if (isViewInfo.text === 'Ошибка регистрации') {
			setStateForm(textAuth);
		} else {
			setStateForm(textRegistr);
		}
		setIsViewInfo(prev => ({ ...prev, isView: false }));
	};

	const onChange = (e: ChangeEvent<HTMLInputElement>, placeholder: string) => {
		if (placeholder === 'E-mail') {
			setStateInputs(prev => ({ ...prev, email: e.target.value }));
		} else if (placeholder === 'Пароль') {
			setStateInputs(prev => ({ ...prev, password: e.target.value }));
		} else if (placeholder === 'Повторите пароль') {
			setStateInputs(prev => ({ ...prev, repeat_password: e.target.value }));
		}
	};

	const onClick = (but: string) => {
		if (but === textRegistr) {
			setStateForm(textAuth);
			setIsViewInfo({ text: '', isView: false });
			setStateInputs({
				email: '',
				password: '',
				repeat_password: '',
			});
		} else if (but === textAuth) {
			setStateForm(textRegistr);
			setIsViewInfo({ text: '', isView: false });
			setStateInputs({
				email: '',
				password: '',
				repeat_password: '',
			});
		}
		// else if (but === textRepass) {
		// 	console.log(but, stateForm);
		// 	setStateForm(textRepass);
		// 	setIsViewInfo({ text: '', isView: false });
		// 	setStateInputs({
		// 		email: '',
		// 		password: '',
		// 		repeat_password: '',
		// 	});
		// }
	};
	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		onClick((e.target as HTMLButtonElement).innerText);
	};

	useEffect(() => {
		if (isError_registr) {
			setIsViewInfo({ text: 'Ошибка регистрации', isView: true });
		} else if (isError) {
			setIsViewInfo({ text: 'Ошибка авторизации', isView: true });
		} else if (isSuccess_registr) {
			setStateInputs({ email: '', password: '', repeat_password: '' });
			setIsViewInfo({ text: 'Регистрация прошла успешно!', isView: true });
		}
	}, [isSuccess_registr, isError_registr, isError]);

	return (
		<Layout
			style={{
				backgroundImage: 'url("/images/backgrounds/intro.jpg")',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				position: isMobile ? undefined : 'relative',
				flexDirection: isMobile ? 'column' : undefined,
				// alignItems: isMobile ? 'center' : undefined,
			}}
		>
			<img
				src='/images/icons/logo_error.svg'
				alt='logo'
				className={styles.image}
			/>
			<div className={styles.block__auth}>
				<h1 className={styles.title}>
					{stateForm === textAuth
						? 'Регистрация'
						: stateForm === textRegistr
							? 'Вход'
							: 'Восстановление пароля'}
				</h1>
				{/* {stateForm === textRepass && (
					<p className={styles.description}>
						Введите e-mail, который вы использовали при регистрации и мы вышлем
						инструкции по восстановлению пароля
					</p>
				)} */}
				<div className={styles.form}>
					{isViewInfo.isView &&
					(stateForm === textAuth || stateForm === textRegistr) ? (
						<>
							<p className={styles.description}>{isViewInfo.text}</p>
							{(isViewInfo.text === 'Ошибка регистрации' ||
								isViewInfo.text === 'Ошибка авторизации') && (
								<button onClick={repeatError} className={styles.button}>
									Попробуйте ещё раз.
								</button>
							)}
						</>
					) : (
						<>
							<InputAuth
								type='text'
								value={stateInputs.email}
								placeholder='E-mail'
								onChange={onChange}
							/>
							{/* {stateForm !== textRepass && ( */}
							<InputAuth
								type='password'
								value={stateInputs.password}
								placeholder='Пароль'
								onChange={onChange}
							/>
							{/* )} */}
							{stateForm === textAuth && (
								<InputAuth
									type='password'
									value={stateInputs.repeat_password}
									placeholder='Повторите пароль'
									onChange={onChange}
								/>
							)}
							<Button
								style={{
									width: '100%',
									height: isMobile
										? 'calc(51/390*100vw)'
										: isTablet
											? 'calc(40/768*100vw)'
											: undefined,
									marginTop: 'calc(46/1920*100vw)',
								}}
								onClick={stateForm === textAuth ? onRegistr : onAuth}
							>
								{/* {stateForm === textRepass ? 'Отправить' : 'Войти'} */}
								Войти
							</Button>
						</>
					)}
				</div>
				<div className={styles.block__buttons}>
					{/* {stateForm !== textAuth && stateForm !== textRepass && (
						<button onClick={handleClick} className={styles.button}>
							{textRepass}
						</button>
					)} */}
					{/* {stateForm !== textRepass && ( */}
					<button onClick={handleClick} className={styles.button}>
						{stateForm}
					</button>
					{/* )} */}
				</div>
			</div>
		</Layout>
	);
};

export default Auth;
