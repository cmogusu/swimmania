import type { RawMetadata } from "@/server/types";
import {
	LatitudePropertyType,
	LongitudePropertyType,
	NumberPropertyType,
	ParentPropertyType,
	RatingsPropertyType,
	TimePropertyType,
} from "../MetadataPropertyType";
import type { MetadataPropertyInitializer } from "../types";
import { BaseEntityMetadata } from "./BaseEntityMetadata";
import { getPropertyInstance } from "./utils";

const propertyInitializers: Record<string, MetadataPropertyInitializer> = {
	performance: (rawMetadata?: RawMetadata) =>
		new RatingsPropertyType({
			name: "performance",
			title: "How did the coach perform",
			sortIndex: 0,
			...rawMetadata,
		}),

	friendliness: (rawMetadata?: RawMetadata) =>
		new RatingsPropertyType({
			name: "friendliness",
			title: "How friendly",
			sortIndex: 2,
			...rawMetadata,
		}),

	experience: (rawMetadata?: RawMetadata) =>
		new NumberPropertyType({
			name: "experience",
			title: "Years of experience",
			sortIndex: 4,
			min: 0,
			max: 70,
			...rawMetadata,
		}),

	ratePerHour: () =>
		new ParentPropertyType({
			name: "ratePerHour",
			title: "Hourly rate",
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
						max: 1e5,
						...rawMetadata,
					}),
			},
			sortIndex: 6,
		}),

	workingHours: () =>
		new ParentPropertyType({
			name: "workingHours",
			title: "Working hours",
			childInitializers: {
				opening: (rawMetadata?: RawMetadata) =>
					new TimePropertyType({
						name: "opening",
						title: "Opening",
						value: "08:00",
						...rawMetadata,
					}),
				closing: (rawMetadata?: RawMetadata) =>
					new TimePropertyType({
						name: "closing",
						title: "Closing",
						value: "17:00",
						...rawMetadata,
					}),
			},
			sortIndex: 8,
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
			sortIndex: 10,
		}),
};

export class CoachMetadata extends BaseEntityMetadata {
	static propertyInitilizers = propertyInitializers;

	static getPropertyInstance = (rawMetadata?: RawMetadata) => {
		return getPropertyInstance(CoachMetadata.propertyInitilizers, rawMetadata);
	};

	constructor(
		rawMetadataArr?: RawMetadata[],
		intializeAllProperties: boolean = false,
	) {
		super();

		this.initializeAndSetProperties(
			CoachMetadata.propertyInitilizers,
			rawMetadataArr,
			intializeAllProperties,
		);
	}
}
