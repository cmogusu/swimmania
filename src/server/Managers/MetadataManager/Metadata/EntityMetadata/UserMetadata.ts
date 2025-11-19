import type { MetadataValue, RawMetadata } from "@/server/types";
import {
	EmailPropertyType,
	OptionsPropertyType,
} from "../MetadataPropertyType";
import type { MetadataPropertyInitializer } from "../types";
import { BaseEntityMetadata } from "./BaseEntityMetadata";
import { getPropertyInstance } from "./utils";

const propertyInitializers: Record<string, MetadataPropertyInitializer> = {
	email: (value?: MetadataValue) =>
		new EmailPropertyType({
			name: "email",
			title: "Email address",
			sortIndex: 10,
			value,
		}),

	country: (value?: MetadataValue) =>
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
			sortIndex: 12,
			value,
		}),
};

export class UserMetadata extends BaseEntityMetadata {
	static propertyInitilizers = propertyInitializers;

	static getPropertyInstance = (name: string, value?: MetadataValue) => {
		return getPropertyInstance(UserMetadata.propertyInitilizers, name, value);
	};

	constructor(
		rawMetadata?: RawMetadata,
		intializeAllProperties: boolean = false,
	) {
		super();

		this.initializeAndSetProperties(
			UserMetadata.propertyInitilizers,
			rawMetadata,
			intializeAllProperties,
		);
	}
}
