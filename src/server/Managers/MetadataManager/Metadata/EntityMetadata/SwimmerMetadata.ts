import type { MetadataValue, RawMetadata } from "@/server/types";
import { DatePropertyType, TextPropertyType } from "../MetadataPropertyType";
import type { MetadataPropertyInitializer } from "../types";
import { BaseEntityMetadata } from "./BaseEntityMetadata";
import { getPropertyInstance } from "./utils";

const propertyInitializers: Record<string, MetadataPropertyInitializer> = {
	firstName: (value?: MetadataValue) =>
		new TextPropertyType({
			name: "firstName",
			title: "First name",
			sortIndex: 10,
			value,
		}),

	surname: (value?: MetadataValue) =>
		new TextPropertyType({
			name: "surname",
			title: "Surname",
			sortIndex: 12,
			value,
		}),

	thirdName: (value?: MetadataValue) =>
		new TextPropertyType({
			name: "thirdName",
			title: "Third name or Initial",
			sortIndex: 14,
			value,
		}),

	dob: (value?: MetadataValue) =>
		new DatePropertyType({
			name: "dob",
			title: "Date of birth",
			sortIndex: 16,
			value,
		}),
};

export class SwimmerMetadata extends BaseEntityMetadata {
	static propertyInitilizers = propertyInitializers;

	static getPropertyInstance = (name: string, value?: MetadataValue) => {
		return getPropertyInstance(
			SwimmerMetadata.propertyInitilizers,
			name,
			value,
		);
	};

	constructor(
		rawMetadata?: RawMetadata,
		intializeAllProperties: boolean = false,
	) {
		super();

		this.initializeAndSetProperties(
			SwimmerMetadata.propertyInitilizers,
			rawMetadata,
			intializeAllProperties,
		);
	}
}
