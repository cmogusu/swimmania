import type { EntityType } from "@/server/types";
import { type EntityManager, entityManagerFactory } from "../../EntityManager";
import {
	type MetadataManager,
	metadataManagerFactory,
} from "../../MetadataManager";
import {
	type RelatedEntityIdManager,
	relatedEntityIdManagerFactory,
} from "../../RelatedEntityIdManager";

export class BaseInsertEntity {
	entityType: EntityType | undefined;
	entityManager: EntityManager;
	metadataManager: MetadataManager;
	relatedEntityIdManager: RelatedEntityIdManager;

	constructor() {
		this.entityManager = entityManagerFactory.getInstance();
		this.metadataManager = metadataManagerFactory.getInstance();
		this.relatedEntityIdManager = relatedEntityIdManagerFactory.getInstance();
	}
}
