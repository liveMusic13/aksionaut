export interface PointType {
	name: string;
	percentage: number;
}

export interface IColumnChart {
	data: {
		name: string;
		data: number[];
		color: string;
	}[];
}
