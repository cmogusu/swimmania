import { BaseInputData } from "@/server/Managers/services/BaseInputData";
import { isUndefined } from "@/server/utils";
import type { RawSwimResult } from "../types";
import { type Sanitize, SanitizeInstance } from "./Sanitize";
import { type Validate, ValidateInstance } from "./Validate";

export class SwimResultInputData extends BaseInputData {
	rank: number;
	firstName: string;
	surname: string;
	thirdName: string | undefined;
	age: number | undefined;
	ageGroup: string;
	time: number;

	validate: Validate;
	sanitize: Sanitize;

	constructor({
		rank,
		firstName,
		surname,
		thirdName,
		age,
		ageGroup,
		time,
	}: RawSwimResult) {
		super();

		this.rank = rank;
		this.firstName = firstName;
		this.surname = surname;
		this.thirdName = thirdName;
		this.ageGroup = ageGroup;
		this.time = time;

		if (!isUndefined(age)) this.age = age;

		this.validate = ValidateInstance;
		this.sanitize = SanitizeInstance;
	}

	validateInsertInputs() {
		this.validate.rank(this.rank);
		this.validate.name(this.firstName);
		this.validate.name(this.surname);
		if (this.thirdName) this.validate.name(this.thirdName);
		this.validate.age(this.age);
		this.validate.ageGroup(this.ageGroup);
		this.validate.time(this.time);
	}

	getSanitizedInsertData() {
		return {
			rank: this.rank,
			firstName: this.firstName,
			surname: this.surname,
			thirdName: this.thirdName,
			age: this.age,
			ageGroup: this.ageGroup,
			time: this.time,
		};
	}
}
