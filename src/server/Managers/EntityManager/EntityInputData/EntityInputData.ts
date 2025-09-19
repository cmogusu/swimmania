/** biome-ignore-all lint/style/noNonNullAssertion: TODO: Find a better solution besides this */
import { BaseInputData } from "@/server/Managers/services/BaseInputData";
import type { MetadataFilter } from "@/server/Metadata";
import type { EntityType, PaginationOptions } from "@/server/types";
import { isUndefined } from "@/server/utils";
import type { EntityLoadRelatedDataOptions, EntryRawInputs } from "../types";
import { type Sanitize, SanitizeInstance } from "./Sanitize";
import { type Validate, ValidateInstance } from "./Validate";

export class EntityInputData extends BaseInputData {
	entityType: EntityType;
	entityId?: number;
	entityIds?: number[];
	filters?: MetadataFilter[];

	name?: string;
	description?: string;
	location?: string;

	loadDefaultImage: boolean = true;
	loadImages: boolean = false;
	loadMetadata: boolean = false;

	validate: Validate;
	sanitize: Sanitize;

	constructor(entityType: EntityType, rawInputs: EntryRawInputs) {
		super();

		const {
			entityId,
			entityIds,
			filters,
			name,
			description,
			location,
			pageSize,
			pageNumber,
			loadDefaultImage,
			loadImages,
			loadMetadata,
		} = rawInputs;

		if (!isUndefined(entityId)) this.entityId = entityId;
		if (!isUndefined(entityIds)) this.entityIds = entityIds;
		if (!isUndefined(name)) this.name = name;
		if (!isUndefined(description)) this.description = description;
		if (!isUndefined(location)) this.location = location;
		if (!isUndefined(filters)) this.filters = filters;

		if (!isUndefined(loadImages)) this.loadImages = loadImages;
		if (!isUndefined(loadMetadata)) this.loadMetadata = loadMetadata;
		if (!isUndefined(loadDefaultImage))
			this.loadDefaultImage = loadDefaultImage;

		this.pageSize = this.sanitizePageSize(pageSize);
		this.pageNumber = this.sanitizePageNumber(pageNumber);

		this.entityType = entityType;
		this.validate = ValidateInstance;
		this.sanitize = SanitizeInstance;
	}

	validateGetAllInputs() {
		this.validate.entityType(this.entityType);
	}

	validateGetByIdInputs() {
		this.validate.id(this.entityId);
		this.validate.entityType(this.entityType);
	}

	validateGetByIdsInputs() {
		this.entityIds?.map(this.validate.id);
		this.validate.entityType(this.entityType);
	}

	validateFilterByInputs() {
		this.validate.entityType(this.entityType);
		this.validate.filters(this.filters);
	}

	validateUpdateInputs() {
		this.validate.id(this.entityId);
		this.validateInsertInputs();
	}

	validateInsertInputs() {
		this.validate.entityType(this.entityType);
		this.validate.name(this.name);
		this.validate.description(this.description);
		this.validate.location(this.location);
	}

	validateDeleteByIdInputs() {
		this.validateGetByIdInputs();
	}

	getSanitizedGetAllData() {
		return {
			entityType: this.entityType,
			offset: this.offset,
			pageSize: this.pageSize,
		};
	}

	getSanitizedGetByIdsInputs() {
		return {
			entityType: this.entityType,
			entityIds: this.entityIds!,
			offset: this.offset,
			pageSize: this.pageSize,
		};
	}

	getSanitizedGetByIdInputs() {
		return {
			entityType: this.entityType,
			entityId: this.entityId!,
		};
	}

	getSanitizedUploadInputs() {
		return {
			entityType: this.entityType,
			entityId: this.entityId!,
			name: this.name!,
			description: this.description!,
			location: this.location!,
		};
	}

	getSanitizedInsertInputs() {
		return {
			entityType: this.entityType,
			name: this.name!,
			description: this.description!,
			location: this.location!,
		};
	}

	getSanitizedDeleteByIdsInputs() {
		return this.getSanitizedGetByIdInputs();
	}

	getLoadRelatedDataOptions(): EntityLoadRelatedDataOptions {
		return {
			loadImages: this.loadImages,
			loadDefaultImage: this.loadDefaultImage,
			loadMetadata: this.loadMetadata,
		};
	}

	getPaginationOptions(): PaginationOptions {
		return {
			pageNumber: this.pageNumber,
			pageSize: this.pageSize,
		};
	}
}
