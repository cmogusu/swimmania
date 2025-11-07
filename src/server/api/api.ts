import {
	entityManagerFactory,
	imageManagerFactory,
	metadataManagerFactory,
	relatedEntityManagerFactory,
} from "@/server/Managers";
import { createFile } from "@/utilities/file";
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
		loadUserCanEdit: boolean = false,
		loadDefaultImage: boolean = true,
	): Promise<EntityData | undefined> {
		try {
			const entityManager = entityManagerFactory.getInstance(entityType);
			const entity = await entityManager.getById({
				entityId,
				loadDefaultImage,
				loadUserCanEdit,
			});

			return entity.toJSON();
		} catch (error: unknown) {
			this.log.error("Unable to get entries", error as Error);
		}
	}

	async getEntities(
		entityType: EntityType,
		pageNumber: number = 1,
		loadUserCanEdit: boolean = false,
		loadDefaultImage: boolean = true,
	): Promise<EntitiesData | undefined> {
		try {
			const entityManager = entityManagerFactory.getInstance(entityType);
			const entities = await entityManager.getAll({
				loadUserCanEdit,
				loadDefaultImage,
				pageNumber,
				pageSize: this.pageSize,
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
			this.log.error("Unable to delete entity", error as Error);
		}
	}

	async updateEntity(
		entityType: EntityType,
		entityId: number,
		name: string,
		description?: string,
	) {
		try {
			const entityManager = entityManagerFactory.getInstance(entityType);
			return await entityManager.update({
				entityId,
				name,
				description,
			});
		} catch (error: unknown) {
			this.log.error("Unable to update entity", error as Error);
		}
	}

	async addEntity(entityType: EntityType, name: string, description: string) {
		try {
			const entityManager = entityManagerFactory.getInstance(entityType);
			return await entityManager.insert({
				name,
				description,
			});
		} catch (error: unknown) {
			this.log.error("Unable to add entity", error as Error);
		}
	}

	async getImages(entityId: number) {
		try {
			const imageManager = imageManagerFactory.getInstance();
			return await imageManager.getAll({
				entityId,
			});
		} catch (error: unknown) {
			this.log.error("Unable to get images", error as Error);
		}
	}

	async updateImage(
		entityType: EntityType,
		entityId: number,
		id: number,
		alt: string,
	) {
		try {
			const imageManager = imageManagerFactory.getInstance();
			return await imageManager.update({
				entityType,
				entityId,
				id,
				alt,
			});
		} catch (error: unknown) {
			this.log.error("Unable to update image", error as Error);
		}
	}

	async insertImage(
		entityType: EntityType,
		entityId: number,
		alt: string,
		imageFile: File,
	) {
		try {
			const imageManager = imageManagerFactory.getInstance();
			const filepath = await createFile(imageFile);
			return await imageManager.insert({
				entityType,
				entityId,
				alt,
				filepath,
			});
		} catch (error: unknown) {
			this.log.error("Unable to create image", error as Error);
		}
	}

	async setDefaultImage(
		entityType: EntityType,
		entityId: number,
		id: number,
		isDefault: boolean,
	) {
		try {
			const imageManager = imageManagerFactory.getInstance();
			return await imageManager.setDefault({
				entityType,
				id,
				entityId,
				isDefault,
			});
		} catch (error: unknown) {
			this.log.error("Unable to set default image", error as Error);
		}
	}

	async deleteImageById(entityType: EntityType, entityId: number, id: number) {
		try {
			const imageManager = imageManagerFactory.getInstance();
			return await imageManager.deleteById({
				entityType,
				id,
				entityId,
			});
		} catch (error: unknown) {
			this.log.error("Unable to set default image", error as Error);
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
			this.log.error("Unable to update metadata", error as Error);
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
			this.log.error("Unable to update metadata", error as Error);
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
			this.log.error("Unable to insert metadata", error as Error);
		}
	}
}

export const api = new Api(POSTS_PER_PAGE);
