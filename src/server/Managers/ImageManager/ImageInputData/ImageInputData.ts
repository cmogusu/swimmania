import { IMAGE_FOLDER_URL, PUBLIC_FOLDER } from "@/server/constants";
import { isUndefined } from "@/server/utils";
import { BaseInputData } from "../../services/BaseInputData";
import type { ImageFileDataItem, ImageRawInputs } from "../types";
import { type Sanitize, SanitizeInstance } from "./Sanitize";
import { type Validate, ValidateInstance } from "./Validate";

export class ImageInputData extends BaseInputData {
	readonly id?: number;
	readonly entityId: number;
	readonly alt?: string;
	readonly isDefault?: boolean = false;

	filepath?: string;
	file?: ImageFileDataItem;

	readonly validate: Validate;
	readonly sanitize: Sanitize;

	constructor({
		id,
		entityId,
		alt,
		filepath,
		isDefault,
		file,
	}: ImageRawInputs) {
		super();

		if (!isUndefined(id)) this.id = id;
		if (!isUndefined(alt)) this.alt = alt;
		if (!isUndefined(filepath)) this.filepath = filepath;
		if (!isUndefined(isDefault)) this.isDefault = isDefault;

		this.setFile(file);
		this.entityId = entityId;
		this.validate = ValidateInstance;
		this.sanitize = SanitizeInstance;
	}

	setFile(file: ImageFileDataItem | undefined) {
		if (!file?.path) {
			return;
		}

		this.file = file;
		this.filepath = file.path.replace(PUBLIC_FOLDER, IMAGE_FOLDER_URL); // TODO: verify this works
	}

	toJSON() {
		return {
			id: this.id,
			entityId: this.entityId,
			alt: this.sanitize.description(this.alt),
			filepath: this.filepath,
			isDefault: this.isDefault || false,
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
		this.validate.description(this.alt);
		this.validate.filepath(this.filepath);
		this.validate.file(this.file);
	}

	validateDeleteInputs() {
		this.validateGetByIdInputs();
	}
}
