import type { MetadataValue, RawMetadata } from "@/server/types";
import {
	DatePropertyType,
	LatitudePropertyType,
	LongitudePropertyType,
	OptionsPropertyType,
	ParentPropertyType,
	TextPropertyType,
	TimePropertyType,
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

	meetDates: () =>
		new ParentPropertyType({
			name: "meetDates",
			title: "Event date",
			childInitializers: {
				startDate: (value?: MetadataValue) =>
					new DatePropertyType({
						name: "startDate",
						title: "Start date",
						value,
					}),
				endDate: (value?: MetadataValue) =>
					new DatePropertyType({
						name: "endDate",
						title: "End date",
						value,
					}),
			},
			sortIndex: 10,
		}),

	course: (value?: MetadataValue) =>
		new OptionsPropertyType({
			name: "course",
			title: "Course",
			options: [
				{
					key: "short",
					value: "Short course",
				},
				{
					key: "long",
					value: "Long course",
				},
			],
			sortIndex: 12,
			value,
		}),

	time: (value?: MetadataValue) =>
		new TimePropertyType({
			name: "time",
			title: "Start time",
			sortIndex: 14,
			value,
		}),
};

export class SwimMeetMetadata extends BaseEntityMetadata {
	static propertyInitilizers = propertyInitializers;

	static getPropertyInstance = (name: string, value?: MetadataValue) => {
		return getPropertyInstance(
			SwimMeetMetadata.propertyInitilizers,
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
			SwimMeetMetadata.propertyInitilizers,
			rawMetadata,
			intializeAllProperties,
		);
	}
}
