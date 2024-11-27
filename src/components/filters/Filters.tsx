import { ChangeEvent, FC, useCallback, useState } from 'react';

import { arrPopularQueries } from '../../data/popular.data';
import { useCheckWidth } from '../../hooks/useCheckWidth';
import { useFilterFinalData } from '../../hooks/useFilterFinalData';
import { useGetAllRegions } from '../../hooks/useGetAllRegions';
import { useRegionStore } from '../../store/store';
import { getEstimateForRequest } from '../../utils/editRequestData';
import Button from '../ui/button/Button';
import Calendar from '../ui/calendar/Calendar';
import Input from '../ui/input/Input';
import SelectMobile from '../ui/select-mobile/SelectMobile';
import Select from '../ui/select/Select';

import styles from './Filters.module.scss';

const Filters: FC = () => {
	const [value, setValue] = useState<string>('');
	const { windowSize } = useCheckWidth();
	const region = useRegionStore(store => store.region);
	const isMobile = windowSize.width <= 425;
	const itemsToDisplay = (length: number, width: number): number => {
		return width <= 425 ? 3 : length;
	};

	const onChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
		[],
	);

	const { finalData: data } = useFilterFinalData();
	const { data: regions } = useGetAllRegions();

	const dataAllRegions = regions && regions.regions;
	const dataEstimate = data && getEstimateForRequest(data);

	return (
		<div className={styles.wrapper_filters}>
			{!(region.length > 0) ? (
				<>
					<h2 className={styles.title}>
						Узнайте ценности россиян с помощью ИИ
					</h2>
					<p className={styles.forExample}>Например:</p>
					<div className={styles.popular__queries}>
						{arrPopularQueries
							.slice(
								0,
								itemsToDisplay(arrPopularQueries.length, windowSize.width),
							)
							.map(quer => (
								<p key={quer.id} className={styles.queries}>
									{quer.name}
								</p>
							))}
					</div>
				</>
			) : null}
			<div className={styles.block__aiInput}>
				<Input
					placeholder='Задайте вопрос...'
					value={value}
					onChange={onChange}
				/>
				<Button
					style={{
						fontSize: '1rem',
						width: isMobile ? 'calc(48/390*100vw)' : 'calc(125/1920*100vw)',
						height: isMobile ? 'calc(48/390*100vw)' : 'calc(52/1920*100vw)',
					}}
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
