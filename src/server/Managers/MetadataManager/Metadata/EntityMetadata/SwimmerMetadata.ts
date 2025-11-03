import type { RawMetadata } from "@/server/types";
import { DatePropertyType, TextPropertyType } from "../MetadataPropertyType";
import type { MetadataPropertyInitializer } from "../types";
import { BaseEntityMetadata } from "./BaseEntityMetadata";
import { getPropertyInstance } from "./utils";

const propertyInitializers: Record<string, MetadataPropertyInitializer> = {
	firstName: (rawMetadata?: RawMetadata) =>
		new TextPropertyType({
			name: "firstName",
			title: "First name",
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

	thirdName: (rawMetadata?: RawMetadata) =>
		new TextPropertyType({
			name: "thirdName",
			title: "Third name or Initial",
			sortIndex: 14,
			...rawMetadata,
		}),

	dob: (rawMetadata?: RawMetadata) =>
		new DatePropertyType({
			name: "dob",
			title: "Date of birth",
			sortIndex: 16,
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

		this.initializeAndSetProperties(
			SwimmerMetadata.propertyInitilizers,
			rawMetadataArr,
			intializeAllProperties,
		);
	}
}
