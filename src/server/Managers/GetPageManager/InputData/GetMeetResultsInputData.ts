import z from "zod";
import type { RawGetMeetResultsInputs } from "../types";

export class GetMeetResultsInputData {
	meetId: number;

	constructor({ meetId }: RawGetMeetResultsInputs) {
		this.meetId = meetId;
	}

	validateData() {
		this.meetId = z.coerce
			.number("Number expected")
			.positive("Positive number expected")
			.parse(this.meetId);
	}
}
