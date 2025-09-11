import { ImageManager, type ImageRawInputs } from "../managers/ImageManager";
import { BaseRequest } from "./BaseRequest";

export class ImageRequest extends BaseRequest {
	imageManager: ImageManager;

	constructor() {
		super();

		this.imageManager = new ImageManager();
	}

	async getAll(req, res) {
		const { entityId } = req.params;
		const rawImgData: ImageRawInputs = { entityId };

		try {
			const images = await this.imageManager.getAll(rawImgData);
			this.respondSuccess(res, images);
		} catch (error: any) {
			const errorMessage = "Unable to get entity images";
			this.log.error(errorMessage, error);
			this.respondFailure(res, errorMessage);
		}
	}

	async getById(req, res) {
		const { entityId, imageId } = req.params;
		const rawImgData: ImageRawInputs = { entityId, id: imageId };

		try {
			const image = await this.imageManager.getByImageId(rawImgData);
			this.respondSuccess(res, image);
		} catch (error: any) {
			const errorMessage = "Unable to get image";
			this.log.error(errorMessage, error);
			this.respondFailure(res, errorMessage);
		}
	}

	async patch(req, res) {
		const { entityId } = req.params;
		const { id, name, description, isDefault } = req.body;
		const image: ImageRawInputs = {
			id,
			entityId,
			name,
			description,
			isDefault,
			file: req.file,
		};

		try {
			const updateData = await this.imageManager.update(image);
			this.respondSuccess(res, updateData);
		} catch (error: any) {
			const errorMessage = "Unable to update entity";
			this.log.error(errorMessage, error);
			this.respondFailure(res, errorMessage);
		}
	}

	async post(req, res) {
		const { entityId } = req.params;
		const { name, description, isDefault } = req.body;
		const image: ImageRawInputs = {
			entityId,
			name,
			description,
			isDefault,
			file: req.file,
		};

		try {
			const insertData = await this.imageManager.insert(image);
			this.respondSuccess(res, insertData);
		} catch (error) {
			const errorMessage = "Unable to create image";
			this.log.error(errorMessage, error);
			this.respondFailure(res, errorMessage);
		}
	}

	async deleteById(req, res) {
		const { entityId } = req.params;

		try {
			const insertData = await this.imageManager.deleteById(entityId);
			this.respondSuccess(res, insertData);
		} catch (error) {
			const errorMessage = "Unable to delete image";
			this.log.error(errorMessage, error);
			this.respondFailure(res, errorMessage);
		}
	}
}
