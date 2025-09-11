import { isUndefined } from "@/server/utils";
import type { IEntityMetadata } from "../../Metadata/types";
import type { EntityType } from "../../types";
import type { Image, ImageManager } from "../ImageManager";
import type { MetadataManager } from "../MetadataManager";
import type {
	EntityDatabaseOutputData,
	EntityLoadRelatedDataOptions,
} from "./types";

export class Entity {
	id: number;
	name: string;
	entityType: EntityType;
	description?: string;
	location?: string;
	defaultImage?: Image;
	images?: Image[];
	metadata?: IEntityMetadata;

	imageManager: ImageManager;
	metadataManager: MetadataManager;

	constructor(
		{ id, name, type, description, location }: EntityDatabaseOutputData,
		imageManager: ImageManager,
		metadataManager: MetadataManager,
	) {
		this.id = id;
		this.entityType = type;
		this.name = name;

		if (!isUndefined(description)) this.description = description;
		if (!isUndefined(location)) this.location = location;

		this.imageManager = imageManager;
		this.metadataManager = metadataManager;
	}

	async loadImages() {
		this.images = await this.imageManager.getAll({ entityId: this.id });
		this.defaultImage = this.images?.find((img) => img.isDefault);
	}

	async loadDefaultImage() {
		this.defaultImage = await this.imageManager.getDefault({
			entityId: this.id,
		});
	}

	async loadMetadata() {
		this.metadata = await this.metadataManager.getAll({
			entityId: this.id,
			entityType: this.entityType,
		});
	}

	async loadRelatedData(loadRelatedDataOptions: EntityLoadRelatedDataOptions) {
		const { loadImages, loadDefaultImage, loadMetadata } =
			loadRelatedDataOptions;

		const loadTasks: Promise<unknown>[] = [];
		if (loadImages) {
			loadTasks.push(this.loadImages());
		}

		if (loadDefaultImage) {
			loadTasks.push(this.loadDefaultImage());
		}

		if (loadMetadata) {
			loadTasks.push(this.loadMetadata());
		}

		await Promise.all(loadTasks);
	}

	toJSON() {
		return {
			id: this.id,
			type: this.entityType,
			name: this.name,
			description: this.description,
			defaultImage: this.defaultImage?.toJSON(),
			images: this.images?.map((img) => img.toJSON()),
			metadata: this.metadata?.dbValue,
		};
	}
}
