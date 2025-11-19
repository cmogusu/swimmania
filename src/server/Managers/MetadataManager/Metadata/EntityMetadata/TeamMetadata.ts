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
			title: "Location of base",
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

	openToPublic: (value?: MetadataValue) =>
		new NumberPropertyType({
			name: "openToPublic",
			title: "Open to public",
			sortIndex: 10,
			value,
		}),

	membershipFee: () =>
		new ParentPropertyType({
			name: "membershipFee",
			title: "Membership fee",
			childInitializers: {
				ksh: (value?: MetadataValue) =>
					new NumberPropertyType({
						name: "ksh",
						prefix: "Ksh ",
						title: "Shillings",
						min: 0,
						max: 1e5,
						value,
					}),
				usd: (value?: MetadataValue) =>
					new NumberPropertyType({
						name: "usd",
						prefix: "Usd ",
						title: "Usd",
						min: 0,
						max: 1e5,
						value,
					}),
			},
			sortIndex: 12,
		}),
};

export class TeamMetadata extends BaseEntityMetadata {
	static propertyInitilizers = propertyInitializers;

	static getPropertyInstance = (name: string, value?: MetadataValue) => {
		return getPropertyInstance(TeamMetadata.propertyInitilizers, name, value);
	};

	constructor(
		rawMetadata?: RawMetadata,
		intializeAllProperties: boolean = false,
	) {
		super();

		this.initializeAndSetProperties(
			TeamMetadata.propertyInitilizers,
			rawMetadata,
			intializeAllProperties,
		);
	}
}
