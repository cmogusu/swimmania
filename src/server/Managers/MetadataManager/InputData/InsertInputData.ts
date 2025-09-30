import { isUndefined } from "@/server/utils";
import type { EntityType } from "../../../types";
import {
	entityMetadataFactory,
	type IMetadataPropertyType,
	type MetadataValue,
} from "..";
import type { RawInsertMetadataInputs } from "../types";
import { type Sanitize, SanitizeInstance } from "./Sanitize";
import { type Validate, ValidateInstance } from "./Validate";

export class InsertInputData {
	entityId: number;
	entityType: EntityType;
	name: string;
	value?: MetadataValue;
	itemIndex?: number = 0;

	metadataProperty: IMetadataPropertyType;

	readonly validate: Validate;
	readonly sanitize: Sanitize;

	constructor(rawInputs: RawInsertMetadataInputs) {
		const { name, value, entityType, entityId, itemIndex } = rawInputs;
		this.entityId = entityId;
		this.entityType = entityType;
		this.name = name;

		if (!isUndefined(value)) this.value = value;
		if (!isUndefined(itemIndex)) this.itemIndex = itemIndex;

		this.metadataProperty = this.getMetadataPropertyInstance(
			entityType,
			rawInputs,
		);

		this.validate = ValidateInstance;
		this.sanitize = SanitizeInstance;
	}

	validateData() {
		// Important validation happens during creation of metadataProperty
		this.validate.entityType(this.entityType);
		this.validate.id(this.entityId);
		this.validate.itemIndex(this.itemIndex);
	}

	getSanitized() {
		const { name, value, type } = this.metadataProperty;

		return {
			name,
			value,
			type,
			entityId: this.sanitize.id(this.entityId),
			entityType: this.entityType,
		};
	}

	getMetadataPropertyInstance(
		entityType: EntityType,
		rawMetadata: RawInsertMetadataInputs,
	) {
		const property = entityMetadataFactory.getPropertyInstance(
			entityType,
			rawMetadata,
		);

		return property.type === "parent"
			? property.getChild(rawMetadata.name)
			: property;
	}
}
