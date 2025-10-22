import type { EntityType, RawMetadata } from "@/server/types";
import { entityMetadataFactory, type IEntityMetadata } from "..";
import type { RawGetListMetadataInputs } from "../types";
import { type Sanitize, SanitizeInstance } from "./Sanitize";
import { type Validate, ValidateInstance } from "./Validate";

export class GetListInputData {
	entityId: number;
	entityType: EntityType;
	names: string[];

	entityMetadata: IEntityMetadata;

	readonly validate: Validate;
	readonly sanitize: Sanitize;

	constructor(rawInputs: RawGetListMetadataInputs) {
		const { names, entityType, entityId } = rawInputs;
		this.entityId = entityId;
		this.entityType = entityType;
		this.names = names;

		this.entityMetadata = this.getEntityMetadataInstance(entityType, names);

		this.validate = ValidateInstance;
		this.sanitize = SanitizeInstance;
	}

	validateData() {
		// Important validation happens during creation of metadataProperty
		this.validate.entityType(this.entityType);
		this.validate.id(this.entityId);
	}

	getSanitized() {
		return {
			entityId: this.sanitize.id(this.entityId),
			entityType: this.entityType,
			names: this.entityMetadata.getNames(),
		};
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
