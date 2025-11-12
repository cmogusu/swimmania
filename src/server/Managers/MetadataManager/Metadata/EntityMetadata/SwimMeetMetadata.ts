import type { RawMetadata } from "@/server/types";
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

	meetDates: () =>
		new ParentPropertyType({
			name: "startEndDates",
			title: "Event date",
			childInitializers: {
				startDate: (rawMetadata?: RawMetadata) =>
					new DatePropertyType({
						name: "startDate",
						title: "Start date",
						...rawMetadata,
					}),
				endDate: (rawMetadata?: RawMetadata) =>
					new DatePropertyType({
						name: "endDate",
						title: "End date",
						...rawMetadata,
					}),
			},
			sortIndex: 10,
		}),

	course: (rawMetadata?: RawMetadata) =>
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
			...rawMetadata,
		}),

	time: (rawMetadata?: RawMetadata) =>
		new TimePropertyType({
			name: "time",
			title: "Start time",
			sortIndex: 14,
			...rawMetadata,
		}),
};

export class SwimMeetMetadata extends BaseEntityMetadata {
	static propertyInitilizers = propertyInitializers;

	static getPropertyInstance = (rawMetadata?: RawMetadata) => {
		return getPropertyInstance(
			SwimMeetMetadata.propertyInitilizers,
			rawMetadata,
		);
	};

	constructor(
		rawMetadataArr?: RawMetadata[],
		intializeAllProperties: boolean = false,
	) {
		super();

		this.initializeAndSetProperties(
			SwimMeetMetadata.propertyInitilizers,
			rawMetadataArr,
			intializeAllProperties,
		);
	}
}
