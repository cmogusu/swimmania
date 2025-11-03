import type { RawMetadata } from "@/server/types";
import {
	LatitudePropertyType,
	LongitudePropertyType,
	NumberPropertyType,
	ParentPropertyType,
	TextPropertyType,
} from "../MetadataPropertyType";
import type { MetadataPropertyInitializer } from "../types";
import { BaseEntityMetadata } from "./BaseEntityMetadata";
import { getPropertyInstance } from "./utils";

const propertyInitializers: Record<string, MetadataPropertyInitializer> = {
	location: () =>
		new ParentPropertyType({
			name: "location",
			title: "Location",
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
				name: (rawMetadata?: RawMetadata) =>
					new TextPropertyType({
						name: "name",
						title: "Name",
						...rawMetadata,
					}),
			},
			sortIndex: 10,
		}),

	averageSchoolFees: () =>
		new ParentPropertyType({
			name: "averageSchoolFees",
			title: "Average school fee",
			childInitializers: {
				ksh: (rawMetadata?: RawMetadata) =>
					new NumberPropertyType({
						name: "ksh",
						prefix: "Ksh ",
						title: "Shillings",
						min: 0,
						max: 1e7,
						...rawMetadata,
					}),
				usd: (rawMetadata?: RawMetadata) =>
					new NumberPropertyType({
						name: "usd",
						prefix: "Usd ",
						title: "Usd",
						min: 0,
						max: 1e6,
						...rawMetadata,
					}),
			},
			sortIndex: 12,
		}),
};

export class SchoolMetadata extends BaseEntityMetadata {
	static propertyInitilizers = propertyInitializers;

	static getPropertyInstance = (rawMetadata?: RawMetadata) => {
		return getPropertyInstance(SchoolMetadata.propertyInitilizers, rawMetadata);
	};

	constructor(
		rawMetadataArr?: RawMetadata[],
		intializeAllProperties: boolean = false,
	) {
		super();

		this.initializeAndSetProperties(
			SchoolMetadata.propertyInitilizers,
			rawMetadataArr,
			intializeAllProperties,
		);
	}
}
