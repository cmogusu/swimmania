import type { RawMetadata } from "@/server/types";
import {
	DateTimePropertyType,
	RatingsPropertyType,
} from "../MetadataPropertyType";
import type { MetadataPropertyInitializer } from "../types";
import { BaseEntityMetadata } from "./BaseEntityMetadata";
import { getPropertyInstance } from "./utils";

const propertyInitializers: Record<string, MetadataPropertyInitializer> = {
	time: (rawMetadata?: RawMetadata) =>
		new DateTimePropertyType({
			name: "time",
			title: "Time",
			sortIndex: 10,
			...rawMetadata,
		}),

	rating: (rawMetadata?: RawMetadata) =>
		new RatingsPropertyType({
			name: "rating",
			title: "Rating",
			sortIndex: 12,
			...rawMetadata,
		}),
};

export class RatingMetadata extends BaseEntityMetadata {
	static propertyInitilizers = propertyInitializers;

	static getPropertyInstance = (rawMetadata?: RawMetadata) => {
		return getPropertyInstance(RatingMetadata.propertyInitilizers, rawMetadata);
	};

	constructor(
		rawMetadataArr?: RawMetadata[],
		intializeAllProperties: boolean = false,
	) {
		super();

		this.initializeAndSetProperties(
			RatingMetadata.propertyInitilizers,
			rawMetadataArr,
			intializeAllProperties,
		);
	}
}
