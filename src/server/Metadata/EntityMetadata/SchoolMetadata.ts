import { NumberType, ParentType } from "../MetadataType";
import type { RawMetadata } from "../types";
import { BaseEntityMetadata } from "./BaseEntityMetadata";

export class SchoolMetadata extends BaseEntityMetadata {
	averageSchoolFees = new ParentType({
		name: "averageSchoolFees",
		title: "Average school fee",
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

	metadata = [this.averageSchoolFees];

	constructor(rawMetadataArr?: RawMetadata[]) {
		super();

		if (rawMetadataArr) {
			this.setValues(rawMetadataArr);
		}
	}
}
