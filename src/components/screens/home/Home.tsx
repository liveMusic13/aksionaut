import { FC, Suspense, lazy, useCallback, useState } from 'react';

// import CustomMap from '../../custom-map/CustomMap';
import { useCheckWidth } from '../../../hooks/useCheckWidth';
import { useFilterFinalData } from '../../../hooks/useFilterFinalData';
import { useFilters } from '../../../hooks/useFilters';
import { useGetTopEstimateInCountry } from '../../../hooks/useGetTopEstimateInCountry';
import {
	useCalendarStore,
	useDownloadStore,
	useEstimateStore,
	useRegionStore,
	useRegionsCoordinateStore,
	useSettingsStore,
	useViewFilters,
} from '../../../store/store';
import { IRegionCoordinate } from '../../../types/store.types';
import { totalValue } from '../../../utils/editRequestData';
import BackgroundOpacity from '../../background-opacity/BackgroundOpacity';
import Chat from '../../chat/Chat';
import Download from '../../download/Download';
import Filters from '../../filters/Filters';
import Header from '../../header/Header';
import Layout from '../../layout/Layout';
import PopupRegion from '../../popup-region/PopupRegion';
import SettingsBlock from '../../settings-block/SettingsBlock';
import CalendarBlock from '../../settings-block/calendar-block/CalendarBlock';
import EstimateBlock from '../../settings-block/estimate-block/EstimateBlock';
import RegionBlock from '../../settings-block/region-block/RegionBlock';
import WorthBlock from '../../worth-block/WorthBlock';
import ErrorPage from '../error-page/ErrorPage';

const CustomMap = lazy(() => import('../../custom-map/CustomMap'));

const Home: FC = () => {
	const {
		windowSize: { width },
	} = useCheckWidth();
	const isMobile = width <= 425;
	const isTablet = width <= 768.98;
	const { finalData: data, isError } = useFilterFinalData();
	const region = useRegionStore(store => store.region);
	const setRegion = useRegionStore(store => store.setRegion);
	const updateRegionById = useRegionsCoordinateStore(
		store => store.updateRegionById,
	);
	const regionsCoordinate = useRegionsCoordinateStore(state => state.regions);
	const estimate = useEstimateStore(store => store.estimate);
	const selectedRange = useCalendarStore(store => store.selectedRange);
	const isSettings = useSettingsStore(store => store.isSettings);
	const { isCalendar, isEstimate, isRegion } = useViewFilters();
	const [targetRegion, setTargetRegion] = useState([]);
	const [isViewChat, setIsViewChat] = useState<boolean>(false);
	const setIsViewDownload = useDownloadStore(store => store.setIsViewDownload);
	const isViewDownload = useDownloadStore(store => store.isViewDownload);
	const { data: data_for_all_value } = useGetTopEstimateInCountry();
	const [isViewFilter, setIsViewFilter] = useState<boolean>(true);

	const moveDownload = () => setIsViewDownload(true);

	useFilters(data ? data : { values: [] }, setTargetRegion);

	const getPositionsFunck = (
		regionsCoordinate: IRegionCoordinate[],
	): IRegionCoordinate[] => {
		const firstRegionName = region.length > 0 ? region[0] : '';
		const secondRegionName = region.length === 2 ? region[1] : '';

		const firstRegion = regionsCoordinate.find(
			region => region.id === firstRegionName,
		) || { id: '', x: 0, y: 0 };
		const secondRegion = regionsCoordinate.find(
			region => region.id === secondRegionName,
		) || { id: '', x: 0, y: 0 };

		return [firstRegion, secondRegion];
	};

	const onClick = useCallback((e: any) => {
		const groupElement = e.currentTarget.closest('g');
		if (groupElement) {
			console.log(groupElement.id, e.clientX, e.clientY);
			setRegion([groupElement.id]);
			updateRegionById(groupElement.id, e.clientX, e.clientY);
		} else {
			console.log('Родительский элемент не найден.');
		}
	}, []);

	const onClickChat = useCallback(() => {
		setIsViewChat(true);
	}, []);

	const isFirstPopup =
		targetRegion && targetRegion && targetRegion.length === 1;
	const isSecondPopup =
		targetRegion && targetRegion && targetRegion.length === 2;

	if (isError) {
		return <ErrorPage />;
	}

	return (
		<Layout
			style={{
				backgroundImage: 'url("/images/backgrounds/stars_home.jpg")',
				backgroundRepeat: isMobile ? 'repeat-y' : 'no-repeat',
				// height: isMobile ? 'auto' : undefined,
				height: isViewChat && isMobile ? '100%' : isMobile ? 'auto' : undefined,
				backgroundSize: 'cover',
				flexDirection: isMobile ? 'column' : undefined,
				gap: isMobile ? 'calc(8/390*100vw)' : undefined,
				justifyContent: isMobile ? 'flex-start' : undefined,
				overflow:
					isMobile && (isRegion || isCalendar || isEstimate) ? 'hidden' : '',
			}}
		>
			<Header isViewFilter={isViewFilter} setIsViewFilter={setIsViewFilter} />
			{isViewFilter && (
				<Suspense fallback={<div>Loading...</div>}>
					<Filters onClickChat={onClickChat} />
				</Suspense>
			)}

			<Suspense fallback={<div>Loading...</div>}>
				<CustomMap onClick={onClick} targetRegion={targetRegion} />
			</Suspense>

			<Suspense fallback={<div>Loading...</div>}>
				{!(
					region.length > 0 ||
					estimate.length > 0 ||
					selectedRange.start ||
					selectedRange.end
				) && <WorthBlock />}
			</Suspense>

			{isViewChat && (
				<>
					<BackgroundOpacity />
					<Chat setIsViewChat={setIsViewChat} />
				</>
			)}

			{!isMobile && !isTablet && isFirstPopup && (
				<PopupRegion
					targetRegion={targetRegion[0]}
					position={getPositionsFunck(regionsCoordinate)[0]}
					isMobile={isMobile}
				/>
			)}

			{(isMobile || isTablet) && isFirstPopup && (
				<PopupRegion
					targetRegion={targetRegion || []}
					position={getPositionsFunck(regionsCoordinate)[0]}
					positionMobile={getPositionsFunck(regionsCoordinate)}
					isMobile={isMobile}
					isTablet={isTablet}
				/>
			)}

			{!isMobile && !isTablet && isSecondPopup && (
				<>
					<PopupRegion
						targetRegion={targetRegion[0]}
						position={getPositionsFunck(regionsCoordinate)[0]}
						isMobile={isMobile}
					/>
					<PopupRegion
						targetRegion={targetRegion[1]}
						position={getPositionsFunck(regionsCoordinate)[1]}
						isMobile={isMobile}
					/>
				</>
			)}

			{(isMobile || isTablet) && isSecondPopup && (
				<PopupRegion
					targetRegion={targetRegion || []}
					position={getPositionsFunck(regionsCoordinate)[0]}
					positionMobile={getPositionsFunck(regionsCoordinate)}
					isMobile={isMobile}
					isTablet={isTablet}
				/>
			)}

			{isMobile && isSettings && <SettingsBlock />}
			{isMobile && isEstimate && <EstimateBlock />}
			{isMobile && isRegion && <RegionBlock />}
			{isMobile && isCalendar && <CalendarBlock />}
			{region.length > 0 &&
				estimate.length > 0 &&
				selectedRange.start &&
				selectedRange.end && (
					<>
						<button className='download' onClick={moveDownload}>
							<img src='/images/icons/download.svg' alt='download' />
						</button>

						<p className='text-download'>
							Статистика собрана на основе данных{' '}
							{data_for_all_value
								? totalValue(data_for_all_value.cennosti_by_all_period_regions)
								: ''}{' '}
							показателей
						</p>
					</>
				)}
			{isViewDownload && (
				<>
					<BackgroundOpacity />
					<Download data={targetRegion} />
				</>
			)}
		</Layout>
	);
};

export default Home;
