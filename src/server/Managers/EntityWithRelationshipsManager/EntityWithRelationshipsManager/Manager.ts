import type { EntityType } from "@/server/types";
import {
	type EntityManager,
	entityManagerFactory,
	type RawGetAllEntityInputs,
	type RawGetByIdsEntityInputs,
	type RelatedEntities,
} from "../../EntityManager";
import { RelatedEntityManager } from "../../RelatedEntityManager";
import type {
	DeleteEntityWithRelationsInput,
	GetByIdEntityWithRelationsInput,
	GetByNameEntityWithRelationsInput,
	InsertEntityWithRelationsInput,
	Related,
	UpdateEntityWithRelationsInput,
} from "../types";
import { EntityIdCache } from "./EntityIdCache";

export class EntityWithRelationshipsManager {
	entityIdCache: EntityIdCache;

	relatedEntityManager: RelatedEntityManager;

	constructor() {
		this.entityIdCache = new EntityIdCache();
		this.relatedEntityManager = new RelatedEntityManager();
	}

	getAll(entityType: EntityType, rawInputs: RawGetAllEntityInputs) {
		const entityManager = entityManagerFactory.getInstance(entityType);
		return entityManager.getAll(rawInputs);
	}

	getByIds(entityType: EntityType, rawInputs: RawGetByIdsEntityInputs) {
		const entityManager = entityManagerFactory.getInstance(entityType);
		return entityManager.getByIds(rawInputs);
	}

	async getById(
		entityType: EntityType,
		rawInputs: GetByIdEntityWithRelationsInput,
	) {
		const entityManager = entityManagerFactory.getInstance(entityType);
		const entity = await entityManager.getById(rawInputs);

		if (rawInputs.related) {
			entity.related = await this.getAllRelated(
				entityManager,
				entity.id,
				rawInputs.related,
			);
		}

		return entity;
	}

	async getByName(
		entityType: EntityType,
		rawInputs: GetByNameEntityWithRelationsInput,
	) {
		const entityManager = entityManagerFactory.getInstance(entityType);
		const entity = await entityManager.getByName(rawInputs);

		if (rawInputs.related) {
			entity.related = await this.getAllRelated(
				entityManager,
				entity.id,
				rawInputs.related,
			);
		}

		return entity;
	}

	async update(
		entityType: EntityType,
		rawInputs: UpdateEntityWithRelationsInput,
	) {
		const entityManager = entityManagerFactory.getInstance(entityType);
		const updateData = await entityManager.update(rawInputs);

		if (rawInputs.related) {
			await Promise.all(
				rawInputs.related.map((related) =>
					this.insertRelated(entityManager, updateData.id, related),
				),
			);
		}

		return updateData;
	}

	async insert(
		entityType: EntityType,
		rawInputs: InsertEntityWithRelationsInput,
	) {
		const entityManager = entityManagerFactory.getInstance(entityType);
		const insertData = await entityManager.insert(rawInputs);

		if (rawInputs.related) {
			await Promise.all(
				rawInputs.related.map((related) =>
					this.insertRelated(entityManager, insertData.id, related),
				),
			);
		}

		return insertData;
	}

	async deleteById(
		entityType: EntityType,
		rawInputs: DeleteEntityWithRelationsInput,
	) {
		const entityManager = entityManagerFactory.getInstance(entityType);
		const deleteData = await entityManager.deleteById(rawInputs);

		if (rawInputs.related) {
			await this.deleteRelated(deleteData.id, rawInputs.related);
		}

		return deleteData;
	}

	async insertRelated(
		entityManager: EntityManager,
		entityId: number,
		related: Related,
	) {
		const { type: relatedEntityType, name, relationshipType } = related;
		entityManager.validateRelationship(relatedEntityType, relationshipType);

		const relatedEntityManager =
			entityManagerFactory.getInstance(relatedEntityType);

		let relatedEntityId: number | undefined = related.id;
		if (!relatedEntityId && this.entityIdCache.has(relatedEntityType, name)) {
			relatedEntityId = this.entityIdCache.get(relatedEntityType, name);
		}

		if (!relatedEntityId) {
			const relatedEntity = await relatedEntityManager.findExisting(related);
			relatedEntityId = relatedEntity?.id;
		}

		if (!relatedEntityId) {
			const { id } = await relatedEntityManager.insert(related);
			relatedEntityId = id;
		}

		if (!relatedEntityId) {
			throw Error("Unable to get related entity");
		}

		this.entityIdCache.set(relatedEntityType, name, relatedEntityId);
		await this.relatedEntityManager.insert({
			entityId,
			entityType: entityManager.entityType,
			relatedEntityId,
			relatedEntityType,
			relationshipType,
		});
	}

	async deleteRelated(entityId: number, relatedArr: Related[]) {
		const promises = relatedArr.map((related) => {
			const { name, type: relatedEntityType } = related;
			this.entityIdCache.clear(relatedEntityType, name);
			return this.relatedEntityManager.deleteAll({ entityId });
		});

		await Promise.all(promises);
	}

	getAllRelated(
		entityManager: EntityManager,
		entityId: number,
		relatedArr: Related[],
	): Promise<RelatedEntities[]> {
		const promises = relatedArr.map((related) =>
			this.getRelated(entityManager, entityId, related),
		);

		return Promise.all(promises);
	}

	async getRelated(
		entityManager: EntityManager,
		entityId: number,
		related: Related,
	): Promise<RelatedEntities> {
		const { type: relatedEntityType, relationshipType } = related;
		entityManager.validateRelationship(relatedEntityType, relationshipType);

		const otherEntityManager =
			entityManagerFactory.getInstance(relatedEntityType);

		const entityIds = await this.relatedEntityManager.getRelated({
			entityId,
			entityType: entityManager.entityType,
			relatedEntityType,
			relationshipType,
		});

		const entities = await otherEntityManager.getByIds({ entityIds });
		return {
			type: relatedEntityType,
			relationshipType,
			entities,
		};
	}
}
