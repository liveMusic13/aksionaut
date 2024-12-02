import { IChartData } from './props.types';

export interface PointType {
	name: string;
	percentage: number;
}

export interface IColumnChart {
	// data: {
	// 	name: string;
	// 	data: number[];
	// 	color: string;
	// }[];
	data: IChartData[] | IChartData[][];
}

export interface IDownloadChart {
	data: IChartData[];
	estimate: string[];
	region: string;
	max_period: string;
}
