import type { MetadataValue, RawMetadata } from "@/server/types";
import {
	NumberPropertyType,
	TextPropertyType,
	TimePropertyType,
} from "../MetadataPropertyType";
import type { MetadataPropertyInitializer } from "../types";
import { BaseEntityMetadata } from "./BaseEntityMetadata";
import { getPropertyInstance } from "./utils";

const propertyInitializers: Record<string, MetadataPropertyInitializer> = {
	rank: (value?: MetadataValue) =>
		new NumberPropertyType({
			name: "rank",
			title: "Position",
			min: 0,
			max: 1e5,
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

	firstName: (value?: MetadataValue) =>
		new TextPropertyType({
			name: "firstName",
			title: "First name",
			sortIndex: 14,
			value,
		}),

	thirdName: (value?: MetadataValue) =>
		new TextPropertyType({
			name: "thirdName",
			title: "Third name or Initial",
			sortIndex: 16,
			value,
		}),

	age: (value?: MetadataValue) =>
		new TextPropertyType({
			name: "ageGroup",
			title: "Age group",
			sortIndex: 18,
			value,
		}),

	time: (value?: MetadataValue) =>
		new TimePropertyType({
			name: "time",
			title: "Time",
			sortIndex: 20,
			value,
		}),
};

export class SwimResultMetadata extends BaseEntityMetadata {
	static propertyInitilizers = propertyInitializers;

	static getPropertyInstance = (name: string, value?: MetadataValue) => {
		return getPropertyInstance(
			SwimResultMetadata.propertyInitilizers,
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
			SwimResultMetadata.propertyInitilizers,
			rawMetadata,
			intializeAllProperties,
		);
	}
}
