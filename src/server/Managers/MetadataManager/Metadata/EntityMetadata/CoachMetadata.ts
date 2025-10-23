import type { RawMetadata } from "@/server/types";
import {
	NumberPropertyType,
	ParentPropertyType,
	RatingsPropertyType,
	TimePropertyType,
} from "../MetadataPropertyType";
import type { MetadataPropertyInitializer } from "../types";
import { BaseEntityMetadata } from "./BaseEntityMetadata";
import { getMetadataProperties, getPropertyInstance } from "./utils";

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
			...rawMetadata,
		}),

	ratePerHour: () =>
		new ParentPropertyType({
			name: "ratePerHour",
			title: "Hourly rate",
			childInitializers: {
				ksh: (rawMetadata?: RawMetadata) =>
					new NumberPropertyType({
						name: "ratePerHour.ksh",
						prefix: "Ksh ",
						title: "Shillings",
						...rawMetadata,
					}),
				usd: (rawMetadata?: RawMetadata) =>
					new NumberPropertyType({
						name: "ratePerHour.usd",
						prefix: "Usd ",
						title: "Usd",
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
						name: "workingHours.opening",
						title: "Opening",
						value: "08:00",
						...rawMetadata,
					}),
				closing: (rawMetadata?: RawMetadata) =>
					new TimePropertyType({
						name: "workingHours.closing",
						title: "Closing",
						value: "17:00",
						...rawMetadata,
					}),
			},
			sortIndex: 8,
		}),
};

export class CoachMetadata extends BaseEntityMetadata {
	dbTableName: string = "coach_metadata";

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

		this.metadata.sort((m1, m2) => m1.sortIndex - m2.sortIndex);
	}
}
