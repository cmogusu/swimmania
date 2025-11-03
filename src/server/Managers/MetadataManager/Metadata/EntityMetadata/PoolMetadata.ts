import type { RawMetadata } from "@/server/types";
import {
	BooleanPropertyType,
	LatitudePropertyType,
	LongitudePropertyType,
	NumberPropertyType,
	OptionsPropertyType,
	ParentPropertyType,
	RatingsPropertyType,
	TextPropertyType,
	TimePropertyType,
} from "../MetadataPropertyType";
import type { MetadataPropertyInitializer } from "../types";
import { BaseEntityMetadata } from "./BaseEntityMetadata";
import { getPropertyInstance } from "./utils";

const propertyInitializers: Record<string, MetadataPropertyInitializer> = {
	location: () =>
		new ParentPropertyType({
			name: "location",
			title: "Location",
			childInitializers: {
				lat: (rawMetadata?: RawMetadata) =>
					new LatitudePropertyType({
						name: "lat",
						title: "Latitude",
						...rawMetadata,
					}),
				lng: (rawMetadata?: RawMetadata) =>
					new LongitudePropertyType({
						name: "lng",
						title: "Longitude",
						...rawMetadata,
					}),
				name: (rawMetadata?: RawMetadata) =>
					new TextPropertyType({
						name: "name",
						title: "Name",
						...rawMetadata,
					}),
			},
			sortIndex: 8,
		}),

	hostInstitutionType: (rawMetadata?: RawMetadata) =>
		new OptionsPropertyType({
			name: "hostInstitutionType",
			title: "Host type",
			options: [
				{
					key: "hotel",
					value: "Hotel",
				},
				{
					key: "school",
					value: "School",
				},
				{
					key: "gym",
					value: "Gym",
				},
			],
			sortIndex: 10,
			...rawMetadata,
		}),

	poolShape: (rawMetadata?: RawMetadata) =>
		new OptionsPropertyType({
			name: "poolShape",
			title: "Shape of pool",
			options: [
				{
					key: "round",
					value: "Round",
				},
				{
					key: "rectangle",
					value: "Rectangle",
				},
				{
					key: "square",
					value: "Square",
				},
				{
					key: "curvy",
					value: "Curvy",
				},
			],
			sortIndex: 12,
			...rawMetadata,
		}),

	poolDimensions: () =>
		new ParentPropertyType({
			name: "poolDimensions",
			title: "Pool dimensions",
			childInitializers: {
				length: (rawMetadata?: RawMetadata) =>
					new NumberPropertyType({
						name: "length",
						title: "Length",
						suffix: " meters",
						min: 5,
						max: 200,
						...rawMetadata,
					}),
				width: (rawMetadata?: RawMetadata) =>
					new NumberPropertyType({
						name: "width",
						title: "Width",
						suffix: " meters",
						min: 5,
						max: 200,
						...rawMetadata,
					}),
			},
			sortIndex: 14,
		}),

	operatingHours: () =>
		new ParentPropertyType({
			name: "operatingHours",
			title: "Operating hours",
			childInitializers: {
				opening: (rawMetadata?: RawMetadata) =>
					new TimePropertyType({
						name: "opening",
						title: "Opening hours",
						...rawMetadata,
					}),
				closing: (rawMetadata?: RawMetadata) =>
					new TimePropertyType({
						name: "closing",
						title: "Closing hours",
						...rawMetadata,
					}),
			},
			sortIndex: 16,
		}),

	crowdiness: (rawMetadata?: RawMetadata) =>
		new RatingsPropertyType({
			name: "crowdiness",
			title: "How crowded",
			sortIndex: 18,
			...rawMetadata,
		}),

	openToPublic: (rawMetadata?: RawMetadata) =>
		new BooleanPropertyType({
			name: "openToPublic",
			title: "Open to public",
			sortIndex: 20,
			...rawMetadata,
		}),

	openToChildren: (rawMetadata?: RawMetadata) =>
		new BooleanPropertyType({
			name: "openToChildren",
			title: "Open to children",
			sortIndex: 22,
			...rawMetadata,
		}),

	hasLaneRopes: (rawMetadata?: RawMetadata) =>
		new BooleanPropertyType({
			name: "hasLaneRopes",
			title: "Lane ropes",
			sortIndex: 24,
			...rawMetadata,
		}),

	isHeated: (rawMetadata?: RawMetadata) =>
		new BooleanPropertyType({
			name: "isHeated",
			title: "Heated",
			sortIndex: 26,
			...rawMetadata,
		}),

	entryFeeIn: () =>
		new ParentPropertyType({
			name: "entryFeeIn",
			title: "Entry fee",
			childInitializers: {
				ksh: (rawMetadata?: RawMetadata) =>
					new NumberPropertyType({
						name: "ksh",
						prefix: "Ksh ",
						title: "Shillings",
						min: 0,
						max: 1e5,
						...rawMetadata,
					}),
				usd: (rawMetadata?: RawMetadata) =>
					new NumberPropertyType({
						name: "usd",
						prefix: "Usd ",
						title: "Usd",
						min: 0,
						max: 1e4,
						...rawMetadata,
					}),
			},
			sortIndex: 28,
		}),

	isIndoor: (rawMetadata?: RawMetadata) =>
		new BooleanPropertyType({
			name: "isIndoor",
			title: "Indoor pool",
			sortIndex: 30,
			...rawMetadata,
		}),

	cleanliness: (rawMetadata?: RawMetadata) =>
		new RatingsPropertyType({
			name: "cleanliness",
			title: "Cleanliness",
			sortIndex: 32,
			...rawMetadata,
		}),

	changingRoomCleanliness: (rawMetadata?: RawMetadata) =>
		new RatingsPropertyType({
			name: "changingRoomCleanliness",
			title: "Cleanliness of changing room",
			sortIndex: 34,
			...rawMetadata,
		}),

	hasOnDutyLifeguard: (rawMetadata?: RawMetadata) =>
		new BooleanPropertyType({
			name: "hasOnDutyLifeguard",
			title: "Lifeguards",
			sortIndex: 36,
			...rawMetadata,
		}),
};

export class PoolMetadata extends BaseEntityMetadata {
	static propertyInitilizers = propertyInitializers;

	static getPropertyInstance = (rawMetadata?: RawMetadata) => {
		return getPropertyInstance(PoolMetadata.propertyInitilizers, rawMetadata);
	};

	constructor(
		rawMetadataArr?: RawMetadata[],
		intializeAllProperties: boolean = false,
	) {
		super();

		this.initializeAndSetProperties(
			PoolMetadata.propertyInitilizers,
			rawMetadataArr,
			intializeAllProperties,
		);
	}
}
