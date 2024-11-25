import { create } from 'zustand';

import {
	IActiveEstimateStore,
	ICalendarState,
	IEstimateStore,
	IRegionStore,
	IRegionsCoordinateStore,
	ISettingsStore,
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
