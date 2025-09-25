import { BaseValidate } from "@/server/Managers/services/BaseValidate";

// TODO - Implement validation
export class Validate extends BaseValidate {
	rank(rank: number) {}

	age(age?: number) {}

	time(time: number) {}

	ageGroup(ageGroup: string) {}
}

export const ValidateInstance = new Validate();
