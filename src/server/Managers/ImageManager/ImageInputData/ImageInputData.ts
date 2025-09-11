import { IMAGE_FOLDER_URL, PUBLIC_FOLDER } from "@/server/constants";
import { isUndefined } from "@/server/utils";
import { BaseInputData } from "../../services/BaseInputData";
import type { ImageFileDataItem, ImageRawInputs } from "../types";
import { type Sanitize, SanitizeInstance } from "./Sanitize";
import { type Validate, ValidateInstance } from "./Validate";

export class ImageInputData extends BaseInputData {
	readonly id?: number;
	readonly entityId: number;
	readonly name?: string;
	readonly description?: string;
	readonly isDefault?: boolean = false;
	readonly file?: ImageFileDataItem;

	readonly validate: Validate;
	readonly sanitize: Sanitize;

	constructor({
		id,
		entityId,
		name,
		description,
		isDefault,
		file,
	}: ImageRawInputs) {
		super();

		if (!isUndefined(id)) this.id = id;
		if (!isUndefined(name)) this.name = name;
		if (!isUndefined(description)) this.description = description;
		if (!isUndefined(file)) this.file = file;
		if (!isUndefined(isDefault)) this.isDefault = isDefault;

		this.entityId = entityId;
		this.validate = ValidateInstance;
		this.sanitize = SanitizeInstance;
	}

	get filepath() {
		return this.file?.path
			? this.file.path.replace(PUBLIC_FOLDER, IMAGE_FOLDER_URL) // TODO: verify this works
			: undefined;
	}

	toJSON() {
		return {
			id: this.id,
			entityId: this.entityId,
			name: this.sanitize.name(this.name),
			description: this.sanitize.description(this.description),
			isDefault: this.isDefault || false,
			filepath: this.filepath,
		};
	}

	validateGetAllInputs() {
		this.validate.id(this.entityId);
	}

	validateDefaultInputs() {
		this.validateGetAllInputs;
	}

	validateGetByIdInputs() {
		this.validate.id(this.id);
		this.validate.id(this.entityId);
	}

	validateUpdateInputs() {
		this.validate.id(this.id);
		this.validatePostInputs();
	}

	validatePostInputs() {
		this.validate.id(this.entityId);
		this.validate.name(this.name);
		this.validate.description(this.description);
		this.validate.file(this.file);
	}

	validateDeleteInputs() {
		this.validateGetByIdInputs();
	}
}
