import { BaseInputData } from "@/server/Managers/services/BaseInputData";
import { isUndefined } from "@/server/utils";
import type { RawSwimResult } from "../types";
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
	}

	validateData() {
		this.eventNumber = this.validate.eventNumber(this.eventNumber);
		this.gender = this.validate.gender(this.gender);
		this.team = this.validate.team(this.team);
		this.distance = this.validate.distance(this.distance);
		this.distanceUnit = this.validate.distanceUnit(this.distanceUnit);
		this.stroke = this.validate.stroke(this.stroke);
		this.rank = this.validate.rank(this.rank);
		this.firstName = this.validate.name(this.firstName);
		this.surname = this.validate.name(this.surname);
		this.thirdName = this.validate.thirdName(this.thirdName);
		this.ageGroup = this.validate.ageGroup(this.ageGroup);
		this.time = this.validate.time(this.time);
		if (this.age) {
			this.age = this.validate.age(this.age);
		}
	}
}
