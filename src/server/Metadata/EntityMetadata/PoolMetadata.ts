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
import type { MetadataPropertyInitializer, RawMetadata } from "../types";
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
		}),

	crowdiness: (rawMetadata?: RawMetadata) =>
		new RatingsPropertyType({
			name: "crowdiness",
			title: "How crowded",
			...rawMetadata,
		}),

	openToPublic: (rawMetadata?: RawMetadata) =>
		new BooleanPropertyType({
			name: "openToPublic",
			title: "Open to public",
			...rawMetadata,
		}),

	openToChildren: (rawMetadata?: RawMetadata) =>
		new BooleanPropertyType({
			name: "openToChildren",
			title: "Open to children",
			...rawMetadata,
		}),

	hasLaneRopes: (rawMetadata?: RawMetadata) =>
		new BooleanPropertyType({
			name: "hasLaneRopes",
			title: "Lane ropes",
			...rawMetadata,
		}),

	isHeated: (rawMetadata?: RawMetadata) =>
		new BooleanPropertyType({
			name: "isHeated",
			title: "Heated",
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
		}),

	isIndoor: (rawMetadata?: RawMetadata) =>
		new BooleanPropertyType({
			name: "isIndoor",
			title: "Indoor pool",
			...rawMetadata,
		}),

	cleanliness: (rawMetadata?: RawMetadata) =>
		new RatingsPropertyType({
			name: "cleanliness",
			title: "Cleanliness",
			...rawMetadata,
		}),

	changingRoomCleanliness: (rawMetadata?: RawMetadata) =>
		new RatingsPropertyType({
			name: "changingRoomCleanliness",
			title: "Cleanliness of changing room",
			...rawMetadata,
		}),

	hasOnDutyLifeguard: (rawMetadata?: RawMetadata) =>
		new BooleanPropertyType({
			name: "hasOnDutyLifeguard",
			title: "Lifeguards",
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
	}
}
