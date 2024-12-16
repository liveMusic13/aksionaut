import { create } from 'zustand';

import {
	IActiveEstimateStore,
	ICalendarState,
	IDownloadStore,
	IEstimateStore,
	IIsHistoryPopupStore,
	IMessagesHistoryStore,
	IRegionStore,
	IRegionsCoordinateStore,
	IScaleDownloadStore,
	ISettingsStore,
	IViewFilters,
} from '../types/store.types';

export const useEstimateStore = create<IEstimateStore>(set => ({
	estimate: [],
	setEstimate: newState => {
		if (typeof newState === 'function') {
			set(state => ({ estimate: newState(state.estimate) }));
		} else {
			set({ estimate: newState });
		}
	},
}));

export const useRegionsCoordinateStore = create<IRegionsCoordinateStore>(
	set => ({
		regions: [],
		setRegions: regions => set({ regions }),
		updateRegionById: (id, newX, newY) =>
			set(state => ({
				regions: state.regions.map(region =>
					region.id === id ? { ...region, x: newX, y: newY } : region,
				),
			})),
	}),
);

export const useRegionStore = create<IRegionStore>(set => ({
	region: [],
	setRegion: newState => {
		if (typeof newState === 'function') {
			set(state => ({ region: newState(state.region) }));
		} else {
			set({ region: newState });
		}
	},
}));

export const useCalendarStore = create<ICalendarState>(set => ({
	selectedRange: {
		start: null,
		end: null,
	},
	setStart: start =>
		set(state => ({
			selectedRange: { ...state.selectedRange, start },
		})),
	setEnd: end =>
		set(state => ({
			selectedRange: { ...state.selectedRange, end },
		})),
	resetRange: () =>
		set(() => ({
			selectedRange: { start: null, end: null },
		})),
}));

export const useActiveEstimateStore = create<IActiveEstimateStore>(set => ({
	activeButton: 'ЧГЧ',
	setActiveButton: but => set({ activeButton: but }),
}));

export const useSettingsStore = create<ISettingsStore>(set => ({
	isSettings: false,
	setIsSettings: bol => set({ isSettings: bol }),
}));

export const useViewFilters = create<IViewFilters>(set => ({
	isEstimate: false,
	isRegion: false,
	isCalendar: false,
	setIsFilter: (id, bol) =>
		set(state => {
			if (id === 0) {
				return { ...state, isEstimate: bol };
			} else if (id === 1) {
				return { ...state, isRegion: bol };
			} else if (id === 2) {
				return { ...state, isCalendar: bol };
			} else {
				return state;
			}
		}),
}));

export const useMessagesStore = create<IMessagesHistoryStore>(set => ({
	messages: [], // Изначально массив сообщений пустой
	addMessage: message =>
		set(state => ({
			messages: [...state.messages, message],
		})),
	updateLastMessage: newMessage =>
		set(state => ({
			messages: state.messages.map((msg, index) =>
				index === state.messages.length - 1 ? { ...msg, ...newMessage } : msg,
			),
		})),
}));

export const useDownloadStore = create<IDownloadStore>(set => ({
	isViewDownload: false,
	setIsViewDownload: bol => set({ isViewDownload: bol }),
}));

export const useScaleDownloadStore = create<IScaleDownloadStore>(set => ({
	isScaleDownload: false,
	setIsScaleDownload: bol => set({ isScaleDownload: bol }),
}));

export const useIsHistoryPopupStore = create<IIsHistoryPopupStore>(set => ({
	isViewPopup: false,
	text: '',
	setIsViewPopup: (bol, text) => set({ isViewPopup: bol, text: text }),
}));
