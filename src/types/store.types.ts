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

export interface IActiveEstimateStore {
	activeButton: string;
	setActiveButton: (but: string) => void;
}

export interface ISettingsStore {
	isSettings: boolean;
	setIsSettings: (bol: boolean) => void;
}

export interface IViewFilters {
	isEstimate: boolean;
	isRegion: boolean;
	isCalendar: boolean;
	setIsFilter: (id: number, bul: boolean) => void;
}

export interface IMessagesHistory {
	text: string;
	time: string;
	isFromServer: boolean;
}

export interface IMessagesHistoryStore {
	messages: IMessagesHistory[];
	addMessage: (message: IMessagesHistory) => void;
	updateLastMessage: (newMessage: Partial<IMessagesHistory>) => void;
}

export interface IDownloadStore {
	isViewDownload: boolean;
	setIsViewDownload: (bul: boolean) => void;
}
