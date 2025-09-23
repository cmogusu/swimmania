import {
	NumberPropertyType,
	TextPropertyType,
	TimePropertyType,
} from "../MetadataPropertyType";
import type { MetadataPropertyInitializer, RawMetadata } from "../types";
import { BaseEntityMetadata } from "./BaseEntityMetadata";
import { getMetadataProperties, getPropertyInstance } from "./utils";

const propertyInitializers: Record<string, MetadataPropertyInitializer> = {
	position: (rawMetadata?: RawMetadata) =>
		new NumberPropertyType({
			name: "position",
			title: "Position",
			sortIndex: 0,
			...rawMetadata,
		}),

	swimmerName: (rawMetadata?: RawMetadata) =>
		new TextPropertyType({
			name: "swimmerName",
			title: "Swimmer Name",
			sortIndex: 2,
			...rawMetadata,
		}),

	ageGroup: (rawMetadata?: RawMetadata) =>
		new TextPropertyType({
			name: "ageGroup",
			title: "Age group",
			sortIndex: 4,
			...rawMetadata,
		}),

	seedTime: (rawMetadata?: RawMetadata) =>
		new TimePropertyType({
			name: "seedTime",
			title: "eedTime",
			sortIndex: 0,
			...rawMetadata,
		}),

	finalTime: (rawMetadata?: RawMetadata) =>
		new TimePropertyType({
			name: "finalTime",
			title: "eedTime",
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
