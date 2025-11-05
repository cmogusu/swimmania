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
		return this.eventNumberValidator.parse(event);
	}

	team(t: string) {
		return this.teamValidator.parse(t);
	}

	distance(d: string) {
		return this.distanceValidator.parse(d);
	}

	distanceUnit(u: string) {
		return this.distanceUnitValidator.parse(u);
	}

	stroke(s: string) {
		return this.strokeValidator.parse(s);
	}

	thirdName(name?: string) {
		if (name) {
			return this.name(name);
		}
	}

	rank(rank: number) {
		return this.rankValidator.parse(rank);
	}

	ageGroup(ageGroup: string) {
		return this.ageGroupValidator.parse(ageGroup);
	}
}

export const ValidateInstance = new Validate();
