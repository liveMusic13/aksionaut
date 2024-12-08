import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import { FC, useMemo } from 'react';

import { colors } from '../../../app.constants';
import { arr_month_full } from '../../../data/calendar.data';
import { useCalendar } from '../../../hooks/useCalendar';
import { useCheckWidth } from '../../../hooks/useCheckWidth';
import { useCalendarStore } from '../../../store/store';
import { IDownloadChart } from '../../../types/graph.types';
import { editDataColors } from '../../../utils/editDataColor';
import { truncateDescriptionArrStrings } from '../../../utils/egitText';

HighchartsAccessibility(Highcharts);

const DownloadChart: FC<IDownloadChart> = ({
	data,
	estimate,
	max_period,
	region,
}) => {
	const newData = useMemo(
		() => editDataColors(data, '#527AC7', '#A2BFF5'),
		[data],
	);
	const selectedRange = useCalendarStore(store => store.selectedRange);
	const { windowSize } = useCheckWidth();
	const isMobile = windowSize.width <= 451;
	const isTablet = windowSize.width <= 768;
	const isMiddlePk = windowSize.width <= 1500;

	const widthGraphMiddlePk = (563 / 1500) * windowSize.width;
	const heightGraphMiddlePk = (530 / 1500) * windowSize.width;

	const widthGraph = (763 / 1920) * windowSize.width;
	const heightGraph = (430 / 1920) * windowSize.width;

	const widthGraphMobile = (351 / 390) * windowSize.width;
	const heightGraphMobile = (455 / 390) * windowSize.width;

	const widthGraphTablet = (536 / 768) * windowSize.width;
	const heightGraphTablet = (353 / 768) * windowSize.width;

	const { getSelectedMonths } = useCalendar();

	const options = useMemo(
		() => ({
			chart: {
				type: 'column',
				backgroundColor: 'transparent',
				height: isMobile
					? heightGraphMobile
					: isTablet
						? heightGraphTablet
						: isMiddlePk
							? heightGraphMiddlePk
							: heightGraph, // Устанавливаем фиксированную высоту
				width: isMobile
					? widthGraphMobile
					: isTablet
						? widthGraphTablet
						: isMiddlePk
							? widthGraphMiddlePk
							: widthGraph,
			},
			title: {
				text: region,
				align: 'left',
				style: { fontSize: '1.25rem', fontWeight: 'bold' },
			},
			subtitle: {
				align: 'left',
				text: `
					<div class="subtitle">
						<div class="subtitle__estimate-block">
							<h3 class='subtitle__title'>Ценность</h3>
							${estimate.map(est => `<p class='subtitle__est'>${est}</p>`).join('')}
						</div>
						<div class="subtitle__period-block">
							<h3 class='subtitle__title'>Период</h3>
							<p class='subtitle__est'>${max_period}</p>
						</div>
					</div>
				`,
				useHTML: true,
			},

			xAxis: {
				categories: truncateDescriptionArrStrings(
					getSelectedMonths(arr_month_full, selectedRange),
					3,
				),
				crosshair: true,
				accessibility: {
					description: 'Countries',
				},
				// Скрыть линии сетки по оси x
				gridLineWidth: 0,
				lineWidth: 1, // скрыть основную линию оси x
				lineColor: colors.grey,
				labels: {
					style: {
						color: colors.grey,
						fontSize: '0.875rem',
					},
				},
			},
			yAxis: {
				title: {
					text: null,
				},
				labels: {
					enabled: true,
					style: {
						color: colors.grey,
						fontSize: '0.875rem',
					},
				},
				// Скрыть линии сетки по оси x
				gridLineWidth: 0,
				lineWidth: 1, // скрыть основную линию оси x
				lineColor: colors.grey,
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
				symbolHeight: 0,
				symbolWidth: 0,
				symbolRadius: 0,
				useHTML: true,
				labelFormatter: function (this: { color: string; name: string }) {
					return `<span style="display: inline-block; margin-bottom: calc(2/1920*100vw); width: calc(10/1920*100vw); height: calc(4/1920*100vw); background-color: ${this.color}; border-radius: calc(3/1920*100vw); vertical-align: middle;"></span> ${this.name}`;
				},
			},
			series: newData,
		}),
		[data, region, estimate, max_period],
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

export default DownloadChart;
