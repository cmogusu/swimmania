import {
	entityManagerFactory,
	imageManagerFactory,
	metadataManagerFactory,
	relatedEntityManagerFactory,
} from "@/server/Managers";
import { POSTS_PER_PAGE } from "../constants/entity";
import { Log } from "../services";
import type {
	EntitiesData,
	EntityData,
	EntityType,
	RawMetadata,
	RelationshipType,
} from "../types";

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
			const entityManager = entityManagerFactory.getInstance(entityType);
			const entity = await entityManager.getById({
				entityId,
				loadImages: true,
				loadDefaultImage: true,
			});

			return entity.toJSON();
		} catch (error: unknown) {
			this.log.error("Unable to get entries", error as Error);
		}
	}

	async getEntities(
		entityType: EntityType,
		page: number = 1,
	): Promise<EntitiesData | undefined> {
		try {
			const entityManager = entityManagerFactory.getInstance(entityType);
			const entities = await entityManager.getAll({
				loadImages: false,
				loadDefaultImage: true,
				pageSize: this.pageSize,
				pageNumber: page,
			});

			return entities.toJSON();
		} catch (error: unknown) {
			this.log.error("Unable to get entries", error as Error);
		}
	}

	async getRelatedEntities(
		entityType: EntityType,
		entityId: number,
		relatedEntityType: EntityType,
		relationshipType: RelationshipType,
		pageNumber: number = 1,
	): Promise<EntitiesData | undefined> {
		try {
			const relatedEntityManager = relatedEntityManagerFactory.getInstance();
			const entities = await relatedEntityManager.getRelated(
				entityType,
				entityId,
				{
					type: relatedEntityType,
					relationshipType,
				},
				pageNumber,
			);

			return entities.toJSON();
		} catch (error: unknown) {
			this.log.error("Unable to get entries", error as Error);
		}
	}

	async addRelatedEntities(
		entityType: EntityType,
		entityId: number,
		relatedEntityType: EntityType,
		relatedEntityId: number,
		relationshipType: RelationshipType,
	): Promise<{ id: number } | undefined> {
		try {
			const relatedEntityManager = relatedEntityManagerFactory.getInstance();
			return await relatedEntityManager.insertRelated(entityType, entityId, {
				id: relatedEntityId,
				type: relatedEntityType,
				relationshipType,
			});
		} catch (error: unknown) {
			this.log.error("Unable to add related entities", error as Error);
		}
	}

	async removeRelatedEntities(
		entityType: EntityType,
		entityId: number,
		relatedEntityType: EntityType,
		relatedEntityId: number,
		relationshipType: RelationshipType,
	): Promise<{ id: number } | undefined> {
		try {
			const relatedEntityManager = relatedEntityManagerFactory.getInstance();
			const deleteData = await relatedEntityManager.deleteRelated(
				entityType,
				entityId,
				{
					id: relatedEntityId,
					type: relatedEntityType,
					relationshipType,
				},
			);

			return deleteData;
		} catch (error: unknown) {
			this.log.error("Unable to remove related entities", error as Error);
		}
	}

	async deleteEntity(entityType: EntityType, entityId: number) {
		try {
			const entityManager = entityManagerFactory.getInstance(entityType);
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
		userId: number,
		description?: string,
	) {
		try {
			const entityManager = entityManagerFactory.getInstance(entityType);
			return await entityManager.update({
				entityId,
				name,
				userId,
				description,
			});
		} catch (error: unknown) {
			const errorMessage = "Unable to update entity";
			this.log.error(errorMessage, error as Error);
		}
	}

	async addEntity(
		entityType: EntityType,
		name: string,
		userId: number,
		description: string,
	) {
		try {
			const entityManager = entityManagerFactory.getInstance(entityType);
			return await entityManager.insert({
				name,
				userId,
				description,
			});
		} catch (error: unknown) {
			const errorMessage = "Unable to add entity";
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
			return await imageManager.update({
				id,
				entityId,
				alt,
				filepath,
				isDefault,
			});
		} catch (error: unknown) {
			const errorMessage = "Unable to update image";
			this.log.error(errorMessage, error as Error);
		}
	}

	async insertImage(
		entityId: number,
		alt: string,
		filepath: string,
		isDefault: boolean,
	) {
		try {
			const imageManager = imageManagerFactory.getInstance();
			return await imageManager.insert({
				entityId,
				alt,
				filepath,
				isDefault,
			});
		} catch (error: unknown) {
			const errorMessage = "Unable to create image";
			this.log.error(errorMessage, error as Error);
		}
	}

	async getMetadataList(
		entityType: EntityType,
		entityId: number,
		names: string[],
	) {
		try {
			const metadataManager = metadataManagerFactory.getInstance();
			return await metadataManager.getList({
				entityType,
				entityId,
				names,
			});
		} catch (error: unknown) {
			const errorMessage = "Unable to update metadata";
			this.log.error(errorMessage, error as Error);
		}
	}

	async getMetadata(
		entityType: EntityType,
		entityId: number,
	): Promise<RawMetadata[] | undefined> {
		try {
			const metadataManager = metadataManagerFactory.getInstance();
			return await metadataManager.getAll({
				entityId,
				entityType,
			});
		} catch (error: unknown) {
			console.log(error);
			this.log.error("Unable to get metadata", error as Error);
		}
	}

	async updateMetadata(
		entityType: EntityType,
		id: number,
		entityId: number,
		rawMetadataArr: RawMetadata[],
	) {
		try {
			const metadataManager = metadataManagerFactory.getInstance();
			return await metadataManager.update({
				entityType,
				id,
				entityId,
				rawMetadataArr,
			});
		} catch (error: unknown) {
			const errorMessage = "Unable to update metadata";
			this.log.error(errorMessage, error as Error);
		}
	}

	async insertMetadata(
		entityType: EntityType,
		entityId: number,
		rawMetadataArr: RawMetadata[],
	) {
		try {
			const metadataManager = metadataManagerFactory.getInstance();
			return await metadataManager.insert({
				entityType,
				entityId,
				rawMetadataArr,
			});
		} catch (error: unknown) {
			console.log(error);
			const errorMessage = "Unable to insert metadata";
			this.log.error(errorMessage, error as Error);
		}
	}
}

export const api = new Api(POSTS_PER_PAGE);
