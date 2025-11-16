import type { EntityType } from "@/server/types";
import {
	type Entities,
	type EntityManager,
	entityManagerFactory,
} from "../../EntityManager";
import {
	type RawGetRelatedInputData,
	RelatedEntityIdManager,
} from "../../RelatedEntityIdManager";
import type {
	RawDeleteRelatedEntityInputs,
	RawInsertRelatedEntityInputs,
} from "../types";

export class RelatedEntityManager {
	entityManager: EntityManager;
	relatedEntityIdManager: RelatedEntityIdManager;

	constructor() {
		this.entityManager = entityManagerFactory.getInstance();
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

		return this.relatedEntityIdManager.upsert({
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
		rawInputs: RawGetRelatedInputData,
	): Promise<Entities | undefined> {
		const { relatedEntityType, relationshipType } = rawInputs;
		const entityIds = await this.relatedEntityIdManager.getRelated(rawInputs);
		if (!entityIds?.length) {
			return undefined;
		}

		const entities = await this.entityManager.getByIds({
			entityType: relatedEntityType,
			entityIds,
		});

		entities.relationshipType = relationshipType;
		return entities;
	}
}
