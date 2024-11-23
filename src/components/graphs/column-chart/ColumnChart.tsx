import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import { FC, useMemo } from 'react';

import { colors } from '../../../app.constants';
import { arr_month_full } from '../../../data/calendar.data';
import { useCalendar } from '../../../hooks/useCalendar';
import { useCheckWidth } from '../../../hooks/useCheckWidth';
import {
	useCalendarStore,
	useEstimateStore,
	useRegionStore,
} from '../../../store/store';
import { IColumnChart } from '../../../types/graph.types';

HighchartsAccessibility(Highcharts);

const ColumnChart: FC<IColumnChart> = ({ data }) => {
	const { windowSize } = useCheckWidth();
	const selectedRange = useCalendarStore(store => store.selectedRange);
	const region = useRegionStore(store => store.region);
	const estimate = useEstimateStore(store => store.estimate);
	const { getSelectedMonths } = useCalendar();

	const widthGraph = (356 / 1920) * windowSize.width;
	const heightGraph = (303 / 1920) * windowSize.width;

	const options = useMemo(
		() => ({
			chart: {
				type: 'column',
				backgroundColor: 'transparent',
				height: heightGraph, // Устанавливаем фиксированную высоту
				width: widthGraph,
			},
			title: {
				text: null,
			},
			subtitle: {
				text: null,
			},
			xAxis: {
				categories: getSelectedMonths(arr_month_full, selectedRange),
				crosshair: true,
				accessibility: {
					description: 'Countries',
				},
				// Скрыть линии сетки по оси x
				gridLineWidth: 0,
				lineWidth: 0, // скрыть основную линию оси x
				labels: {
					style: {
						color: colors.white,
						fontSize: '0.6875rem',
					},
				},
			},
			yAxis: {
				min: null,
				title: {
					text: null,
				},
				labels: {
					enabled: false,
				},
				// Скрыть линии сетки по оси x
				gridLineWidth: 0,
				lineWidth: 0, // скрыть основную линию оси x
			},
			plotOptions: {
				colors: ['rgba(255,255,255, 0.8)', '#A2BFF5'],
				column: {
					pointPadding: 0.2,
					borderWidth: 0,
					borderRadius: '50%', // добавляем border-radius для колонок
				},
			},
			legend: {
				enabled: data.length === 1 ? false : data.length === 2 ? true : true,
				itemStyle: {
					color: colors.white,
					fontSize: '0.875rem',
				},
				symbolHeight: 0,
				symbolWidth: 0,
				symbolRadius: 0,
				// squareSymbol: false,
				useHTML: true,
				labelFormatter: function (this: { color: string; name: string }) {
					return `<span style="display: inline-block; margin-bottom: calc(2/1920*100vw); width: calc(10/1920*100vw); height: calc(4/1920*100vw); background-color: ${this.color}; border-radius: calc(3/1920*100vw); vertical-align: middle;"></span> ${this.name}`;
				},
			},
			series: data,
		}),
		[data, selectedRange, region, estimate],
	);

	return (
		<HighchartsReact
			highcharts={Highcharts}
			options={options}
			containerProps={{
				style: { width: '100%' },
			}}
		/>
	);
};

export default ColumnChart;
