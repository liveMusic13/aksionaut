import { CSSProperties, ChangeEvent, PropsWithChildren } from 'react';

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
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface ICustomMap {
	onClick: (event: any) => void;
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

export interface IPopupRegion {
	targetRegion: {
		name: string;
		data: number[];
		color: string;
	}[];
	position: IRegionCoordinate;
}
