import { IChartData } from '../types/props.types';

export const editDataColors = (
	data: IChartData[],
	colOne: string,
	colTwo: string,
): IChartData[] => {
	return data.map((el, ind) => {
		if (ind === 0) {
			return { ...el, color: colOne };
		} else if (ind === 1) {
			return { ...el, color: colTwo };
		}
		return el;
	});
};
