import { FC, useEffect, useRef } from 'react';

import { useChat } from '../../hooks/useChat';
import { useCheckWidth } from '../../hooks/useCheckWidth';
import { IChat } from '../../types/props.types';
import Input from '../ui/input/Input';
import Loader from '../ui/loader/Loader';

import styles from './Chat.module.scss';

// const Chat: FC<IChat> = ({ setIsViewChat }) => {
// 	const [valueInput, setValueInput] = useState<string>('');
// 	const onClick = () => setIsViewChat(false);
// 	const onChange = (e: ChangeEvent<HTMLInputElement>) =>
// 		setValueInput(e.target.value);
// 	const { data, isPending, mutate } = useSendMessage();

// 	const chatRef = useRef<HTMLDivElement | null>(null); // Реф для блока чата

// 	// Zustand хранилище
// 	const { messages, addMessage, updateLastMessage } = useMessagesStore();

// 	const handleSendMessage = () => {
// 		if (!valueInput.trim()) return; // Игнорируем пустое сообщение

// 		const time = new Date().toLocaleTimeString([], {
// 			hour: '2-digit',
// 			minute: '2-digit',
// 		});

// 		// Добавляем сообщение пользователя
// 		addMessage({
// 			text: valueInput,
// 			time: time,
// 			isFromServer: false,
// 		});

// 		// Добавляем заглушку "Ваш запрос обрабатывается..."
// 		addMessage({
// 			text: 'Ваш запрос обрабатывается...',
// 			time: time,
// 			isFromServer: true,
// 		});

// 		// Отправляем запрос на сервер
// 		mutate(valueInput);

// 		setValueInput(''); // Очищаем поле ввода
// 	};

// 	// Обновление последнего сообщения при успешном ответе
// 	useEffect(() => {
// 		if (data) {
// 			const time = new Date().toLocaleTimeString([], {
// 				hour: '2-digit',
// 				minute: '2-digit',
// 			});

// 			updateLastMessage({
// 				text: data.data.value,
// 				time: time,
// 				isFromServer: true,
// 			});
// 		}
// 	}, [data]);

// 	// Автоскрол вниз при добавлении сообщений
// 	useEffect(() => {
// 		if (chatRef.current) {
// 			chatRef.current.scrollTop = chatRef.current.scrollHeight;
// 		}
// 	}, [messages]);

// 	return (
// 		<div className={styles.wrapper_chat}>
// 			<button onClick={onClick} className={styles.exit}>
// 				<img src='/images/icons/exit.svg' alt='exit' />
// 			</button>
// 			<div className={styles.block__chat} ref={chatRef}>
// 				{messages.map((message, index) => (
// 					<div
// 						key={index}
// 						className={
// 							message.isFromServer ? styles.message_server : styles.message_user
// 						}
// 					>
// 						<p
// 							className={`${styles.text} ${
// 								message.text === 'Ваш запрос обрабатывается...' && isPending
// 									? styles.loading
// 									: ''
// 							}`}
// 						>
// 							{message.text === 'Ваш запрос обрабатывается...' && isPending
// 								? 'Ваш запрос обрабатывается...'
// 								: message.text}
// 						</p>
// 						{isPending &&
// 						index === messages.length - 1 &&
// 						message.text === 'Ваш запрос обрабатывается...' ? (
// 							<Loader />
// 						) : (
// 							<span className={styles.time}>{message.time}</span>
// 						)}
// 					</div>
// 				))}
// 			</div>
// 			<p className={styles.description}>
// 				Наш ИИ ещё учится, поэтому поиск ответа может занять пару минут.
// 			</p>
// 			<div className={styles.block__panelInput}>
// 				<img
// 					src='/images/icons/astronaut_chat.svg'
// 					alt='astronaut'
// 					className={styles.astronaut}
// 				/>
// 				<Input
// 					styleImage={{ display: 'none' }}
// 					style={{ width: 'calc(715/1920*100vw)' }}
// 					styleLimit={{ right: 'calc(52/1920*100vw)' }}
// 					styleInput={{
// 						paddingLeft: 'calc(16/1920*100vw)',
// 						paddingRight: 'calc(110/1920*100vw)',
// 					}}
// 					placeholder='Задайте вопрос...'
// 					value={valueInput}
// 					onChange={onChange}
// 				/>
// 				<button className={styles.image__send} onClick={handleSendMessage}>
// 					<img src='/images/icons/send_message.svg' alt='send' />
// 				</button>
// 			</div>
// 		</div>
// 	);
// };

const Chat: FC<IChat> = ({ setIsViewChat }) => {
	const {
		windowSize: { width },
	} = useCheckWidth();
	const isMobile = width <= 451;
	const isTablet = width <= 768.98;
	const { inputValue, onChangeInput, sendMessage, messages, isPending } =
		useChat();
	const onClick = () => setIsViewChat(false);

	const chatRef = useRef<HTMLDivElement | null>(null); // Реф для блока чата

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			sendMessage(inputValue);
		}
	};

	// Автоскрол вниз при добавлении сообщений
	useEffect(() => {
		if (chatRef.current) {
			chatRef.current.scrollTop = chatRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<div className={styles.wrapper_chat}>
			<button onClick={onClick} className={styles.exit}>
				<img src='/images/icons/exit.svg' alt='exit' />
			</button>
			<div className={styles.block__chat} ref={chatRef}>
				{messages.map((message, index) => (
					<div
						key={index}
						className={
							message.isFromServer ? styles.message_server : styles.message_user
						}
					>
						<p
							className={`${styles.text} ${
								message.text === 'Ваш запрос обрабатывается...' && isPending
									? styles.loading
									: ''
							}`}
						>
							{message.text === 'Ваш запрос обрабатывается...' && isPending
								? 'Ваш запрос обрабатывается...'
								: message.text}
						</p>
						{isPending &&
						index === messages.length - 1 &&
						message.text === 'Ваш запрос обрабатывается...' ? (
							<Loader />
						) : (
							<span className={styles.time}>{message.time}</span>
						)}
					</div>
				))}
			</div>
			<p className={styles.description}>
				Наш ИИ постоянно обучается, запрос займет некоторое время.
			</p>
			<div className={styles.block__panelInput}>
				<img
					src='/images/icons/astronaut_chat.svg'
					alt='astronaut'
					className={styles.astronaut}
				/>
				<Input
					styleImage={{ display: 'none' }}
					style={{
						width: isTablet
							? 'calc(565/768*100vw)'
							: isMobile
								? 'calc(299/390*100vw)'
								: 'calc(715/1920*100vw)',
					}}
					onKeyDown={handleKeyPress}
					styleLimit={{
						display: 'none',
					}}
					styleInput={{
						paddingLeft: isMobile
							? 'calc(16/390*100vw)'
							: 'calc(16/1920*100vw)',
						paddingRight: isMobile
							? 'calc(52/390*100vw)'
							: 'calc(110/1920*100vw)',
					}}
					placeholder='Задайте вопрос...'
					value={inputValue}
					onChange={onChangeInput}
				/>
				<button
					className={styles.image__send}
					onClick={() => sendMessage(inputValue)}
				>
					<img src='/images/icons/send_message.svg' alt='send' />
				</button>
			</div>
		</div>
	);
};

export default Chat;
