import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import { FC, useMemo, useState } from 'react';

import { useCheckWidth } from '../../../hooks/useCheckWidth';
import { PointType } from '../../../types/graph.types';
import { IPieChartGraph } from '../../../types/props.types';
import { transformForPercent } from '../../../utils/convertForPercent';
import { editTopEstimateInCountry } from '../../../utils/editRequestData';
import { generateColors } from '../../../utils/generateColors';

import styles from './PieChartGraph.module.scss';

HighchartsAccessibility(Highcharts);

const PieChartGraph: FC<IPieChartGraph> = ({ data }) => {
	const cashingData = useMemo(() => data, [data]);

	const [hoveredData, setHoveredData] = useState<PointType>({
		name: transformForPercent(cashingData)[0].name,
		percentage: transformForPercent(cashingData)[0].value,
	});

	const { windowSize } = useCheckWidth();
	const isMobile = windowSize.width <= 425;
	const formatData = editTopEstimateInCountry(cashingData);

	const widthGraph = (263 / 1920) * windowSize.width;
	const heightGraph = (258 / 1920) * windowSize.width;
	const widthGraphMobile = (260 / 390) * windowSize.width;
	const heightGraphMobile = (260 / 390) * windowSize.width;

	const options = useMemo(
		() => ({
			chart: {
				type: 'pie',
				backgroundColor: 'transparent', // Делаем фон графика прозрачным
				height: isMobile ? heightGraphMobile : heightGraph, // Устанавливаем фиксированную высоту
				width: isMobile ? widthGraphMobile : widthGraph,
			},
			accessibility: {
				point: {
					valueSuffix: '%',
				},
			},
			title: {
				text: null,
			},
			subtitle: {
				text: null,
			},
			tooltip: {
				style: { display: 'none' },
				formatter: function (this: { point: PointType }) {
					const point = this.point;
					const percentage = point.percentage.toFixed(0);
					// Проверяем, изменились ли данные
					setHoveredData(prevData => {
						const parsedPercentage = parseInt(point.percentage.toFixed(0), 10);

						if (
							!prevData ||
							prevData.name !== point.name ||
							prevData.percentage !== parsedPercentage
						) {
							return {
								name: point.name,
								percentage: parsedPercentage,
							};
						}
						return prevData; // Если данные не изменились, не обновляем состояние
					});

					return `<b>${point.name}</b>: ${percentage}%`;
				},
			},
			legend: {
				enabled: false,
			},
			plotOptions: {
				pie: {
					borderWidth: 5, // Увеличиваем отступ между секциями
					borderColor: '#161C2B',
					// colors: ['#3E5F9F', '#527AC7', '#6594EF', '#A2BFF5'], // Устанавливаем свои цвета для секций
					colors: generateColors('#3E5F9F', formatData.length),
					dataLabels: {
						enabled: false,
					},
					states: {
						hover: {
							halo: {
								size: 5, // Устанавливаем размер обводки при наведении
								opacity: 0.8, // Устанавливаем прозрачность
							},
						},
					},
				},
				series: {
					allowPointSelect: true,
					cursor: 'pointer',
					borderRadius: 6,
					dataLabels: [
						{
							enabled: false,
						},
						{
							enabled: false,
						},
					],
					showInLegend: true,
				},
			},
			series: [
				{
					name: 'Registrations',
					colorByPoint: true,
					innerSize: '45%',
					// data: testData,
					data: formatData,
				},
			],
		}),
		[windowSize],
	);

	return (
		<>
			<HighchartsReact
				highcharts={Highcharts}
				options={options}
				containerProps={{
					style: { width: '100%' },
				}}
			/>
			<p className={styles.tooltip}>
				{hoveredData.name} {hoveredData.percentage}%
			</p>
		</>
	);
};

export default PieChartGraph;
