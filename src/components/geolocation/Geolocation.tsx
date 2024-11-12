import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';

import { otherService } from '../../services/other.service';
import { ILocationData } from '../../types/requests.types';

import styles from './Geolocation.module.scss';

const Geolocation: FC = () => {
	const { data, isError, isSuccess } = useQuery({
		queryKey: ['location'],
		queryFn: () => {
			return new Promise<ILocationData>((resolve, reject) => {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(
						async (position: GeolocationPosition) => {
							try {
								const response = await otherService.getLocation(position);
								resolve(response.data); // Возвращаем данные
							} catch (error) {
								reject(error); // Обрабатываем ошибку
							}
						},
						error => reject(error),
					);
				} else {
					console.log('Geolocation is not supported by this browser.');
					reject(new Error('Geolocation not supported'));
				}
			});
		},
		staleTime: 100 * 60 * 1000, // кэширование на 100 минут
	});

	return (
		<div className={styles.block__location}>
			<img src='/images/icons/location.svg' alt='location' />
			{isSuccess ? <p>{data.locality}</p> : <p>Не определен</p>}
		</div>
	);
};

export default Geolocation;
