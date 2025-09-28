import { isUndefined } from "@/server/utils";
import type { RawMetadata } from "../../Managers/MetadataManager";
import type { EntityType } from "../../types";
import type { Image, ImageManager } from "../ImageManager";
import type { MetadataManager } from "../MetadataManager";
import type { EntityLoadRelatedDataOptions, RawEntity } from "./types";

export class Entity {
	id: number;
	name: string;
	entityType: EntityType;
	description?: string;
	location?: string;
	defaultImage?: Image;
	images?: Image[];
	metadata?: RawMetadata[];

	constructor({ id, name, type, description, location }: RawEntity) {
		this.id = id;
		this.entityType = type;
		this.name = name;

		if (!isUndefined(description)) this.description = description;
		if (!isUndefined(location)) this.location = location;
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

	async loadMetadata(metadataManager: MetadataManager) {
		this.metadata = await metadataManager.getAll({
			entityId: this.id,
			entityType: this.entityType,
		});
	}

	async loadRelatedData(
		loadRelatedDataOptions: EntityLoadRelatedDataOptions,
		imageManager: ImageManager,
		metadataManager: MetadataManager,
	) {
		const { loadImages, loadDefaultImage, loadMetadata } =
			loadRelatedDataOptions;

		const loadTasks: Promise<unknown>[] = [];
		if (loadImages) {
			loadTasks.push(this.loadImages(imageManager));
		}

		if (loadDefaultImage) {
			loadTasks.push(this.loadDefaultImage(imageManager));
		}

		if (loadMetadata) {
			loadTasks.push(this.loadMetadata(metadataManager));
		}

		await Promise.all(loadTasks);
	}

	toJSON() {
		return {
			id: this.id,
			type: this.entityType,
			name: this.name,
			description: this.description,
			location: this.location,
			defaultImage: this.defaultImage?.toJSON(),
			images: this.images?.map((img) => img.toJSON()),
			metadata: this.metadata,
		};
	}
}
