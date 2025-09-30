import type { EntityType } from "../../../types";
import {
	entityMetadataFactory,
	type IEntityMetadata,
	type MetadataFilter,
} from "..";
import type { RawFilterByMetadataInputs } from "../types";
import { type Validate, ValidateInstance } from "./Validate";

export class FilterInputData {
	entityType: EntityType;
	filters: MetadataFilter[];
	entityMetadata: IEntityMetadata;

	readonly validate: Validate;

	constructor({ entityType, filters }: RawFilterByMetadataInputs) {
		this.entityType = entityType;
		this.filters = filters;
		this.entityMetadata = entityMetadataFactory.getInstance(
			entityType,
			undefined,
			true,
		);

		this.validate = ValidateInstance;
	}

	validateData() {
		this.validate.filters(this.filters);
		this.entityMetadata.sanitizeFilters(this.filters);
	}

	getSanitized() {
		return {
			entityType: this.entityType,
			filters: this.filters,
		};
	}
}
