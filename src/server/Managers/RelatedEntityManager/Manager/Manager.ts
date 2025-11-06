import type { EntityType } from "@/server/types";
import { type Entities, entityManagerFactory } from "../../EntityManager";
import { RelatedEntityIdManager } from "../../RelatedEntityIdManager";
import type {
	RawDeleteRelatedEntityInputs,
	RawGetRelatedEntityInputs,
	RawInsertNewRelatedEntityInputs,
	RawInsertRelatedEntityInputs,
} from "../types";

export class RelatedEntityManager {
	relatedEntityIdManager: RelatedEntityIdManager;

	constructor() {
		this.relatedEntityIdManager = new RelatedEntityIdManager();
	}

	insertRelated(
		entityType: EntityType,
		entityId: number,
		rawRelatedEntity: RawInsertRelatedEntityInputs,
	) {
		const {
			id: relatedEntityId,
			type: relatedEntityType,
			relationshipType,
		} = rawRelatedEntity;

		return this.relatedEntityIdManager.insert({
			entityId,
			entityType,
			relatedEntityId,
			relatedEntityType,
			relationshipType,
		});
	}

	async insertNewRelated(
		entityType: EntityType,
		entityId: number,
		rawRelatedEntity: RawInsertNewRelatedEntityInputs,
	) {
		const { type: relatedEntityType, relationshipType } = rawRelatedEntity;

		const relatedEntityId = await this.getEntityId(rawRelatedEntity);
		return this.relatedEntityIdManager.insert({
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
			id: relatedEntityId,
			relationshipType,
		} = rawRelatedEntity;

		return this.relatedEntityIdManager.deleteById({
			entityType,
			entityId,
			relatedEntityType,
			relatedEntityId,
			relationshipType,
		});
	}

	async deleteAllRelated(
		entityId: number,
		entityType: EntityType,
		_relatedEntityType: EntityType,
	) {
		return this.relatedEntityIdManager.deleteAll({
			entityType,
			entityId,
		});
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

	async getEntityId(rawRelatedEntity: RawInsertNewRelatedEntityInputs) {
		const { type: relatedEntityType } = rawRelatedEntity;

		let relatedEntityId: number | undefined;
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
