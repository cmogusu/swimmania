import type { RawMetadata } from "@/server/types";
import {
	BooleanPropertyType,
	LatitudePropertyType,
	LongitudePropertyType,
	NumberPropertyType,
	OptionsPropertyType,
	ParentPropertyType,
	RatingsPropertyType,
	TimePropertyType,
} from "../MetadataPropertyType";
import type { MetadataPropertyInitializer } from "../types";
import { BaseEntityMetadata } from "./BaseEntityMetadata";
import { getMetadataProperties, getPropertyInstance } from "./utils";

const propertyInitializers: Record<string, MetadataPropertyInitializer> = {
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
			sortIndex: 0,
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
			sortIndex: 2,
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
						...rawMetadata,
					}),
				width: (rawMetadata?: RawMetadata) =>
					new NumberPropertyType({
						name: "width",
						title: "Width",
						suffix: " meters",
						...rawMetadata,
					}),
			},
			sortIndex: 4,
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
			sortIndex: 6,
		}),

	crowdiness: (rawMetadata?: RawMetadata) =>
		new RatingsPropertyType({
			name: "crowdiness",
			title: "How crowded",
			sortIndex: 8,
			...rawMetadata,
		}),

	openToPublic: (rawMetadata?: RawMetadata) =>
		new BooleanPropertyType({
			name: "openToPublic",
			title: "Open to public",
			sortIndex: 10,
			...rawMetadata,
		}),

	openToChildren: (rawMetadata?: RawMetadata) =>
		new BooleanPropertyType({
			name: "openToChildren",
			title: "Open to children",
			sortIndex: 12,
			...rawMetadata,
		}),

	hasLaneRopes: (rawMetadata?: RawMetadata) =>
		new BooleanPropertyType({
			name: "hasLaneRopes",
			title: "Lane ropes",
			sortIndex: 14,
			...rawMetadata,
		}),

	isHeated: (rawMetadata?: RawMetadata) =>
		new BooleanPropertyType({
			name: "isHeated",
			title: "Heated",
			sortIndex: 16,
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
						...rawMetadata,
					}),
				usd: (rawMetadata?: RawMetadata) =>
					new NumberPropertyType({
						name: "usd",
						prefix: "Usd ",
						title: "Usd",
						...rawMetadata,
					}),
			},
			sortIndex: 18,
		}),

	isIndoor: (rawMetadata?: RawMetadata) =>
		new BooleanPropertyType({
			name: "isIndoor",
			title: "Indoor pool",
			sortIndex: 20,
			...rawMetadata,
		}),

	cleanliness: (rawMetadata?: RawMetadata) =>
		new RatingsPropertyType({
			name: "cleanliness",
			title: "Cleanliness",
			sortIndex: 22,
			...rawMetadata,
		}),

	changingRoomCleanliness: (rawMetadata?: RawMetadata) =>
		new RatingsPropertyType({
			name: "changingRoomCleanliness",
			title: "Cleanliness of changing room",
			sortIndex: 24,
			...rawMetadata,
		}),

	hasOnDutyLifeguard: (rawMetadata?: RawMetadata) =>
		new BooleanPropertyType({
			name: "hasOnDutyLifeguard",
			title: "Lifeguards",
			sortIndex: 26,
			...rawMetadata,
		}),

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
			},
			sortIndex: 28,
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

		const properties = getMetadataProperties(
			PoolMetadata.propertyInitilizers,
			rawMetadataArr,
			intializeAllProperties,
		);

		for (const propertyName in properties) {
			this[propertyName] = properties[propertyName];
			this.metadata.push(this[propertyName]);
		}

		this.metadata.sort((m1, m2) => m1.sortIndex - m2.sortIndex);
	}
}
