import { type FileManager, fileManagerFactory } from "../../FileManager";
import { type UserManager, userManagerFactory } from "../../UserManager";
import { Image } from "../Image";
import {
	DeleteAllInputData,
	DeleteByIdInputData,
	GetAllInputData,
	GetDefaultInputData,
	InsertInputData,
	SetDefaultInputData,
	UpdateInputData,
} from "../InputData";
import type {
	RawDeleteAllImageInputs,
	RawDeleteByIdImageInputs,
	RawGetAllImageInputs,
	RawGetDefaultImageInputs,
	RawInsertImageInputs,
	RawSetDefaultImageInputs,
	RawUpdateImageInputs,
} from "../types";
import { Database } from "./Database";

export class ImageManager {
	db: Database;
	fileManager: FileManager;
	userManager: UserManager;

	constructor() {
		this.db = new Database();
		this.fileManager = fileManagerFactory.getInstance();
		this.userManager = userManagerFactory.getInstance();
	}

	async getAll(rawImageData: RawGetAllImageInputs): Promise<Image[]> {
		const imageData = new GetAllInputData(rawImageData);
		imageData.validateData();
		const rawImages = await this.db.getAll(imageData);
		return rawImages.map((img) => new Image(img));
	}

	async getDefault(
		rawImageData: RawGetDefaultImageInputs,
	): Promise<Image | undefined> {
		const imageData = new GetDefaultInputData(rawImageData);
		imageData.validateData();
		const rawImage = await this.db.getDefault(imageData);
		return rawImage ? new Image(rawImage) : undefined;
	}

	async setDefault(rawImageData: RawSetDefaultImageInputs) {
		const imageData = new SetDefaultInputData(rawImageData);
		imageData.validateData();

		await this.userManager.assertCanEditEntity(
			imageData.entityType,
			imageData.userId,
			imageData.entityId,
		);

		const updateData = await this.db.setDefault(imageData);
		if (!updateData?.affectedRows) {
			throw Error("Unable to update image");
		}

		return { id: imageData.id };
	}

	async update(rawImageData: RawUpdateImageInputs) {
		const imageData = new UpdateInputData(rawImageData);
		imageData.validateData();

		await this.userManager.assertCanEditEntity(
			imageData.entityType,
			imageData.userId,
			imageData.entityId,
		);

		const updateData = await this.db.update(imageData);
		if (!updateData?.affectedRows) {
			throw Error("Unable to update image");
		}

		return { id: imageData.id };
	}

	async insert(rawImageData: RawInsertImageInputs) {
		const imageData = new InsertInputData(rawImageData);
		imageData.validateData();

		await this.userManager.assertCanCreateEntity(
			imageData.entityType,
			imageData.userId,
		);

		const insertData = await this.db.insert(imageData);
		if (!insertData?.insertId) {
			throw Error("Unable to create image");
		}

		return { id: insertData.insertId };
	}

	async deleteById(rawImageData: RawDeleteByIdImageInputs) {
		const imageData = new DeleteByIdInputData(rawImageData);
		imageData.validateData();

		await this.userManager.assertCanDeleteEntity(
			imageData.entityType,
			imageData.userId,
			imageData.entityId,
		);

		const rawImage = await this.db.getById(imageData);
		const deleteData = await this.db.deleteById(imageData);
		if (!deleteData?.affectedRows) {
			throw Error("Unable to delete image");
		}

		await this.fileManager.deleteImage({ filePath: rawImage.filepath });
		return { id: imageData.entityId };
	}

	async deleteAll(rawImageData: RawDeleteAllImageInputs) {
		const imageData = new DeleteAllInputData(rawImageData);
		imageData.validateData();

		await this.userManager.assertCanDeleteEntity(
			imageData.entityType,
			imageData.userId,
			imageData.entityId,
		);

		const deleteData = await this.db.deleteAll(imageData);
		if (!deleteData?.affectedRows) {
			throw Error("Unable to delete image");
		}

		return { id: imageData.entityId };
	}
}
