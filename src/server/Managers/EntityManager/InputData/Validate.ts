import z from "zod";
import type { MetadataFilter } from "@/server/Managers/MetadataManager";
import { BaseValidate } from "@/server/Managers/services/BaseValidate";

export class Validate extends BaseValidate {
	locationValidator = z.optional(z.string().min(2).max(255));
	filterValidator = z.optional(
		z
			.array(
				z.object({
					name: this.nameValidator,
					value: z.union([z.boolean(), z.number(), z.string()]),
				}),
			)
			.min(1),
	);

	location(location?: string) {
		return this.locationValidator.parse(location);
	}

	filters(filters?: MetadataFilter[]) {
		return this.filterValidator.parse(filters);
	}
}

export const ValidateInstance = new Validate();
