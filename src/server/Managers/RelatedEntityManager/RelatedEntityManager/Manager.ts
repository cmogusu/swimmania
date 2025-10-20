import type { EntityType } from "@/server/types";
import { type Entities, entityManagerFactory } from "../../EntityManager";
import { RelatedEntityIdManager } from "../../RelatedEntityIdManager";
import type {
	RawDeleteRelatedEntityInputs,
	RawGetRelatedEntityInputs,
	RawInsertRelatedEntityInputs,
} from "../types";
import { EntityIdCache } from "./EntityIdCache";

export class RelatedEntityManager {
	entityIdCache: EntityIdCache;

	relatedEntityIdManager: RelatedEntityIdManager;

	constructor() {
		this.entityIdCache = new EntityIdCache();
		this.relatedEntityIdManager = new RelatedEntityIdManager();
	}

	async insertRelated(
		entityType: EntityType,
		entityId: number,
		rawRelatedEntity: RawInsertRelatedEntityInputs,
	) {
		const {
			type: relatedEntityType,
			relationshipType,
			name,
		} = rawRelatedEntity;

		let relatedEntityId: number | undefined = rawRelatedEntity.entityId;
		if (!relatedEntityId) {
			relatedEntityId = await this.getEntityId(rawRelatedEntity);
		}

		this.entityIdCache.set(relatedEntityType, name, relatedEntityId);
		await this.relatedEntityIdManager.insert({
			entityId,
			entityType,
			relatedEntityId,
			relatedEntityType,
			relationshipType,
		});
	}

	async deleteRelated(
		entityType: EntityType,
		entityId: number,
		rawRelatedEntity: RawDeleteRelatedEntityInputs,
	) {
		const {
			type: relatedEntityType,
			entityId: relatedEntityId,
			relationshipType,
		} = rawRelatedEntity;

		if (relatedEntityType && relatedEntityId) {
			return this.relatedEntityIdManager.deleteById({
				entityType,
				entityId,
				relatedEntityType,
				relatedEntityId,
				relationshipType,
			});
		}

		return this.relatedEntityIdManager.deleteAll({ entityId });
	}

	async getRelated(
		entityType: EntityType,
		entityId: number,
		relatedEntity: RawGetRelatedEntityInputs,
		pageNumber?: number,
		pageSize?: number,
	): Promise<Entities> {
		const { type: relatedEntityType, relationshipType } = relatedEntity;
		const entityIds = await this.relatedEntityIdManager.getRelated({
			entityId,
			entityType,
			relatedEntityType,
			relationshipType,
			pageNumber,
			pageSize,
		});

		const otherEntityManager =
			entityManagerFactory.getInstance(relatedEntityType);

		const entities = await otherEntityManager.getByIds({ entityIds });
		entities.setRelationshipType(relationshipType);
		return entities;
	}

	async getEntityId(rawRelatedEntity: RawInsertRelatedEntityInputs) {
		const { type: relatedEntityType, name: relatedEntityName } =
			rawRelatedEntity;

		let relatedEntityId: number | undefined;
		if (this.entityIdCache.has(relatedEntityType, relatedEntityName)) {
			relatedEntityId = this.entityIdCache.get(
				relatedEntityType,
				relatedEntityName,
			);
		}

		const relatedEntityManager =
			entityManagerFactory.getInstance(relatedEntityType);

		if (!relatedEntityId) {
			const relatedEntity =
				await relatedEntityManager.findExisting(rawRelatedEntity);
			relatedEntityId = relatedEntity?.id;
		}

		if (!relatedEntityId) {
			const { id } = await relatedEntityManager.insert(rawRelatedEntity);
			relatedEntityId = id;
		}

		if (!relatedEntityId) {
			throw Error("Unable to get related entity");
		}

		return relatedEntityId;
	}
}
