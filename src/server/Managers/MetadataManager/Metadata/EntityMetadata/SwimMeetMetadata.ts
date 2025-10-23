import type { RawMetadata } from "@/server/types";
import {
	DatePropertyType,
	OptionsPropertyType,
	ParentPropertyType,
	TimePropertyType,
} from "../MetadataPropertyType";
import type { MetadataPropertyInitializer } from "../types";
import { BaseEntityMetadata } from "./BaseEntityMetadata";
import { getMetadataProperties, getPropertyInstance } from "./utils";

const propertyInitializers: Record<string, MetadataPropertyInitializer> = {
	startEndDates: () =>
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
			sortIndex: 0,
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
			sortIndex: 0,
			...rawMetadata,
		}),

	time: (rawMetadata?: RawMetadata) =>
		new TimePropertyType({
			name: "time",
			title: "Start time",
			sortIndex: 2,
			...rawMetadata,
		}),
};

export class SwimMeetMetadata extends BaseEntityMetadata {
	dbTableName: string = "swm_meet_metadata";

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

		const properties = getMetadataProperties(
			SwimMeetMetadata.propertyInitilizers,
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
