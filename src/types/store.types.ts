import { ISelectedRange } from './calendar.types';

export interface IEstimateStore {
	estimate: string[];
	// setEstimate: (newState: string[]) => void;
	setEstimate: (newState: string[] | ((prev: string[]) => string[])) => void;
}

export interface IRegionStore {
	region: string[];
	// setRegion: (newState: string[]) => void;
	setRegion: (newState: string[] | ((prev: string[]) => string[])) => void;
}

export interface ICalendarState {
	selectedRange: ISelectedRange;
	setStart: (start: string | null) => void;
	setEnd: (end: string | null) => void;
	resetRange: () => void;
}
