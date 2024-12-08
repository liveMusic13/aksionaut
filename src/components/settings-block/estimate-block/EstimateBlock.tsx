import { FC, useState } from 'react';

import { estimateArr } from '../../../data/selects.data';
import { useFilterFinalData } from '../../../hooks/useFilterFinalData';
import {
	useActiveEstimateStore,
	useEstimateStore,
	useSettingsStore,
	useViewFilters,
} from '../../../store/store';
import { getEstimateForRequest } from '../../../utils/editRequestData';
import Checkbox from '../../ui/checkbox/Checkbox';
import BlockButtons from '../block-buttons/BlockButtons';

import styles from './EstimateBlock.module.scss';

const EstimateBlock: FC = () => {
	const setIsFilter = useViewFilters(store => store.setIsFilter);
	const setIsSettings = useSettingsStore(store => store.setIsSettings);
	const { finalData: data } = useFilterFinalData();
	const dataEstimate = data && getEstimateForRequest(data);
	const estimate = useEstimateStore(store => store.estimate);
	const setEstimateState = useEstimateStore(store => store.setEstimate);
	const [arrIsViewCheckbox, setArrIsViewCheckbox] = useState<boolean[]>([
		false,
		false,
		false,
	]);
	const setActiveButton = useActiveEstimateStore(
		store => store.setActiveButton,
	);

	const moveCheck = (ind: number) => {
		setArrIsViewCheckbox(prev =>
			prev.map((item, index) => (index === ind ? !item : false)),
		);

		if (ind === 0) {
			setActiveButton('ЧГЧ');
		} else if (ind === 1) {
			setActiveButton('ГРЛ');
		} else if (ind === 2) {
			setActiveButton('809');
		}
	};

	const onClick = () => {
		setIsSettings(false);
		setIsFilter(0, false);
		setIsFilter(1, false);
		setIsFilter(2, false);
	};
	// Обработчик для чекбоксов
	const onChange = (name: string) => {
		setEstimateState(prev => {
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

	return (
		<div className={styles.block__estimate}>
			<div className={styles.block__title}>
				<div className={styles.title_and_button}>
					<button className={styles.arrow__back} onClick={onClick}>
						<img src='/images/icons/arrow_back.svg' alt='arrow' />
					</button>
					<h2 className={styles.title}>Ценности</h2>
				</div>
				<button className={styles.exit} onClick={onClick}>
					<img src='/images/icons/exit.svg' alt='exit' />
				</button>
			</div>
			<p className={styles.description}>Выберите не более 2 ценностей</p>
			<div className={styles.content}>
				{estimateArr.map((est, ind) => (
					<div key={est.id} className={styles.block__dataEstimates}>
						<div
							className={styles.dataEstimates__title}
							onClick={() => moveCheck(ind)}
						>
							<h3>
								{est.name}
								<span> ({est.count})</span>
							</h3>
							<img
								src='/images/icons/arrow_bot.svg'
								alt='arrow'
								className={`${styles.arrow__title} ${arrIsViewCheckbox[ind] ? styles.active : ''}`}
							/>
						</div>
						{arrIsViewCheckbox[ind] && (
							<div className={styles.block__checkboxes}>
								{dataEstimate?.map(box => (
									<Checkbox
										key={box.id}
										checkbox={box}
										onChange={() => onChange(box.name)}
										isCheck={estimate.includes(box.name)}
									/>
								))}
							</div>
						)}
					</div>
				))}
			</div>
			<BlockButtons />
		</div>
	);
};

export default EstimateBlock;
