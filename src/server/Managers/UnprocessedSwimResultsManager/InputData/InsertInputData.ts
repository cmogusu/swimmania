import { BaseInputData } from "@/server/Managers/services/BaseInputData";
import { isUndefined } from "@/server/utils";
import type { RawSwimResult } from "../types";
import { type Sanitize, SanitizeInstance } from "./Sanitize";
import { type Validate, ValidateInstance } from "./Validate";

export class InsertInputData extends BaseInputData {
	eventNumber: number;
	gender: string;
	team: string;
	distance: string;
	distanceUnit: string;
	stroke: string;
	rank: number;
	firstName: string;
	surname: string;
	thirdName: string | undefined;
	age: number | undefined;
	ageGroup: string;
	time: string;

	validate: Validate;
	sanitize: Sanitize;

	constructor({
		eventNumber,
		gender,
		team,
		distance,
		distanceUnit,
		stroke,
		rank,
		firstName,
		surname,
		thirdName,
		age,
		ageGroup,
		time,
	}: RawSwimResult) {
		super();

		this.eventNumber = eventNumber;
		this.gender = gender;
		this.team = team;
		this.distance = distance;
		this.distanceUnit = distanceUnit;
		this.stroke = stroke;
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

	validateData() {
		this.validate.eventNumber(this.eventNumber);
		this.validate.gender(this.gender);
		this.validate.team(this.team);
		this.validate.distance(this.distance);
		this.validate.distanceUnit(this.distanceUnit);
		this.validate.stroke(this.stroke);
		this.validate.rank(this.rank);
		this.validate.name(this.firstName);
		this.validate.name(this.surname);
		this.validate.thirdName(this.thirdName);
		this.validate.age(this.age);
		this.validate.ageGroup(this.ageGroup);
		this.validate.time(this.time);
	}

	getSanitized() {
		return {
			eventNumber: this.eventNumber,
			gender: this.gender,
			team: this.sanitize.team(this.team),
			distance: this.sanitize.distance(this.distance),
			distanceUnit: this.distanceUnit,
			stroke: this.stroke,
			rank: this.sanitize.number(this.rank),
			firstName: this.sanitize.name(this.firstName),
			surname: this.sanitize.name(this.surname),
			thirdName: this.sanitize.thirdName(this.thirdName),
			age: this.age,
			ageGroup: this.sanitize.ageGroup(this.ageGroup),
			time: this.time,
		};
	}
}
