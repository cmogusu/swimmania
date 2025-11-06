import type { EntityType, IEntityMetadata, RawMetadata } from "@/server/types";
import { entityMetadataFactory } from "..";
import { formatColumnNameForDb } from "../Manager/utils";
import type { RawInsertMetadataInputs } from "../types";
import { type Validate, ValidateInstance } from "./Validate";

export class InsertInputData {
	entityId: number;
	entityType: EntityType;
	_rawMetadataArr: RawMetadata[];
	entityMetadata: IEntityMetadata;

	readonly validate: Validate;

	constructor(rawInputs: RawInsertMetadataInputs) {
		const { entityType, entityId, rawMetadataArr } = rawInputs;
		this.entityId = entityId;
		this.entityType = entityType;
		this._rawMetadataArr = rawMetadataArr;
		this.entityMetadata = entityMetadataFactory.getInstance(
			entityType,
			rawMetadataArr,
		);

		this.validate = ValidateInstance;
	}

	validateData() {
		// Metadata validation happens during creation of metadataProperty
		this.entityType = this.validate.entityType(this.entityType);
		this.entityId = this.validate.id(this.entityId);
	}

	get rawMetadataArr(): RawMetadata[] {
		return this.entityMetadata.dbValue.map((v) => ({
			...v,
			name: formatColumnNameForDb(v.name),
		}));
	}
}
