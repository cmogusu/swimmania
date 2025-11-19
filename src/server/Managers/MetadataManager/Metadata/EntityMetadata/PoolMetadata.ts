import type { MetadataValue, RawMetadata } from "@/server/types";
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
				lat: (value?: MetadataValue) =>
					new LatitudePropertyType({
						name: "lat",
						title: "Latitude",
						value,
					}),
				lng: (value?: MetadataValue) =>
					new LongitudePropertyType({
						name: "lng",
						title: "Longitude",
						value,
					}),
				name: (value?: MetadataValue) =>
					new TextPropertyType({
						name: "name",
						title: "Name",
						value,
					}),
			},
			sortIndex: 8,
		}),

	hostInstitutionType: (value?: MetadataValue) =>
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
			value,
		}),

	poolShape: (value?: MetadataValue) =>
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
			value,
		}),

	poolDimensions: () =>
		new ParentPropertyType({
			name: "poolDimensions",
			title: "Pool dimensions",
			childInitializers: {
				length: (value?: MetadataValue) =>
					new NumberPropertyType({
						name: "length",
						title: "Length",
						suffix: " meters",
						min: 5,
						max: 200,
						value,
					}),
				width: (value?: MetadataValue) =>
					new NumberPropertyType({
						name: "width",
						title: "Width",
						suffix: " meters",
						min: 5,
						max: 200,
						value,
					}),
			},
			sortIndex: 14,
		}),

	operatingHours: () =>
		new ParentPropertyType({
			name: "operatingHours",
			title: "Operating hours",
			childInitializers: {
				opening: (value?: MetadataValue) =>
					new TimePropertyType({
						name: "opening",
						title: "Opening hours",
						value,
					}),
				closing: (value?: MetadataValue) =>
					new TimePropertyType({
						name: "closing",
						title: "Closing hours",
						value,
					}),
			},
			sortIndex: 16,
		}),

	crowdiness: (value?: MetadataValue) =>
		new RatingsPropertyType({
			name: "crowdiness",
			title: "How crowded",
			sortIndex: 18,
			value,
		}),

	openToPublic: (value?: MetadataValue) =>
		new BooleanPropertyType({
			name: "openToPublic",
			title: "Open to public",
			sortIndex: 20,
			value,
		}),

	openToChildren: (value?: MetadataValue) =>
		new BooleanPropertyType({
			name: "openToChildren",
			title: "Open to children",
			sortIndex: 22,
			value,
		}),

	hasLaneRopes: (value?: MetadataValue) =>
		new BooleanPropertyType({
			name: "hasLaneRopes",
			title: "Lane ropes",
			sortIndex: 24,
			value,
		}),

	isHeated: (value?: MetadataValue) =>
		new BooleanPropertyType({
			name: "isHeated",
			title: "Heated",
			sortIndex: 26,
			value,
		}),

	entryFeeIn: () =>
		new ParentPropertyType({
			name: "entryFeeIn",
			title: "Entry fee",
			childInitializers: {
				ksh: (value?: MetadataValue) =>
					new NumberPropertyType({
						name: "ksh",
						prefix: "Ksh ",
						title: "Shillings",
						min: 0,
						max: 1e5,
						value,
					}),
				usd: (value?: MetadataValue) =>
					new NumberPropertyType({
						name: "usd",
						prefix: "Usd ",
						title: "Usd",
						min: 0,
						max: 1e4,
						value,
					}),
			},
			sortIndex: 28,
		}),

	isIndoor: (value?: MetadataValue) =>
		new BooleanPropertyType({
			name: "isIndoor",
			title: "Indoor pool",
			sortIndex: 30,
			value,
		}),

	cleanliness: (value?: MetadataValue) =>
		new RatingsPropertyType({
			name: "cleanliness",
			title: "Cleanliness",
			sortIndex: 32,
			value,
		}),

	changingRoomCleanliness: (value?: MetadataValue) =>
		new RatingsPropertyType({
			name: "changingRoomCleanliness",
			title: "Cleanliness of changing room",
			sortIndex: 34,
			value,
		}),

	hasOnDutyLifeguard: (value?: MetadataValue) =>
		new BooleanPropertyType({
			name: "hasOnDutyLifeguard",
			title: "Lifeguards",
			sortIndex: 36,
			value,
		}),
};

export class PoolMetadata extends BaseEntityMetadata {
	static propertyInitilizers = propertyInitializers;

	static getPropertyInstance = (name: string, value?: MetadataValue) => {
		return getPropertyInstance(PoolMetadata.propertyInitilizers, name, value);
	};

	constructor(
		rawMetadata?: RawMetadata,
		intializeAllProperties: boolean = false,
	) {
		super();

		this.initializeAndSetProperties(
			PoolMetadata.propertyInitilizers,
			rawMetadata,
			intializeAllProperties,
		);
	}
}
