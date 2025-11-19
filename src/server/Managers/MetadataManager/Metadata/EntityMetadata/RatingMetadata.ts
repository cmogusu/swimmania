import type { MetadataValue, RawMetadata } from "@/server/types";
import {
	DateTimePropertyType,
	RatingsPropertyType,
} from "../MetadataPropertyType";
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

	rating: (value?: MetadataValue) =>
		new RatingsPropertyType({
			name: "rating",
			title: "Rating",
			sortIndex: 12,
			value,
		}),
};

export class RatingMetadata extends BaseEntityMetadata {
	static propertyInitilizers = propertyInitializers;

	static getPropertyInstance = (name: string, value?: MetadataValue) => {
		return getPropertyInstance(RatingMetadata.propertyInitilizers, name, value);
	};

	constructor(
		rawMetadata?: RawMetadata,
		intializeAllProperties: boolean = false,
	) {
		super();

		this.initializeAndSetProperties(
			RatingMetadata.propertyInitilizers,
			rawMetadata,
			intializeAllProperties,
		);
	}
}
