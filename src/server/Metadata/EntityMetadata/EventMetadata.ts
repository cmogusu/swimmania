import {
	DatePropertyType,
	ParentPropertyType,
	TimePropertyType,
} from "../MetadataPropertyType";
import type { MetadataPropertyInitializer, RawMetadata } from "../types";
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
				width: (rawMetadata?: RawMetadata) =>
					new DatePropertyType({
						name: "endDate",
						title: "End date",
						...rawMetadata,
					}),
			},
			sortIndex: 0,
		}),

	time: (rawMetadata?: RawMetadata) =>
		new TimePropertyType({
			name: "time",
			title: "Start time",
			sortIndex: 2,
			...rawMetadata,
		}),
};

export class EventMetadata extends BaseEntityMetadata {
	static propertyInitilizers = propertyInitializers;

	static getPropertyInstance = (rawMetadata?: RawMetadata) => {
		return getPropertyInstance(EventMetadata.propertyInitilizers, rawMetadata);
	};

	constructor(
		rawMetadataArr?: RawMetadata[],
		intializeAllProperties: boolean = false,
	) {
		super();

		const properties = getMetadataProperties(
			EventMetadata.propertyInitilizers,
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
