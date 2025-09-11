import { NumberType, ParentType, RatingsType, TimeType } from "../MetadataType";
import type { RawMetadata } from "../types";
import { BaseEntityMetadata } from "./BaseEntityMetadata";

export class CoachMetadata extends BaseEntityMetadata {
	performance = new RatingsType({
		name: "performance",
		title: "How did the coach perform",
	});

	friendliness = new RatingsType({
		name: "friendliness",
		title: "How friendly",
	});

	experience = new NumberType({
		name: "experience",
		title: "Years of experience",
	});

	ratePerHour = new ParentType({
		name: "ratePerHour",
		title: "Hourly rate",
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

	workingHours = new ParentType({
		name: "workingHours",
		title: "Working hours",
		children: [
			new TimeType({
				name: "opening",
				title: "Opening",
				value: "8:00",
			}),
			new TimeType({
				name: "closing",
				title: "Closing",
				value: "17:00",
			}),
		],
	});

	metadata = [
		this.performance,
		this.friendliness,
		this.experience,
		this.ratePerHour,
		this.workingHours,
	];

	constructor(rawMetadataArr?: RawMetadata[]) {
		super();

		if (rawMetadataArr) {
			this.setValues(rawMetadataArr);
		}
	}
}
