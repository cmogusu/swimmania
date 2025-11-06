import type { EntityType, IEntityMetadata, RawMetadata } from "@/server/types";
import { entityMetadataFactory } from "..";
import { formatColumnNameForDb } from "../Manager/utils";
import type { RawGetListMetadataInputs } from "../types";
import { type Validate, ValidateInstance } from "./Validate";

export class GetListInputData {
	entityId: number;
	entityType: EntityType;
	_names: string[];
	entityMetadata: IEntityMetadata;
	validate: Validate;

	constructor(rawInputs: RawGetListMetadataInputs) {
		const { names, entityType, entityId } = rawInputs;
		this.entityId = entityId;
		this.entityType = entityType;
		this._names = names;
		this.entityMetadata = this.getEntityMetadataInstance(entityType, names);
		this.validate = ValidateInstance;
	}

	validateData() {
		// Important validation happens during creation of metadataProperty
		this.entityId = this.validate.id(this.entityId);
		this.entityType = this.validate.entityType(this.entityType);
	}

	get names() {
		return this._names.map(formatColumnNameForDb);
	}

	getEntityMetadataInstance(entityType: EntityType, names: string[]) {
		const rawMetadataArr = names.map(
			(name: string) =>
				({
					name,
				}) as RawMetadata,
		);

		return entityMetadataFactory.getInstance(entityType, rawMetadataArr);
	}
}
