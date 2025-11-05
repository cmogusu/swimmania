import type {
	EntityType,
	IEntityMetadata,
	MetadataFilter,
} from "@/server/types";
import { BaseInputData } from "../../services";
import { entityMetadataFactory } from "..";
import type { RawFilterByMetadataInputs } from "../types";
import { type Validate, ValidateInstance } from "./Validate";

export class FilterInputData extends BaseInputData {
	entityType: EntityType;
	filters: MetadataFilter[];
	entityMetadata: IEntityMetadata;
	validate: Validate;

	constructor({
		entityType,
		filters,
		pageSize,
		pageNumber,
	}: RawFilterByMetadataInputs) {
		super();

		this.entityType = entityType;
		this.filters = filters;
		this.entityMetadata = entityMetadataFactory.getInstance(
			entityType,
			undefined,
			true,
		);

		this.pageSize = pageSize;
		this.pageNumber = pageNumber;
		this.validate = ValidateInstance;
	}

	validateData() {
		this.validate.filters(this.filters);
		this.filters = this.entityMetadata.validateFilters(this.filters);
	}
}
