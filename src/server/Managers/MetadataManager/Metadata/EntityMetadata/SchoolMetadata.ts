import type { MetadataValue, RawMetadata } from "@/server/types";
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
				lat: (value?: MetadataValue) =>
					new LatitudePropertyType({
						name: "lat",
						title: "Latitude",
						value,
					}),
				lng: (value?: MetadataValue) =>
					new LongitudePropertyType({
						name: "lng",
						title: "Longitude",
						value,
					}),
				name: (value?: MetadataValue) =>
					new TextPropertyType({
						name: "name",
						title: "Name",
						value,
					}),
			},
			sortIndex: 10,
		}),

	averageSchoolFees: () =>
		new ParentPropertyType({
			name: "averageSchoolFees",
			title: "Average school fee",
			childInitializers: {
				ksh: (value?: MetadataValue) =>
					new NumberPropertyType({
						name: "ksh",
						prefix: "Ksh ",
						title: "Shillings",
						min: 0,
						max: 1e7,
						value,
					}),
				usd: (value?: MetadataValue) =>
					new NumberPropertyType({
						name: "usd",
						prefix: "Usd ",
						title: "Usd",
						min: 0,
						max: 1e6,
						value,
					}),
			},
			sortIndex: 12,
		}),
};

export class SchoolMetadata extends BaseEntityMetadata {
	static propertyInitilizers = propertyInitializers;

	static getPropertyInstance = (name: string, value?: MetadataValue) => {
		return getPropertyInstance(SchoolMetadata.propertyInitilizers, name, value);
	};

	constructor(
		rawMetadata?: RawMetadata,
		intializeAllProperties: boolean = false,
	) {
		super();

		this.initializeAndSetProperties(
			SchoolMetadata.propertyInitilizers,
			rawMetadata,
			intializeAllProperties,
		);
	}
}
