import type { RawMetadata } from "@/server/types";
import {
	NumberPropertyType,
	TextPropertyType,
	TimePropertyType,
} from "../MetadataPropertyType";
import type { MetadataPropertyInitializer } from "../types";
import { BaseEntityMetadata } from "./BaseEntityMetadata";
import { getPropertyInstance } from "./utils";

const propertyInitializers: Record<string, MetadataPropertyInitializer> = {
	rank: (rawMetadata?: RawMetadata) =>
		new NumberPropertyType({
			name: "rank",
			title: "Position",
			min: 0,
			max: 1e5,
			sortIndex: 10,
			...rawMetadata,
		}),

	surname: (rawMetadata?: RawMetadata) =>
		new TextPropertyType({
			name: "surname",
			title: "Surname",
			sortIndex: 12,
			...rawMetadata,
		}),

	firstName: (rawMetadata?: RawMetadata) =>
		new TextPropertyType({
			name: "firstName",
			title: "First name",
			sortIndex: 14,
			...rawMetadata,
		}),

	thirdName: (rawMetadata?: RawMetadata) =>
		new TextPropertyType({
			name: "thirdName",
			title: "Third name or Initial",
			sortIndex: 16,
			...rawMetadata,
		}),

	age: (rawMetadata?: RawMetadata) =>
		new TextPropertyType({
			name: "ageGroup",
			title: "Age group",
			sortIndex: 18,
			...rawMetadata,
		}),

	time: (rawMetadata?: RawMetadata) =>
		new TimePropertyType({
			name: "time",
			title: "Time",
			sortIndex: 20,
			...rawMetadata,
		}),
};

export class SwimResultMetadata extends BaseEntityMetadata {
	static propertyInitilizers = propertyInitializers;

	static getPropertyInstance = (rawMetadata?: RawMetadata) => {
		return getPropertyInstance(
			SwimResultMetadata.propertyInitilizers,
			rawMetadata,
		);
	};

	constructor(
		rawMetadataArr?: RawMetadata[],
		intializeAllProperties: boolean = false,
	) {
		super();

		this.initializeAndSetProperties(
			SwimResultMetadata.propertyInitilizers,
			rawMetadataArr,
			intializeAllProperties,
		);
	}
}
