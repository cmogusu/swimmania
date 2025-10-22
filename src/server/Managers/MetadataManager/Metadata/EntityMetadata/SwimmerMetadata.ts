import type { RawMetadata } from "@/server/types";
import { TextPropertyType } from "../MetadataPropertyType";
import type { MetadataPropertyInitializer } from "../types";
import { BaseEntityMetadata } from "./BaseEntityMetadata";
import { getMetadataProperties, getPropertyInstance } from "./utils";

const propertyInitializers: Record<string, MetadataPropertyInitializer> = {
	firstName: (rawMetadata?: RawMetadata) =>
		new TextPropertyType({
			name: "firstName",
			title: "First name",
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

	thirdName: (rawMetadata?: RawMetadata) =>
		new TextPropertyType({
			name: "thirdName",
			title: "Third name or Initial",
			sortIndex: 4,
			...rawMetadata,
		}),

	dob: (rawMetadata?: RawMetadata) =>
		new TextPropertyType({
			name: "dob",
			title: "Date of birth",
			sortIndex: 6,
			...rawMetadata,
		}),
};

export class SwimmerMetadata extends BaseEntityMetadata {
	static propertyInitilizers = propertyInitializers;

	static getPropertyInstance = (rawMetadata?: RawMetadata) => {
		return getPropertyInstance(
			SwimmerMetadata.propertyInitilizers,
			rawMetadata,
		);
	};

	constructor(
		rawMetadataArr?: RawMetadata[],
		intializeAllProperties: boolean = false,
	) {
		super();

		const properties = getMetadataProperties(
			SwimmerMetadata.propertyInitilizers,
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
