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
	RawInsertNewRelatedEntityInputs,
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

	async insertNewRelated(
		entityType: EntityType,
		entityId: number,
		rawRelatedEntity: RawInsertNewRelatedEntityInputs,
	) {
		const { type: relatedEntityType, relationshipType } = rawRelatedEntity;
		const relatedEntityId = await this.getEntityId(rawRelatedEntity);
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

	async getEntityId(rawRelatedEntity: RawInsertNewRelatedEntityInputs) {
		let relatedEntityId: number | undefined;
		if (!relatedEntityId) {
			const relatedEntity =
				await this.entityManager.findExisting(rawRelatedEntity);
			relatedEntityId = relatedEntity?.entityId;
		}

		if (!relatedEntityId) {
			const { id } = await this.entityManager.insert(rawRelatedEntity);
			relatedEntityId = id;
		}

		if (!relatedEntityId) {
			throw Error("Unable to get related entity");
		}

		return relatedEntityId;
	}
}
