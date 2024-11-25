import { $axios } from '../api';
import {
	IAllRegions,
	IFullEstimateData,
	ITopEstimateInCountry,
} from '../types/requests.types';

export const regionsService = {
	getData: async (): Promise<{ values: IFullEstimateData[] }> => {
		const { data } = await $axios.get('/data_by_cennosti/');
		return data;
	},
	getDataGrl: async (): Promise<{ values: IFullEstimateData[] }> => {
		const { data } = await $axios.get('/data_by_cennosti_GRL');
		return data;
	},
	getDataUkaz: async (): Promise<{ values: IFullEstimateData[] }> => {
		const { data } = await $axios.get('/data_by_cennosti_ukaz');
		return data;
	},
	getAllRegions: async (): Promise<{ regions: IAllRegions[] }> => {
		const { data } = await $axios.get('/regions');
		return data;
	},
	getTopEstimateInCountry: async (): Promise<{
		cennosti_by_all_period_regions: ITopEstimateInCountry[];
	}> => {
		const { data } = await $axios.get('/cennosti_by_all_period_regions');
		return data;
	},
};
