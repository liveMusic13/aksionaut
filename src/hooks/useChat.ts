import { useCallback, useEffect, useState } from 'react';

import { useMessagesStore } from '../store/store';

import { useGetUserId } from './useGetUserId';
import { useSendMessage } from './useSendMessage';

export const useChat = () => {
	const [inputValue, setInputValue] = useState('');
	const { messages, addMessage, updateLastMessage } = useMessagesStore(); // Zustand-хранилище
	const { data: user_id } = useGetUserId();
	const { mutate, data: response, isPending } = useSendMessage(); // Отправка запроса на сервер

	// Обработчик изменения инпута
	const onChangeInput = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setInputValue(e.target.value);
		},
		[],
	);

	// Обработчик отправки сообщения
	const sendMessage = useCallback(
		(message: string) => {
			if (!message.trim()) return;

			const time = new Date().toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
			});

			// Добавляем сообщение от пользователя
			addMessage({
				text: message,
				time,
				isFromServer: false,
			});

			// Добавляем заглушку от сервера
			addMessage({
				text: 'Ваш запрос обрабатывается...',
				time,
				isFromServer: true,
			});

			// Отправляем запрос на сервер
			mutate({ valueInput: message, user_id });
			setInputValue('');
		},
		[addMessage, mutate, user_id],
	);

	// Обновляем последнее сообщение при успешном ответе
	useEffect(() => {
		if (response) {
			const time = new Date().toLocaleTimeString([], {
				hour: '2-digit',
				minute: '2-digit',
			});

			updateLastMessage({
				text: response.data.value,
				time,
				isFromServer: true,
			});
		}
	}, [response, updateLastMessage]);

	return {
		inputValue,
		setInputValue,
		onChangeInput,
		sendMessage,
		messages,
		isPending,
	};
};
