import { FC, useEffect, useState } from 'react';

import { arrPopularQueries } from '../../data/popular.data';
import { useChat } from '../../hooks/useChat';
import { useCheckWidth } from '../../hooks/useCheckWidth';
import { useFilterFinalData } from '../../hooks/useFilterFinalData';
import { useGetAllRegions } from '../../hooks/useGetAllRegions';
import { useRegionStore } from '../../store/store';
import { IFilters } from '../../types/props.types';
import { getEstimateForRequest } from '../../utils/editRequestData';
import { getRandomElements } from '../../utils/generateRandomElemInArr';
import Button from '../ui/button/Button';
import Calendar from '../ui/calendar/Calendar';
import Input from '../ui/input/Input';
import SelectMobile from '../ui/select-mobile/SelectMobile';
import Select from '../ui/select/Select';

import styles from './Filters.module.scss';

// const Filters: FC<IFilters> = ({ onClickChat }) => {
// 	const [value, setValue] = useState<string>('');
// 	const { windowSize } = useCheckWidth();
// 	const region = useRegionStore(store => store.region);
// 	const isMobile = windowSize.width <= 425;
// 	const isTablet = windowSize.width <= 768.98;
// 	const itemsToDisplay = (length: number, width: number): number => {
// 		return width <= 768.98 ? 3 : length;
// 	};

// 	const onChange = useCallback(
// 		(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
// 		[],
// 	);

// 	const { finalData: data } = useFilterFinalData();
// 	const { data: regions } = useGetAllRegions();

// 	const dataAllRegions = regions && regions.regions;
// 	const dataEstimate = data && getEstimateForRequest(data);

// 	const { addMessage, updateLastMessage } = useMessagesStore();
// 	const { mutate, data: response_server, isPending } = useSendMessage(); // Хук для отправки сообщений

// 	const handleClick = useCallback(
// 		(inputValue: string = value) => {
// 			if (inputValue.trim()) {
// 				const time = new Date().toLocaleTimeString([], {
// 					hour: '2-digit',
// 					minute: '2-digit',
// 				});

// 				// Добавляем сообщение пользователя
// 				addMessage({
// 					text: inputValue,
// 					time: time,
// 					isFromServer: false,
// 				});

// 				// Добавляем сообщение-заглушку
// 				addMessage({
// 					text: 'Ваш запрос обрабатывается...',
// 					time: time,
// 					isFromServer: true,
// 				});

// 				// Отправляем запрос
// 				mutate(inputValue);
// 			}

// 			onClickChat(); // Открываем чат
// 		},
// 		[value, addMessage, mutate, onClickChat],
// 	);

// 	useEffect(() => {
// 		if (response_server) {
// 			const time = new Date().toLocaleTimeString([], {
// 				hour: '2-digit',
// 				minute: '2-digit',
// 			});

// 			updateLastMessage({
// 				text: response_server?.data.value,
// 				time: time,
// 			});
// 		}
// 	}, [response_server, updateLastMessage]);

// 	// Обработчик для клика на популярные запросы
// 	const handleQueryClick = useCallback(
// 		(query: string) => {
// 			setValue(query); // Устанавливаем значение в Input
// 			handleClick(query); // Отправляем запрос
// 		},
// 		[handleClick],
// 	);

// 	const [randomQueries, setRandomQueries] = useState<
// 		{ id: number; name: string }[]
// 	>([]);
// 	useEffect(() => {
// 		setRandomQueries(getRandomElements(arrPopularQueries, 2));
// 	}, []);

// 	return (
// 		<div className={styles.wrapper_filters}>
// 			{isMobile || isTablet ? (
// 				!(region.length > 0) && (
// 					<>
// 						<h2 className={styles.title}>
// 							Узнайте ценности россиян с помощью ИИ
// 						</h2>
// 						<p className={styles.forExample}>Например:</p>
// 						<div className={styles.popular__queries}>
// 							{arrPopularQueries
// 								.slice(
// 									0,
// 									// itemsToDisplay(arrPopularQueries.length, windowSize.width),
// 									2,
// 								)
// 								.map(quer => (
// 									<p
// 										key={quer.id}
// 										className={styles.queries}
// 										onClick={() => handleQueryClick(quer.name)}
// 									>
// 										{quer.name}
// 									</p>
// 								))}
// 						</div>
// 					</>
// 				)
// 			) : (
// 				<>
// 					<h2 className={styles.title}>
// 						Узнайте ценности россиян с помощью ИИ
// 					</h2>
// 					<p className={styles.forExample}>Например:</p>
// 					<div className={styles.popular__queries}>
// 						{randomQueries
// 							// .slice(
// 							// 	0,
// 							// 	itemsToDisplay(arrPopularQueries.length, windowSize.width),
// 							// )
// 							.map(quer => (
// 								<p
// 									key={quer.id}
// 									className={styles.queries}
// 									onClick={() => handleQueryClick(quer.name)}
// 								>
// 									{quer.name}
// 								</p>
// 							))}
// 					</div>
// 				</>
// 			)}
// 			<div className={styles.block__aiInput}>
// 				<Input
// 					placeholder='Задайте вопрос...'
// 					value={value}
// 					onChange={onChange}
// 				/>
// 				<Button
// 					style={{
// 						fontSize: '1rem',
// 						width: isMobile
// 							? 'calc(48/390*100vw)'
// 							: isTablet
// 								? 'calc(125/768*100vw)'
// 								: 'calc(125/1920*100vw)',
// 						height: isMobile
// 							? 'calc(48/390*100vw)'
// 							: isTablet
// 								? 'calc(52/768*100vw)'
// 								: 'calc(52/1920*100vw)',
// 					}}
// 					// onClick={handleClick}
// 					onClick={() => handleClick()}
// 				>
// 					{isMobile ? (
// 						<img src='/images/icons/search_two.svg' alt='search' />
// 					) : (
// 						'Спросить'
// 					)}
// 				</Button>
// 			</div>
// 			<div className={styles.block__selects}>
// 				<Select
// 					data={dataEstimate}
// 					title='Выберите не более 2 ценностей индекса'
// 					isEstimate={true}
// 				/>
// 				<Select
// 					data={dataAllRegions}
// 					title='Выберите не более 2 регионов'
// 					isEstimate={false}
// 				/>
// 				<Calendar />
// 			</div>
// 			<SelectMobile />
// 		</div>
// 	);
// };

const Filters: FC<IFilters> = ({ onClickChat }) => {
	const { inputValue, setInputValue, onChangeInput, sendMessage } = useChat();

	const { windowSize } = useCheckWidth();
	const region = useRegionStore(store => store.region);
	const isMobile = windowSize.width <= 425;
	const isTablet = windowSize.width <= 768.98;

	const handleQueryClick = (query: string) => {
		setInputValue(query); // Устанавливаем значение в Input
		sendMessage(query); // Отправляем запрос
		onClickChat(); // Открываем чат
	};

	const { finalData: data } = useFilterFinalData();
	const { data: regions } = useGetAllRegions();

	const dataAllRegions = regions && regions.regions;
	const dataEstimate = data && getEstimateForRequest(data);

	const [randomQueries, setRandomQueries] = useState<
		{ id: number; name: string }[]
	>([]);
	useEffect(() => {
		setRandomQueries(getRandomElements(arrPopularQueries, 2));
	}, []);

	return (
		<div className={styles.wrapper_filters}>
			{isMobile || isTablet ? (
				!(region.length > 0) && (
					<>
						<h2 className={styles.title}>
							Узнайте ценности россиян с помощью ИИ
						</h2>
						<p className={styles.forExample}>Например:</p>
						<div className={styles.popular__queries}>
							{arrPopularQueries
								.slice(
									0,
									// itemsToDisplay(arrPopularQueries.length, windowSize.width),
									2,
								)
								.map(quer => (
									<p
										key={quer.id}
										className={styles.queries}
										onClick={() => handleQueryClick(quer.name)}
									>
										{quer.name}
									</p>
								))}
						</div>
					</>
				)
			) : (
				<>
					<h2 className={styles.title}>
						Узнайте ценности россиян с помощью ИИ
					</h2>
					<p className={styles.forExample}>Например:</p>
					<div className={styles.popular__queries}>
						{randomQueries
							// .slice(
							// 	0,
							// 	itemsToDisplay(arrPopularQueries.length, windowSize.width),
							// )
							.map(quer => (
								<p
									key={quer.id}
									className={styles.queries}
									onClick={() => handleQueryClick(quer.name)}
								>
									{quer.name}
								</p>
							))}
					</div>
				</>
			)}
			<div className={styles.block__aiInput}>
				<Input
					placeholder='Задайте вопрос...'
					value={inputValue}
					onChange={onChangeInput}
				/>
				<Button
					style={{
						fontSize: '1rem',
						width: isMobile
							? 'calc(48/390*100vw)'
							: isTablet
								? 'calc(125/768*100vw)'
								: 'calc(125/1920*100vw)',
						height: isMobile
							? 'calc(48/390*100vw)'
							: isTablet
								? 'calc(52/768*100vw)'
								: 'calc(52/1920*100vw)',
					}}
					onClick={() => handleQueryClick(inputValue)}
				>
					{isMobile ? (
						<img src='/images/icons/search_two.svg' alt='search' />
					) : (
						'Спросить'
					)}
				</Button>
			</div>
			<div className={styles.block__selects}>
				<Select
					data={dataEstimate}
					title='Выберите не более 2 ценностей индекса'
					isEstimate={true}
				/>
				<Select
					data={dataAllRegions}
					title='Выберите не более 2 регионов'
					isEstimate={false}
				/>
				<Calendar />
			</div>
			<SelectMobile />
		</div>
	);
};

export default Filters;
