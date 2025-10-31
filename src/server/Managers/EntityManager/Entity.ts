import { isUndefined } from "@/server/utils";
import type { EntityType } from "../../types";
import type { Image, ImageManager } from "../ImageManager";
import type { ILoadableEntity, RawEntity } from "./types";

export class Entity {
	id: number;
	name: string;
	entityType: EntityType;
	description: string | undefined;
	userId: number;
	defaultImage: Image | undefined;
	images: Image[] | undefined;

	constructor({ id, name, type, description, userId }: RawEntity) {
		this.id = id;
		this.entityType = type;
		this.name = name;
		this.userId = userId;

		if (!isUndefined(description)) this.description = description;
	}

	async loadImages(imageManager: ImageManager) {
		this.images = await imageManager.getAll({ entityId: this.id });
		this.defaultImage = this.images?.find((img) => img.isDefault);
	}

	async loadDefaultImage(imageManager: ImageManager) {
		this.defaultImage = await imageManager.getDefault({
			entityId: this.id,
		});
	}

	async loadRelatedData(
		inputData: ILoadableEntity,
		imageManager: ImageManager,
	) {
		const promises: Promise<unknown>[] = [];
		if (inputData.loadImages) {
			promises.push(this.loadImages(imageManager));
		}

		if (inputData.loadDefaultImage) {
			promises.push(this.loadDefaultImage(imageManager));
		}

		await Promise.all(promises);
	}

	toJSON() {
		return {
			id: this.id,
			type: this.entityType,
			name: this.name,
			description: this.description,
			userId: this.userId,
			defaultImage: this.defaultImage?.toJSON(),
			images: this.images?.map((img) => img.toJSON()),
		};
	}
}
