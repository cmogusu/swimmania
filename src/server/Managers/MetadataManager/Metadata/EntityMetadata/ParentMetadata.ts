import type { RawMetadata } from "@/server/types";
import {
	LatitudePropertyType,
	LongitudePropertyType,
	ParentPropertyType,
} from "../MetadataPropertyType";
import type { MetadataPropertyInitializer } from "../types";
import { BaseEntityMetadata } from "./BaseEntityMetadata";
import { getMetadataProperties, getPropertyInstance } from "./utils";

const propertyInitializers: Record<string, MetadataPropertyInitializer> = {
	location: () =>
		new ParentPropertyType({
			name: "location",
			title: "Location of base",
			childInitializers: {
				lat: (rawMetadata?: RawMetadata) =>
					new LatitudePropertyType({
						name: "lat",
						title: "Latitude",
						...rawMetadata,
					}),
				lng: (rawMetadata?: RawMetadata) =>
					new LongitudePropertyType({
						name: "lng",
						title: "Longitude",
						...rawMetadata,
					}),
			},
			sortIndex: 4,
		}),
};

export class ParentMetadata extends BaseEntityMetadata {
	static propertyInitilizers = propertyInitializers;

	static getPropertyInstance = (rawMetadata?: RawMetadata) => {
		return getPropertyInstance(ParentMetadata.propertyInitilizers, rawMetadata);
	};

	constructor(
		rawMetadataArr?: RawMetadata[],
		intializeAllProperties: boolean = false,
	) {
		super();

		const properties = getMetadataProperties(
			ParentMetadata.propertyInitilizers,
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
