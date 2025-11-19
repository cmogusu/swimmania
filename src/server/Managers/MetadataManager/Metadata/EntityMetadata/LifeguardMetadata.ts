import type { MetadataValue, RawMetadata } from "@/server/types";
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
			sortIndex: 8,
		}),

	firstName: (value?: MetadataValue) =>
		new TextPropertyType({
			name: "firstName",
			title: "First name",
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

	thirdName: (value?: MetadataValue) =>
		new TextPropertyType({
			name: "thirdName",
			title: "Third name or Initial",
			sortIndex: 14,
			value,
		}),

	dob: (value?: MetadataValue) =>
		new TextPropertyType({
			name: "dob",
			title: "Date of birth",
			sortIndex: 16,
			value,
		}),
};

export class LifeguardMetadata extends BaseEntityMetadata {
	static propertyInitilizers = propertyInitializers;

	static getPropertyInstance = (name: string, value?: MetadataValue) => {
		return getPropertyInstance(
			LifeguardMetadata.propertyInitilizers,
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
			LifeguardMetadata.propertyInitilizers,
			rawMetadata,
			intializeAllProperties,
		);
	}
}
