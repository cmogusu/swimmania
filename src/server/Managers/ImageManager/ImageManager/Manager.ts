import { Image } from "../Image";
import { ImageInputData } from "../ImageInputData";
import type {
	ImageDefaultRawInputs,
	ImageDeleteRawInputs,
	ImageGetAllRawInputs,
	ImageGetByIdRawInputs,
	ImagePostRawInputs,
	ImageUpdateRawInputs,
} from "../types";
import { Database } from "./Database";

export class ImageManager {
	db: Database;

	constructor() {
		this.db = new Database();
	}

	async getAll(rawImageData: ImageGetAllRawInputs): Promise<Image[]> {
		const imageData = new ImageInputData(rawImageData);
		imageData.validateGetAllInputs();
		const rawImages = await this.db.getAll(imageData);
		return rawImages.map((img) => new Image(img));
	}

	async getDefault(
		rawImageData: ImageDefaultRawInputs,
	): Promise<Image | undefined> {
		const imageData = new ImageInputData(rawImageData);
		imageData.validateDefaultInputs();
		const rawImage = await this.db.getDefault(imageData);
		return rawImage ? new Image(rawImage) : undefined;
	}

	async getByImageId(
		rawImageData: ImageGetByIdRawInputs,
	): Promise<Image | undefined> {
		const imageData = new ImageInputData(rawImageData);
		imageData.validateGetByIdInputs();
		const rawImages = await this.db.getByImageId(imageData);
		return rawImages.map((img) => new Image(img))[0];
	}

	async update(rawImageData: ImageUpdateRawInputs) {
		const imageData = new ImageInputData(rawImageData);
		imageData.validateUpdateInputs();
		const updateData = await this.db.update(imageData);

		// @ts-ignore
		if (!updateData?.affectedRows) {
			throw Error("Unable to update image");
		}

		return { id: imageData.id };
	}

	async insert(rawImageData: ImagePostRawInputs) {
		const imageData = new ImageInputData(rawImageData);
		imageData.validatePostInputs();
		const insertData = await this.db.insert(imageData);

		// @ts-ignore
		if (!insertData?.insertId) {
			throw Error("Unable to create image");
		}

		// @ts-ignore
		return { id: insertData.insertId };
	}

	async deleteById(rawImageData: ImageDeleteRawInputs) {
		const imageData = new ImageInputData(rawImageData);
		imageData.validateDeleteInputs();
		const deleteData = await this.db.deleteById(imageData);

		// @ts-ignore
		if (!deleteData?.affectedRows) {
			throw Error("Unable to delete image");
		}

		// @ts-ignore
		return { id: entityId };
	}
}
