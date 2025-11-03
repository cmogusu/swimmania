import { PrivateEntityTypesObj } from "@/server/constants";
import type { EntityType, RelationshipType } from "@/server/types";
import { isUndefined } from "@/server/utils";
import { type EntityManager, entityManagerFactory } from "../EntityManager";
import {
	type MetadataManager,
	metadataManagerFactory,
} from "../MetadataManager";
import { RelatedEntityIdManager } from "../RelatedEntityIdManager";

const ADMIN_IDS = [122];

export class UserManager extends RelatedEntityIdManager {
	userEntityType: EntityType = "user";
	userRelationshipType: RelationshipType = "owns_inverse";

	userEntityManager: EntityManager;
	userMetadataManager: MetadataManager;

	constructor() {
		super();

		this.userMetadataManager = metadataManagerFactory.getInstance();
		this.userEntityManager = entityManagerFactory.getInstance(
			this.userEntityType,
		);
	}

	canViewEntities(entityType: EntityType, userId: number) {
		const isPrivateEntityType = entityType in PrivateEntityTypesObj;
		if (!isPrivateEntityType) {
			return true;
		}

		if (this.isAdmin(userId)) {
			return true;
		}

		return false;
	}

	canViewEntity(entityType: EntityType) {
		if (entityType === this.userEntityType) {
			return false;
		}

		return true;
	}

	canCreateEntity(entityType: EntityType): boolean {
		if (entityType === this.userEntityType) {
			return false;
		}

		return true;
	}

	isAdmin(userId: number) {
		return ADMIN_IDS.includes(userId);
	}

	createUser(name: string) {
		return this.userEntityManager.insert({
			name,
		});
	}

	async getUser(userId: number) {
		const userPromise = this.userEntityManager.getById({
			entityId: userId,
		});

		const metadataPromise = this.userMetadataManager.getAll({
			entityId: userId,
			entityType: this.userEntityType,
		});

		const [user, metadata] = await Promise.all([userPromise, metadataPromise]);
		user.metadata = metadata;
		return user;
	}

	canEditEntity(
		entityType: EntityType,
		entityId: number,
		userId: number | undefined,
	): Promise<boolean> {
		return this.hasAccess(entityType, entityId, userId);
	}

	canDeleteEntity(
		entityType: EntityType,
		entityId: number,
		userId: number | undefined,
	): Promise<boolean> {
		return this.hasAccess(entityType, entityId, userId);
	}

	async hasAccess(
		entityType: EntityType,
		entityId: number,
		userId: number | undefined,
	): Promise<boolean> {
		if (isUndefined(userId)) {
			return Promise.resolve(false);
		}

		return this.hasRelationship({
			entityType,
			entityId,
			relatedEntityType: this.userEntityType,
			relatedEntityId: userId,
			relationshipType: this.userRelationshipType,
		});
	}

	async grantAccess(
		entityType: EntityType,
		entityId: number,
		userId: number | undefined,
	): Promise<boolean> {
		if (isUndefined(userId)) {
			return Promise.resolve(false);
		}

		const hasAccess = await this.hasAccess(entityType, entityId, userId);
		if (hasAccess) {
			return Promise.resolve(true);
		}

		const insertId = await this.insert({
			entityType,
			entityId,
			relatedEntityType: this.userEntityType,
			relatedEntityId: userId,
			relationshipType: this.userRelationshipType,
		});

		return Boolean(insertId);
	}
}
