import type { MetadataValue, RawMetadata } from "@/server/types";
import { DateTimePropertyType } from "../MetadataPropertyType";
import type { MetadataPropertyInitializer } from "../types";
import { BaseEntityMetadata } from "./BaseEntityMetadata";
import { getPropertyInstance } from "./utils";

const propertyInitializers: Record<string, MetadataPropertyInitializer> = {
	time: (value?: MetadataValue) =>
		new DateTimePropertyType({
			name: "time",
			title: "Time",
			sortIndex: 10,
			value,
		}),
};

export class CommentMetadata extends BaseEntityMetadata {
	static propertyInitilizers = propertyInitializers;

	static getPropertyInstance = (name: string, value?: MetadataValue) => {
		return getPropertyInstance(
			CommentMetadata.propertyInitilizers,
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
			CommentMetadata.propertyInitilizers,
			rawMetadata,
			intializeAllProperties,
		);
	}
}
