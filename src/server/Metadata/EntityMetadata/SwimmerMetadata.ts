import { TextType } from "../MetadataType";
import type { RawMetadata } from "../types";
import { BaseEntityMetadata } from "./BaseEntityMetadata";

export class SwimmerMetadata extends BaseEntityMetadata {
	dob = new TextType({
		name: "dob",
		title: "Date of birth",
	});

	metadata = [this.dob];

	constructor(rawMetadataArr?: RawMetadata[]) {
		super();

		if (rawMetadataArr) {
			this.setValues(rawMetadataArr);
		}
	}
}
