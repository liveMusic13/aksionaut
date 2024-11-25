import { useMemo } from 'react';

import { useActiveEstimateStore } from '../store/store';

import { useEstimateData } from './useEstimateData';

export const useFilterFinalData = () => {
	const { data, isError, data_grl, data_ukaz } = useEstimateData();
	const activeButton = useActiveEstimateStore(store => store.activeButton);
	const finalData = useMemo(() => {
		// console.log(activeButton);
		if (activeButton === 'ГРЛ') {
			return data_grl;
		} else if (activeButton === 'ЧГЧ') {
			return data;
		} else if (activeButton === '809') {
			return data_ukaz;
		} else {
			return { values: [] };
		}
	}, [data, data_grl, data_ukaz, activeButton]);

	return { finalData, isError };
};
