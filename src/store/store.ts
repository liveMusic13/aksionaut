import { create } from 'zustand';

import {
	ICalendarState,
	IEstimateStore,
	IRegionStore,
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
