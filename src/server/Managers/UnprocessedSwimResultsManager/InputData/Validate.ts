import z from "zod";
import { BaseValidate } from "@/server/Managers/services/BaseValidate";

export class Validate extends BaseValidate {
	ageGroupValidator = z.string();
	rankValidator = z.number().positive().max(1000);
	eventNumberValidator = this.rankValidator;
	teamValidator = z.string();
	distanceValidator = z.string();
	distanceUnitValidator = z.enum(["meter", "yard"]);
	strokeValidator = z.enum([
		"freestyle",
		"butterfly",
		"backstroke",
		"breaststroke",
		"individual_medley",
		"freestyle_relay",
		"medley_relay",
	]);

	eventNumber(event: number | string) {
		this.eventNumberValidator.parse(event);
	}

	team(t: string) {
		this.teamValidator.parse(t);
	}

	distance(d: string) {
		this.distanceValidator.parse(d);
	}

	distanceUnit(u: string) {
		this.distanceUnitValidator.parse(u);
	}

	stroke(s: string) {
		this.strokeValidator.parse(s);
	}

	thirdName(name?: string) {
		if (name) {
			this.name(name);
		}
	}

	rank(rank: number) {
		this.rankValidator.parse(rank);
	}

	age(age?: number) {
		if (age) {
			super.age(age);
		}
	}

	ageGroup(ageGroup: string) {
		this.ageGroupValidator.parse(ageGroup);
	}
}

export const ValidateInstance = new Validate();
