import type { EntityType, IEntityMetadata, RawMetadata } from "@/server/types";
import { entityMetadataFactory } from "..";
import type { RawGetListMetadataInputs } from "../types";
import { type Validate, ValidateInstance } from "./Validate";

export class GetListInputData {
	entityId: number;
	entityType: EntityType;
	names: string[];
	entityMetadata: IEntityMetadata;
	validate: Validate;

	constructor(rawInputs: RawGetListMetadataInputs) {
		const { names, entityType, entityId } = rawInputs;
		this.entityId = entityId;
		this.entityType = entityType;
		this.names = names;
		this.entityMetadata = this.getEntityMetadataInstance(entityType, names);
		this.validate = ValidateInstance;
	}

	validateData() {
		// Important validation happens during creation of metadataProperty
		this.entityId = this.validate.id(this.entityId);
		this.entityType = this.validate.entityType(this.entityType);
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
