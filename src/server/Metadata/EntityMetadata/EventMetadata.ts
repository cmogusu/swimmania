import { DateType, TimeType } from "../MetadataType";
import type { RawMetadata } from "../types";
import { BaseEntityMetadata } from "./BaseEntityMetadata";

export class EventMetadata extends BaseEntityMetadata {
	date = new DateType({
		name: "date",
		title: "Event date",
	});

	time = new TimeType({
		name: "time",
		title: "Start time",
	});

	metadata = [this.date, this.time];

	constructor(rawMetadataArr?: RawMetadata[]) {
		super();

		if (rawMetadataArr) {
			this.setValues(rawMetadataArr);
		}
	}
}
