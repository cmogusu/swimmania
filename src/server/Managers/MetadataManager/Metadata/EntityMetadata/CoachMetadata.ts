import type { MetadataValue, RawMetadata } from "@/server/types";
import {
	LatitudePropertyType,
	LongitudePropertyType,
	NumberPropertyType,
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

	performance: (value?: MetadataValue) =>
		new RatingsPropertyType({
			name: "performance",
			title: "How did the coach perform",
			sortIndex: 10,
			value,
		}),

	friendliness: (value?: MetadataValue) =>
		new RatingsPropertyType({
			name: "friendliness",
			title: "How friendly",
			sortIndex: 12,
			value,
		}),

	experience: (value?: MetadataValue) =>
		new NumberPropertyType({
			name: "experience",
			title: "Years of experience",
			sortIndex: 14,
			min: 0,
			max: 70,
			value,
		}),

	ratePerHour: () =>
		new ParentPropertyType({
			name: "ratePerHour",
			title: "Hourly rate",
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
						max: 1e5,
						value,
					}),
			},
			sortIndex: 16,
		}),

	workingHours: () =>
		new ParentPropertyType({
			name: "workingHours",
			title: "Working hours",
			childInitializers: {
				opening: (value?: MetadataValue) =>
					new TimePropertyType({
						name: "opening",
						title: "Opening",
						value: value || "08:00",
					}),
				closing: (value?: MetadataValue) =>
					new TimePropertyType({
						name: "closing",
						title: "Closing",
						value: value || "17:00",
					}),
			},
			sortIndex: 18,
		}),
};

export class CoachMetadata extends BaseEntityMetadata {
	static propertyInitilizers = propertyInitializers;

	static getPropertyInstance = (name: string, value?: MetadataValue) => {
		return getPropertyInstance(CoachMetadata.propertyInitilizers, name, value);
	};

	constructor(
		rawMetadata?: RawMetadata,
		intializeAllProperties: boolean = false,
	) {
		super();

		this.initializeAndSetProperties(
			CoachMetadata.propertyInitilizers,
			rawMetadata,
			intializeAllProperties,
		);
	}
}
