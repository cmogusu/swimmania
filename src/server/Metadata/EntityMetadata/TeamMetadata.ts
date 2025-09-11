import {
	LatitudeType,
	LongitudeType,
	NumberType,
	ParentType,
} from "../MetadataType";
import type { RawMetadata } from "../types";
import { BaseEntityMetadata } from "./BaseEntityMetadata";

export class TeamMetadata extends BaseEntityMetadata {
	openToPublic = new NumberType({
		name: "openToPublic",
		title: "Open to public",
	});

	membershipFee = new ParentType({
		name: "membershipFee",
		title: "Membership fee",
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

	location = new ParentType({
		name: "location",
		title: "Location of base",
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

	metadata = [this.openToPublic, this.membershipFee, this.location];

	constructor(rawMetadataArr?: RawMetadata[]) {
		super();

		if (rawMetadataArr) {
			this.setValues(rawMetadataArr);
		}
	}
}
