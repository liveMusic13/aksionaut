import { FC, useEffect, useRef, useState } from 'react';

import { colors } from '../../../app.constants';
import { ISelect } from '../../../types/props.types';
import Checkbox from '../checkbox/Checkbox';

import styles from './Select.module.scss';

const Select: FC<ISelect> = ({ data, title, isEstimate }) => {
	const [isViewOptions, setIsViewOptions] = useState<boolean>(false);
	const [searchTerm, setSearchTerm] = useState<string>('');

	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

	const inputRef = useRef<HTMLInputElement>(null);

	// const onChange = (
	// 	setValue: Dispatch<SetStateAction<boolean>>,
	// 	value: boolean,
	// ) => setValue(!value);

	const onChange = (name: string) => {
		setSelectedOptions(prev => {
			if (prev.includes(name)) {
				// Если значение уже выбрано, убираем его из массива
				return prev.filter(item => item !== name);
			} else if (prev.length < 2) {
				// Если выбрано меньше 2 значений, добавляем новое
				return [...prev, name];
			}
			return prev; // Если уже 2 значения выбрано, ничего не делаем
		});
	};

	const onClick = () => setIsViewOptions(!isViewOptions);

	useEffect(() => {
		if (!isViewOptions && inputRef.current) {
			inputRef.current.blur();
		}
	}, [isViewOptions]);

	// Обновляем значение поля input, объединяя выбранные значения через запятую
	useEffect(() => {
		if (!isEstimate && inputRef.current) {
			inputRef.current.value = selectedOptions.join(', ');
		}
	}, [selectedOptions, isEstimate]);

	const styleWrapper = isViewOptions
		? {
				backgroundColor: 'rgba(255,255,255, 0.08)',
				borderColor: colors.white,
			}
		: {};

	const target = isEstimate ? 'Ценности' : '';

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
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
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
						{filteredData?.map(box => (
							<Checkbox
								key={box.id}
								checkbox={box}
								onChange={() => onChange(box.name)}
								isCheck={selectedOptions.includes(box.name)}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Select;
