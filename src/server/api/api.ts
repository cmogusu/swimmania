import {
	EntityManagerFactory,
	imageManagerFactory,
	metadataManagerFactory,
} from "@/server/Managers";
import { POSTS_PER_PAGE } from "../constants";
import type { MetadataValue } from "../Metadata";
import { Log } from "../services";
import type { EntityData, EntityType } from "../types";

export class Api {
	pageSize: number;
	log: Log;

	constructor(pageSize: number) {
		this.pageSize = pageSize;
		this.log = new Log();
	}

	async getEntity(
		entityType: EntityType,
		entityId: number,
	): Promise<EntityData | undefined> {
		try {
			const entityManager = EntityManagerFactory.getInstance(entityType);
			const entity = await entityManager.getById({
				entityId,
				loadImages: true,
				loadMetadata: true,
				loadDefaultImage: true,
			});

			return entity.toJSON();
		} catch (error: unknown) {
			console.log(error);
			this.log.error("Unable to get entries", error as Error);
		}
	}

	async getEntities(
		entityType: EntityType,
		page: number = 1,
	): Promise<EntityData[] | undefined> {
		try {
			const entityManager = EntityManagerFactory.getInstance(entityType);
			const entities = await entityManager.getAll({
				loadImages: true,
				loadMetadata: true,
				loadDefaultImage: true,
				pageSize: this.pageSize,
				pageNumber: page,
			});

			return entities.map((e) => e.toJSON());
		} catch (error: unknown) {
			this.log.error("Unable to get entries", error as Error);
		}
	}

	async deleteEntity(entityType: EntityType, entityId: number) {
		try {
			const entityManager = EntityManagerFactory.getInstance(entityType);
			const insertData = await entityManager.deleteById({ entityId });
			return insertData;
		} catch (error: unknown) {
			const errorMessage = "Unable to delete entity";
			this.log.error(errorMessage, error as Error);
		}
	}

	async updateEntity(
		entityType: EntityType,
		entityId: number,
		name: string,
		description: string,
		location: string,
	) {
		try {
			const entityManager = EntityManagerFactory.getInstance(entityType);
			const updateData = await entityManager.update({
				entityId,
				name,
				description,
				location,
			});
			return updateData;
		} catch (error: unknown) {
			const errorMessage = "Unable to update entity";
			this.log.error(errorMessage, error as Error);
		}
	}

	async updateImage(
		entityId: number,
		id: number,
		alt: string,
		filepath: string,
		isDefault: boolean,
	) {
		try {
			const imageManager = imageManagerFactory.getInstance();
			const updateData = await imageManager.update({
				id,
				entityId,
				alt,
				filepath,
				isDefault,
			});
			return updateData;
		} catch (error: unknown) {
			const errorMessage = "Unable to update entity";
			this.log.error(errorMessage, error as Error);
		}
	}

	async updateMetadata(
		entityType: EntityType,
		id: number,
		entityId: number,
		name: string,
		value: MetadataValue,
	) {
		try {
			const metadataManager = metadataManagerFactory.getInstance();
			const updateData = await metadataManager.update({
				entityType,
				id,
				entityId,
				name,
				value,
			});
			return updateData;
		} catch (error: unknown) {
			const errorMessage = "Unable to update entity";
			this.log.error(errorMessage, error as Error);
		}
	}
}

export const api = new Api(POSTS_PER_PAGE);
