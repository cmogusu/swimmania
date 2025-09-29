import z from "zod";
import { BaseValidate } from "../../services/BaseValidate";
import { RelationshipTypeKeys } from "../RelationshipTypes";
import type { RelationshipType } from "../types";

export class Validate extends BaseValidate {
	relationshipTypeValidator = z.enum(RelationshipTypeKeys);

	relationshipType(type?: RelationshipType, isRequired?: true) {
		if (type || isRequired) {
			this.relationshipTypeValidator.parse(type);
		}
	}
}

export const ValidateInstance = new Validate();
