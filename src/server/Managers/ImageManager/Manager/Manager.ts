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

	constructor() {
		this.db = new Database();
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
		const updateData = await this.db.setDefault(imageData);

		// @ts-ignore
		if (!updateData?.affectedRows) {
			throw Error("Unable to update image");
		}

		return { id: imageData.id };
	}

	async update(rawImageData: RawUpdateImageInputs) {
		const imageData = new UpdateInputData(rawImageData);
		imageData.validateData();
		const updateData = await this.db.update(imageData);

		// @ts-ignore
		if (!updateData?.affectedRows) {
			throw Error("Unable to update image");
		}

		return { id: imageData.id };
	}

	async insert(rawImageData: RawInsertImageInputs) {
		const imageData = new InsertInputData(rawImageData);
		imageData.validateData();
		const insertData = await this.db.insert(imageData);

		// @ts-ignore
		if (!insertData?.insertId) {
			throw Error("Unable to create image");
		}

		// @ts-ignore
		return { id: insertData.insertId };
	}

	async deleteById(rawImageData: RawDeleteByIdImageInputs) {
		const imageData = new DeleteByIdInputData(rawImageData);
		imageData.validateData();
		const deleteData = await this.db.deleteById(imageData);

		// @ts-ignore
		if (!deleteData?.affectedRows) {
			throw Error("Unable to delete image");
		}

		// @ts-ignore
		return { id: entityId };
	}

	async deleteAll(rawImageData: RawDeleteAllImageInputs) {
		const imageData = new DeleteAllInputData(rawImageData);
		imageData.validateData();
		const deleteData = await this.db.deleteAll(imageData);

		// @ts-ignore
		if (!deleteData?.affectedRows) {
			throw Error("Unable to delete image");
		}

		// @ts-ignore
		return { id: entityId };
	}
}
