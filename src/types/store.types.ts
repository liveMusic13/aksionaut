import { ISelectedRange } from './calendar.types';

export interface IEstimateStore {
	estimate: string[];
	setEstimate: (newState: string[] | ((prev: string[]) => string[])) => void;
}

export interface IRegionStore {
	region: string[];
	setRegion: (newState: string[] | ((prev: string[]) => string[])) => void;
}

export interface ICalendarState {
	selectedRange: ISelectedRange;
	setStart: (start: string | null) => void;
	setEnd: (end: string | null) => void;
	resetRange: () => void;
}

export interface IRegionCoordinate {
	id: string;
	x: number;
	y: number;
}

export interface IRegionsCoordinateStore {
	regions: IRegionCoordinate[];
	setRegions: (region: IRegionCoordinate[]) => void;
	updateRegionById: (id: string, newX: number, newY: number) => void;
}