import type { EntityType, IEntityMetadata, RawMetadata } from "@/server/types";
import { entityMetadataFactory } from "..";
import type { RawInsertMetadataInputs } from "../types";
import { type Validate, ValidateInstance } from "./Validate";

export class InsertInputData {
	entityId: number;
	entityType: EntityType;
	_rawMetadata: RawMetadata;
	entityMetadata: IEntityMetadata;

	readonly validate: Validate;

	constructor(rawInputs: RawInsertMetadataInputs) {
		const { entityType, entityId, rawMetadata } = rawInputs;
		this.entityId = entityId;
		this.entityType = entityType;
		this._rawMetadata = rawMetadata;
		this.entityMetadata = entityMetadataFactory.getInstance(
			entityType,
			rawMetadata,
		);

		this.validate = ValidateInstance;
	}

	validateData() {
		// Metadata validation happens during creation of metadataProperty
		this.entityType = this.validate.entityType(this.entityType);
		this.entityId = this.validate.id(this.entityId);
	}

	get rawMetadata(): RawMetadata {
		return this.entityMetadata.dbValue;
	}
}
