import {
	CSSProperties,
	ChangeEvent,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
} from 'react';

import {
	IAllRegions,
	IEstimateData,
	ITopEstimateInCountry,
} from './requests.types';
import { IRegionCoordinate } from './store.types';
import { IDataForSelectOption } from './transformData.types';

export interface ILayoutProps extends PropsWithChildren {
	style?: CSSProperties;
}

export interface IButtonProps extends PropsWithChildren {
	style?: CSSProperties;
	onClick?: () => void;
}

export interface IInput {
	style?: CSSProperties;
	styleInput?: CSSProperties;
	styleImage?: CSSProperties;
	placeholder?: string;
	value?: string;
	styleLimit?: CSSProperties;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface ICustomMap {
	onClick: (event: any) => void;
	targetRegion: { name: string; data: number[]; color: string }[][];
}

export interface IRange {
	estimate: IEstimateData;
}

export interface ISelect {
	title: string;
	isEstimate: boolean;
	data?: IDataForSelectOption[] | IAllRegions[];
}

export interface ICheckbox {
	checkbox: IDataForSelectOption;
	// onChange: (
	// 	setValue: Dispatch<SetStateAction<boolean>>,
	// 	value: boolean,
	// ) => void;
	onChange: () => void;
	isCheck: boolean;
}

export interface IPieChartGraph {
	data: ITopEstimateInCountry[];
}

export interface IChartData {
	name: string;
	data: number[];
	color: string;
}

export interface IPopupRegion {
	targetRegion: IChartData[] | IChartData[][];
	position: IRegionCoordinate;
	positionMobile?: IRegionCoordinate[];
	isMobile: boolean;
	isTablet?: boolean;
}

export interface IFilters {
	onClickChat: () => void;
}

export interface IChat {
	setIsViewChat: Dispatch<SetStateAction<boolean>>;
}
