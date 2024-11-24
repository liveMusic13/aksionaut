import { ChangeEvent, FC, useCallback, useState } from 'react';

import { arrPopularQueries } from '../../data/popular.data';
import { useFilterFinalData } from '../../hooks/useFilterFinalData';
import { useGetAllRegions } from '../../hooks/useGetAllRegions';
import { getEstimateForRequest } from '../../utils/editRequestData';
import Button from '../ui/button/Button';
import Calendar from '../ui/calendar/Calendar';
import Input from '../ui/input/Input';
import Select from '../ui/select/Select';

import styles from './Filters.module.scss';

const Filters: FC = () => {
	const [value, setValue] = useState<string>('');

	const onChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
		[],
	);

	const { finalData: data } = useFilterFinalData();
	// const { data, error, isSuccess, refetch, isError, data_grl, data_ukaz } =
	// 	useEstimateData();
	const { data: regions, isSuccess: isSuccess_regions } = useGetAllRegions();

	const dataAllRegions = regions && regions.regions;
	const dataEstimate = data && getEstimateForRequest(data);

	return (
		<div className={styles.wrapper_filters}>
			<h2 className={styles.title}>Узнайте ценности россиян с помощью ИИ</h2>
			<p className={styles.forExample}>Например:</p>
			<div className={styles.popular__queries}>
				{arrPopularQueries.map(quer => (
					<p key={quer.id} className={styles.queries}>
						{quer.name}
					</p>
				))}
			</div>
			<div className={styles.block__aiInput}>
				<Input
					placeholder='Задайте вопрос...'
					value={value}
					onChange={onChange}
				/>
				<Button
					style={{
						fontSize: '1rem',
						width: 'calc(125/1920*100vw)',
						height: 'calc(52/1920*100vw)',
					}}
				>
					Спросить
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
		</div>
	);
};

export default Filters;
