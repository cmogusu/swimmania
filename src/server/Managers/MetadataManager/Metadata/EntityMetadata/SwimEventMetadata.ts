import type { MetadataValue, RawMetadata } from "@/server/types";
import {
	NumberPropertyType,
	OptionsPropertyType,
	TextPropertyType,
} from "../MetadataPropertyType";
import type { MetadataPropertyInitializer } from "../types";
import { BaseEntityMetadata } from "./BaseEntityMetadata";
import { getPropertyInstance } from "./utils";

const propertyInitializers: Record<string, MetadataPropertyInitializer> = {
	eventNumber: (value?: MetadataValue) =>
		new NumberPropertyType({
			name: "eventNumber",
			title: "Event number",
			sortIndex: 10,
			value,
		}),

	swimStroke: (value?: MetadataValue) =>
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
					key: "individual_medley",
					value: "Individual medley",
				},
				{
					key: "freestyle_relay",
					value: "Freestyle relay",
				},
				{
					key: "medley_relay",
					value: "Medley relay",
				},
			],
			sortIndex: 12,
			value,
		}),

	swimDistance: (value?: MetadataValue) =>
		new OptionsPropertyType({
			name: "swimDistance",
			title: "Swim distance",
			options: [
				{
					key: "25",
					value: "25",
				},
				{
					key: "50",
					value: "50",
				},
				{
					key: "100",
					value: "100",
				},
				{
					key: "200",
					value: "200",
				},
				{
					key: "400",
					value: "400",
				},
				{
					key: "800",
					value: "800",
				},
				{
					key: "1500",
					value: "1500",
				},
				{
					key: "4x25",
					value: "4 x 25",
				},
				{
					key: "4x50",
					value: "4 x 50",
				},
				{
					key: "4x100",
					value: "4 x 100",
				},
			],
			sortIndex: 14,
			value,
		}),

	swimDistanceUnit: (value?: MetadataValue) =>
		new OptionsPropertyType({
			name: "swimDistanceUnit",
			title: "Swim distance unit",
			options: [
				{
					key: "meter",
					value: "Meter",
				},
				{
					key: "yard",
					value: "Yard",
				},
			],
			sortIndex: 16,
			value,
		}),

	gender: (value?: MetadataValue) =>
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
			sortIndex: 18,
			value,
		}),

	ageGroup: (value?: MetadataValue) =>
		new TextPropertyType({
			name: "ageGroup",
			title: "AgeGroup",
			sortIndex: 20,
			value,
		}),
};

export class SwimEventMetadata extends BaseEntityMetadata {
	static propertyInitilizers = propertyInitializers;

	static getPropertyInstance = (name: string, value?: MetadataValue) => {
		return getPropertyInstance(
			SwimEventMetadata.propertyInitilizers,
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
			SwimEventMetadata.propertyInitilizers,
			rawMetadata,
			intializeAllProperties,
		);
	}
}
