import type { RawMetadata } from "@/server/types";
import {
	NumberPropertyType,
	TextPropertyType,
	TimePropertyType,
} from "../MetadataPropertyType";
import type { MetadataPropertyInitializer } from "../types";
import { BaseEntityMetadata } from "./BaseEntityMetadata";
import { getMetadataProperties, getPropertyInstance } from "./utils";

const propertyInitializers: Record<string, MetadataPropertyInitializer> = {
	rank: (rawMetadata?: RawMetadata) =>
		new NumberPropertyType({
			name: "rank",
			title: "Position",
			sortIndex: 0,
			...rawMetadata,
		}),

	surname: (rawMetadata?: RawMetadata) =>
		new TextPropertyType({
			name: "surname",
			title: "Surname",
			sortIndex: 2,
			...rawMetadata,
		}),

	firstName: (rawMetadata?: RawMetadata) =>
		new TextPropertyType({
			name: "firstName",
			title: "First name",
			sortIndex: 0,
			...rawMetadata,
		}),

	thirdName: (rawMetadata?: RawMetadata) =>
		new TextPropertyType({
			name: "thirdName",
			title: "Third name or Initial",
			sortIndex: 4,
			...rawMetadata,
		}),

	age: (rawMetadata?: RawMetadata) =>
		new TextPropertyType({
			name: "ageGroup",
			title: "Age group",
			sortIndex: 4,
			...rawMetadata,
		}),

	time: (rawMetadata?: RawMetadata) =>
		new TimePropertyType({
			name: "time",
			title: "Time",
			sortIndex: 0,
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

		const properties = getMetadataProperties(
			SwimResultMetadata.propertyInitilizers,
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
