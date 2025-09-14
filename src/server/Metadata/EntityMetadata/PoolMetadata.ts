import {
	BooleanType,
	LatitudeType,
	LongitudeType,
	NumberType,
	OptionsType,
	ParentType,
	RatingsType,
	TimeType,
} from "../MetadataType";
import type { RawMetadata } from "../types";
import { BaseEntityMetadata } from "./BaseEntityMetadata";

export class PoolMetadata extends BaseEntityMetadata {
	hostInstitutionType = new OptionsType({
		name: "hostInstitutionType",
		title: "Host type",
		options: [
			{
				key: "hotel",
				value: "Hotel",
			},
			{
				key: "school",
				value: "School",
			},
			{
				key: "gym",
				value: "Gym",
			},
		],
	});

	poolShape = new OptionsType({
		name: "poolShape",
		title: "Shape of pool",
		options: [
			{
				key: "round",
				value: "Round",
			},
			{
				key: "rectangle",
				value: "Rectangle",
			},
			{
				key: "square",
				value: "Square",
			},
			{
				key: "curvy",
				value: "Curvy",
			},
		],
	});

	poolDimensions = new ParentType({
		name: "poolDimensions",
		title: "Pool dimensions",
		children: [
			new NumberType({
				name: "length",
				title: "Length",
				suffix: " meters",
			}),
			new NumberType({
				name: "width",
				title: "Width",
				suffix: " meters",
			}),
		],
	});

	operatingHours = new ParentType({
		name: "operatingHours",
		title: "Operating hours",
		children: [
			new TimeType({
				name: "opening",
				title: "Opening hours",
			}),
			new TimeType({
				name: "closing",
				title: "Closing hours",
			}),
		],
	});

	crowdiness = new RatingsType({
		name: "crowdiness",
		title: "How crowded",
	});

	openToPublic = new BooleanType({
		name: "openToPublic",
		title: "Open to public",
	});

	openToChildren = new BooleanType({
		name: "openToChildren",
		title: "Open to children",
	});

	hasLaneRopes = new BooleanType({
		name: "hasLaneRopes",
		title: "Lane ropes",
	});

	isHeated = new BooleanType({
		name: "isHeated",
		title: "Heated",
	});

	entryFeeIn = new ParentType({
		name: "entryFeeIn",
		title: "Entry fee",
		children: [
			new NumberType({
				name: "ksh",
				prefix: "Ksh ",
				title: "Shillings",
			}),
			new NumberType({
				name: "usd",
				prefix: "Usd ",
				title: "Usd",
			}),
		],
	});

	isIndoor = new BooleanType({
		name: "isIndoor",
		title: "Indoor pool",
	});

	cleanliness = new RatingsType({
		name: "cleanliness",
		title: "Cleanliness",
	});

	changingRoomCleanliness = new RatingsType({
		name: "changingRoomCleanliness",
		title: "Cleanliness of changing room",
	});

	hasOnDutyLifeguard = new BooleanType({
		name: "hasOnDutyLifeguard",
		title: "Lifeguards",
	});

	location = new ParentType({
		name: "location",
		title: "Location",
		children: [
			new LatitudeType({
				name: "lat",
				title: "Latitude",
				isHidden: true,
			}),
			new LongitudeType({
				name: "lng",
				title: "Longitude",
				isHidden: true,
			}),
		],
	});

	metadata = [
		this.hostInstitutionType,
		this.poolShape,
		this.poolDimensions,
		this.operatingHours,
		this.crowdiness,
		this.openToPublic,
		this.openToChildren,
		this.hasLaneRopes,
		this.isHeated,
		this.entryFeeIn,
		this.isIndoor,
		this.cleanliness,
		this.changingRoomCleanliness,
		this.hasOnDutyLifeguard,
		this.location,
	];

	constructor(rawMetadataArr?: RawMetadata[]) {
		super();

		if (rawMetadataArr) {
			this.setValues(rawMetadataArr);
		}
	}
}
