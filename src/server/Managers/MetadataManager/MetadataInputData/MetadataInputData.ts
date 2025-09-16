/** biome-ignore-all lint/style/noNonNullAssertion: TODO - Find better fix */
import { isUndefined } from "@/server/utils";
import {
	EntityMetadataFactory,
	type IEntityMetadata,
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
		this.validate.name(this.name);
		this.validate.value(this.value);
		this.validate.itemIndex(this.itemIndex);

		this.createMetadataInstance();
		this.metadata!.validateMetadata(this.name, this.value);
	}

	validateDeleteInputs() {
		this.validateGetByIdInputs();
	}

	validateFilterByInputs() {
		this.validate.entityType(this.entityType);
		this.createMetadataInstance();
		this.metadata!.validateFilters(this.filters);
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
		this.createMetadataInstance();

		return {
			entityType: this.entityType,
			filters: this.metadata!.sanitizeFilters(this.filters),
		};
	}

	getSanitizedInsertData() {
		this.createMetadataInstance();
		const { name, metadata } = this;
		const property = metadata!.metadata.find((m) => m.name === name);
		if (!property) {
			throw Error("missing metadata item");
		}

		return {
			id: property.id,
			name: property.name,
			value: property.value,
			entityId: this.entityId,
			entityType: this.entityType,
		};
	}

	getSanitizedUpdateData() {
		return this.getSanitizedInsertData();
	}

	getSanitizedDeleteData() {
		return {
			id: this.metadata!,
			entityId: this.entityId!,
		};
	}

	createMetadataInstance() {
		if (this.metadata) {
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

		this.metadata = EntityMetadataFactory.getInstance(this.entityType, [
			rawMetadata,
		]);
	}
}
