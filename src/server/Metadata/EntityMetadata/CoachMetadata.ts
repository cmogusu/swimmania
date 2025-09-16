import {
	NumberPropertyType,
	ParentPropertyType,
	RatingsPropertyType,
	TimePropertyType,
} from "../MetadataPropertyType";
import type { MetadataPropertyInitializer, RawMetadata } from "../types";
import { BaseEntityMetadata } from "./BaseEntityMetadata";
import { getMetadataProperties, getPropertyInstance } from "./utils";

const propertyInitializers: Record<string, MetadataPropertyInitializer> = {
	performance: (rawMetadata?: RawMetadata) =>
		new RatingsPropertyType({
			name: "performance",
			title: "How did the coach perform",
			...rawMetadata,
		}),

	friendliness: (rawMetadata?: RawMetadata) =>
		new RatingsPropertyType({
			name: "friendliness",
			title: "How friendly",
			...rawMetadata,
		}),

	experience: (rawMetadata?: RawMetadata) =>
		new NumberPropertyType({
			name: "experience",
			title: "Years of experience",
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

	workingHours: () =>
		new ParentPropertyType({
			name: "workingHours",
			title: "Working hours",
			childInitializers: {
				opening: (rawMetadata?: RawMetadata) =>
					new TimePropertyType({
						name: "opening",
						title: "Opening",
						value: "8:00",
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

		const properties = getMetadataProperties(
			CoachMetadata.propertyInitilizers,
			rawMetadataArr,
			intializeAllProperties,
		);

		for (const propertyName in properties) {
			this[propertyName] = properties[propertyName];
			this.metadata.push(this[propertyName]);
		}
	}
}
