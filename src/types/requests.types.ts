export interface ILocationData {
	city: string;
	continent: string;
	continentCode: string;
	countryCode: string;
	countryName: string;
	latitude: number;
	locality: string;
	localityInfo: {
		administrative: {
			adminLevel: number;
			description: string;
			geonameId: number;
			isoCode: string;
			isoName: string;
			name: string;
			order: number;
			wikidataId: string;
		}[];
	};
	localityLanguageRequested: string;
	longitude: number;
	lookupSource: string;
	plusCode: string;
	postcode: string;
	principalSubdivision: string;
	principalSubdivisionCode: string;
}

export interface IHistoryRequest {
	user_id: number;
	values: {
		date: string;
		values: {
			query: string;
			resp: string;
		}[];
	}[];
}

export interface IEstimateAge {
	age_period: string;
	value: number;
}

export interface IEstimateRegions {
	region_name: string;
	value: number;
}

export interface IEstimateSex {
	sex: string;
	value: number;
}

export interface IEstimateData {
	age: IEstimateAge[];
	cennost_name: string;
	regions: IEstimateRegions[];
	sex: IEstimateSex[];
}

export interface IFullEstimateData {
	month: string;
	values: IEstimateData[];
}

export interface IAllRegions {
	id: number;
	name: string;
}

export interface ITopEstimateInCountry {
	name: string;
	value: number;
}

export interface ITopEstimateInCountryEdit {
	name: string;
	y: number;
}
