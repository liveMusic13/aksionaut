import { FC } from 'react';

import { useGetAllRegions } from '../../../hooks/useGetAllRegions';
import { useRegionStore, useViewFilters } from '../../../store/store';
import Checkbox from '../../ui/checkbox/Checkbox';
import BlockButtons from '../block-buttons/BlockButtons';

import styles from './RegionBlock.module.scss';

const RegionBlock: FC = () => {
	const setIsFilter = useViewFilters(store => store.setIsFilter);
	const region = useRegionStore(store => store.region);
	const { data: regions } = useGetAllRegions();
	const dataAllRegions = regions && regions.regions;
	const setRegionState = useRegionStore(store => store.setRegion);

	const onClick = () => setIsFilter(1, false);
	// Обработчик для чекбоксов
	const onChange = (name: string) => {
		setRegionState(prev => {
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
		<div className={styles.block__region}>
			<div className={styles.block__title}>
				<div className={styles.title_and_button}>
					<button className={styles.arrow__back} onClick={onClick}>
						<img src='/images/icons/arrow_back.svg' alt='arrow' />
					</button>
					<h2 className={styles.title}>Регион</h2>
				</div>
				<button className={styles.exit} onClick={onClick}>
					<img src='/images/icons/exit.svg' alt='exit' />
				</button>
			</div>
			<p className={styles.description}>Выберите не более 2 регионов</p>

			<div className={styles.block__checkboxes}>
				{dataAllRegions?.map(box => (
					<Checkbox
						key={box.id}
						checkbox={box}
						onChange={() => onChange(box.name)}
						isCheck={region.includes(box.name)}
					/>
				))}
			</div>
			<BlockButtons />
		</div>
	);
};

export default RegionBlock;
