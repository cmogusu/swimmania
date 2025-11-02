import type { RawMetadata } from "@/server/types";
import {
	EmailPropertyType,
	OptionsPropertyType,
} from "../MetadataPropertyType";
import type { MetadataPropertyInitializer } from "../types";
import { BaseEntityMetadata } from "./BaseEntityMetadata";
import { getPropertyInstance } from "./utils";

const propertyInitializers: Record<string, MetadataPropertyInitializer> = {
	email: (rawMetadata?: RawMetadata) =>
		new EmailPropertyType({
			name: "email",
			title: "Email address",
			sortIndex: 0,
			...rawMetadata,
		}),
	country: (rawMetadata?: RawMetadata) =>
		new OptionsPropertyType({
			name: "country",
			title: "Country of residence",
			options: [
				{
					key: "kenya",
					value: "Kenya",
				},
				{
					key: "uganda",
					value: "Uganda",
				},
				{
					key: "tanzania",
					value: "Tanzania",
				},
				{
					key: "usa",
					value: "USA",
				},
			],
			sortIndex: 2,
			...rawMetadata,
		}),
};

export class UserMetadata extends BaseEntityMetadata {
	static propertyInitilizers = propertyInitializers;

	static getPropertyInstance = (rawMetadata?: RawMetadata) => {
		return getPropertyInstance(UserMetadata.propertyInitilizers, rawMetadata);
	};

	constructor(
		rawMetadataArr?: RawMetadata[],
		intializeAllProperties: boolean = false,
	) {
		super();

		this.initializeAndSetProperties(
			UserMetadata.propertyInitilizers,
			rawMetadataArr,
			intializeAllProperties,
		);
	}
}
