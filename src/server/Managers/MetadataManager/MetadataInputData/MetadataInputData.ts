/** biome-ignore-all lint/style/noNonNullAssertion: TODO - Find better fix */
import { isUndefined } from "@/server/utils";
import {
	entityMetadataFactory,
	type IMetadataPropertyType,
	type MetadataFilter,
	type MetadataValue,
} from "../../../Metadata";
import type { EntityType } from "../../../types";
import { BaseInputData } from "../../services/BaseInputData";
import type { MetadataRawInputs } from "../types";
import { type Sanitize, SanitizeInstance } from "./Sanitize";
import { type Validate, ValidateInstance } from "./Validate";

export class MetadataInputData extends BaseInputData {
	readonly id?: number;
	readonly entityId?: number;
	readonly entityType?: EntityType;
	readonly name?: string;
	readonly value?: MetadataValue;
	readonly itemIndex?: number = 0;
	readonly filters?: MetadataFilter[];

	readonly validate: Validate;
	readonly sanitize: Sanitize;

	metadataProperty?: IMetadataPropertyType;

	constructor({
		id,
		name,
		value,
		entityType,
		entityId,
		itemIndex,
		filters,
	}: MetadataRawInputs) {
		super();

		if (!isUndefined(id)) this.id = id;
		if (!isUndefined(entityId)) this.entityId = entityId;
		if (!isUndefined(entityType)) this.entityType = entityType;
		if (!isUndefined(name)) this.name = name;
		if (!isUndefined(value)) this.value = value;
		if (!isUndefined(itemIndex)) this.itemIndex = itemIndex;
		if (!isUndefined(filters)) this.filters = filters;

		this.validate = ValidateInstance;
		this.sanitize = SanitizeInstance;
	}

	validateGetAllInputs() {
		this.validate.entityType(this.entityType);
		this.validate.id(this.entityId);
	}

	validateGetByIdInputs() {
		this.validate.entityType(this.entityType);
		this.validate.id(this.id);
		this.validate.id(this.entityId);
	}

	validateUpdateInputs() {
		this.validate.id(this.id);
		this.validatePostInputs();
	}

	validatePostInputs() {
		this.validate.entityType(this.entityType);
		this.validate.id(this.entityId);
		this.validate.itemIndex(this.itemIndex);

		this.createMetadataPropertyInstance();
	}

	validateDeleteInputs() {
		this.validateGetByIdInputs();
	}

	validateFilterByInputs() {
		this.validate.entityType(this.entityType);
		this.createMetadataPropertyInstance();
		// this.metadata!.validateFilters(this.filters);
	}

	getSanitizedGetAllData() {
		return {
			entityId: this.entityId!,
		};
	}

	getSanitizedGetByData() {
		return {
			id: this.id!,
			entityId: this.entityId!,
		};
	}

	getSanitizedFilterByData() {
		this.createMetadataPropertyInstance();

		return {
			entityType: this.entityType,
			// filters: this.metadata!.sanitizeFilters(this.filters),
			filters: this.filters,
		};
	}

	getSanitizedInsertData() {
		this.createMetadataPropertyInstance();

		return {
			name: this.metadataProperty!.name,
			value: this.metadataProperty!.value,
			type: this.metadataProperty!.type,
			entityId: this.entityId,
			entityType: this.entityType,
		};
	}

	getSanitizedUpdateData() {
		return {
			id: this.id!,
			...this.getSanitizedInsertData(),
		};
	}

	getSanitizedDeleteData() {
		return {
			id: this.id!,
			entityId: this.entityId!,
		};
	}

	createMetadataPropertyInstance() {
		if (this.metadataProperty) {
			return;
		}

		if (!this.entityType) {
			throw Error("Entity type not set");
		}

		const rawMetadata = {
			id: this.id,
			entityId: this.entityId,
			entityType: this.entityType,
			name: this.name!,
			value: this.value,
			itemIndex: this.itemIndex,
		};

		const property = entityMetadataFactory.getPropertyInstance(
			this.entityType,
			rawMetadata,
		);

		this.metadataProperty =
			property.type === "parent" ? property.getChild(this.name) : property;
	}
}
