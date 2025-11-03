import type { RawMetadata } from "@/server/types";
import {
	LatitudePropertyType,
	LongitudePropertyType,
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
			sortIndex: 8,
		}),

	firstName: (rawMetadata?: RawMetadata) =>
		new TextPropertyType({
			name: "firstName",
			title: "First name",
			sortIndex: 10,
			...rawMetadata,
		}),

	surname: (rawMetadata?: RawMetadata) =>
		new TextPropertyType({
			name: "surname",
			title: "Surname",
			sortIndex: 12,
			...rawMetadata,
		}),

	thirdName: (rawMetadata?: RawMetadata) =>
		new TextPropertyType({
			name: "thirdName",
			title: "Third name or Initial",
			sortIndex: 14,
			...rawMetadata,
		}),

	dob: (rawMetadata?: RawMetadata) =>
		new TextPropertyType({
			name: "dob",
			title: "Date of birth",
			sortIndex: 16,
			...rawMetadata,
		}),
};

export class LifeguardMetadata extends BaseEntityMetadata {
	static propertyInitilizers = propertyInitializers;

	static getPropertyInstance = (rawMetadata?: RawMetadata) => {
		return getPropertyInstance(
			LifeguardMetadata.propertyInitilizers,
			rawMetadata,
		);
	};

	constructor(
		rawMetadataArr?: RawMetadata[],
		intializeAllProperties: boolean = false,
	) {
		super();

		this.initializeAndSetProperties(
			LifeguardMetadata.propertyInitilizers,
			rawMetadataArr,
			intializeAllProperties,
		);
	}
}
