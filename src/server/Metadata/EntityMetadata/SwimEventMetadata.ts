import {
	NumberPropertyType,
	OptionsPropertyType,
	TextPropertyType,
} from "../MetadataPropertyType";
import type { MetadataPropertyInitializer, RawMetadata } from "../types";
import { BaseEntityMetadata } from "./BaseEntityMetadata";
import { getMetadataProperties, getPropertyInstance } from "./utils";

const propertyInitializers: Record<string, MetadataPropertyInitializer> = {
	eventNumber: (rawMetadata?: RawMetadata) =>
		new NumberPropertyType({
			name: "eventNumber",
			title: "Event number",
			sortIndex: 0,
			...rawMetadata,
		}),

	swimStroke: (rawMetadata?: RawMetadata) =>
		new OptionsPropertyType({
			name: "swimStroke",
			title: "Swim stroke",
			options: [
				{
					key: "freestyle",
					value: "Freestyle / front crawl",
				},
				{
					key: "butterfly",
					value: "Butterfly",
				},
				{
					key: "backstroke",
					value: "Back stroke",
				},
				{
					key: "breaststroke",
					value: "Breast stroke",
				},
				{
					key: "im",
					value: "Individual medlay",
				},
				{
					key: "free-relay",
					value: "Free relay",
				},
				{
					key: "medley-relay",
					value: "Medley relay",
				},
			],
			sortIndex: 2,
			...rawMetadata,
		}),

	swimDistance: (rawMetadata?: RawMetadata) =>
		new OptionsPropertyType({
			name: "swimDistance",
			title: "Swim distance",
			options: [
				{
					key: "25m",
					value: "25 meters",
				},
				{
					key: "50m",
					value: "50 meters",
				},
				{
					key: "100m",
					value: "100 meters",
				},
				{
					key: "200m",
					value: "200 meters",
				},
				{
					key: "400m",
					value: "400 meters",
				},
				{
					key: "800m",
					value: "800 meters",
				},
				{
					key: "1500m",
					value: "1500 meters",
				},
			],
			sortIndex: 4,
			...rawMetadata,
		}),

	gender: (rawMetadata?: RawMetadata) =>
		new OptionsPropertyType({
			name: "gender",
			title: "Gender",
			options: [
				{
					key: "male",
					value: "Men",
				},
				{
					key: "female",
					value: "Women",
				},
			],
			sortIndex: 6,
			...rawMetadata,
		}),

	ageGroup: (rawMetadata?: RawMetadata) =>
		new TextPropertyType({
			name: "ageGroup",
			title: "AgeGroup",
			sortIndex: 8,
			...rawMetadata,
		}),
};

export class SwimEventMetadata extends BaseEntityMetadata {
	static propertyInitilizers = propertyInitializers;

	static getPropertyInstance = (rawMetadata?: RawMetadata) => {
		return getPropertyInstance(
			SwimEventMetadata.propertyInitilizers,
			rawMetadata,
		);
	};

	constructor(
		rawMetadataArr?: RawMetadata[],
		intializeAllProperties: boolean = false,
	) {
		super();

		const properties = getMetadataProperties(
			SwimEventMetadata.propertyInitilizers,
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
