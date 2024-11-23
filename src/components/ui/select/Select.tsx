import { FC, useEffect, useRef, useState } from 'react';

import { colors } from '../../../app.constants';
import { useEstimateStore, useRegionStore } from '../../../store/store';
import { ISelect } from '../../../types/props.types';
import Checkbox from '../checkbox/Checkbox';

import styles from './Select.module.scss';

const Select: FC<ISelect> = ({ data, title, isEstimate }) => {
	const [isViewOptions, setIsViewOptions] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [inputValue, setInputValue] = useState<string>('');
	const setEstimateState = useEstimateStore(store => store.setEstimate);
	const estimate = useEstimateStore(store => store.estimate);
	const setRegionState = useRegionStore(store => store.setRegion);
	const region = useRegionStore(store => store.region);

	const inputRef = useRef<HTMLInputElement>(null);

	// Обработчик для чекбоксов
	const onChange = (name: string) => {
		const changeState = isEstimate ? setEstimateState : setRegionState;

		changeState(prev => {
			if (prev.includes(name)) {
				// Убираем выбранный элемент
				return prev.filter(item => item !== name);
			}
			// Добавляем, если меньше 2 элементов
			if (prev.length < 2) {
				return [...prev, name];
			}
			// Если ничего не изменяется, возвращаем prev
			return prev;
		});
	};

	// Обновляем inputValue при изменении выбранных опций
	useEffect(() => {
		if (searchTerm === '') {
			setInputValue(region.join(', '));
		}
	}, [region, searchTerm]);

	// Обработчик изменения значения input
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchTerm(value);
		setInputValue(value); // Синхронизируем inputValue и searchTerm
	};

	// Открытие/закрытие выпадающего списка
	const onClick = () => setIsViewOptions(!isViewOptions);

	// Сброс фокуса и строки поиска при закрытии
	useEffect(() => {
		if (!isViewOptions && inputRef.current) {
			inputRef.current.blur();
			setSearchTerm('');
		}
	}, [isViewOptions]);

	const styleWrapper = isViewOptions
		? {
				backgroundColor: 'rgba(255,255,255, 0.08)',
				borderColor: colors.white,
			}
		: {};

	const target = isEstimate ? 'Ценности' : '';

	// Фильтрация данных на основе поискового запроса
	const filteredData = isEstimate
		? data
		: data?.filter(item =>
				item.name.toLowerCase().includes(searchTerm.toLowerCase()),
			);

	return (
		<div className={styles.wrapper_select} style={styleWrapper}>
			<div className={styles.block__target} onClick={onClick}>
				{isEstimate ? (
					<p className={styles.target}>{target}</p>
				) : (
					<input
						ref={inputRef}
						type='text'
						className={styles.target__input}
						value={inputValue}
						onChange={handleInputChange}
					/>
				)}
				<img
					className={styles.arrow}
					src='/images/icons/arrow_bot.svg'
					alt='arrow'
				/>
			</div>
			{isViewOptions && (
				<div className={styles.block__select}>
					<h2 className={styles.title}>{title}</h2>
					<div className={styles.block__checkboxes}>
						{filteredData?.map(box => {
							const check = isEstimate ? estimate : region;
							return (
								<Checkbox
									key={box.id}
									checkbox={box}
									onChange={() => onChange(box.name)}
									isCheck={check.includes(box.name)}
								/>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
};

export default Select;
