import { auth } from "auth";
import type { User } from "next-auth";
import { PrivateEntityTypesObj } from "@/server/constants";
import type { EntityType, RelationshipType } from "@/server/types";
import { isUndefined } from "@/server/utils";
import { RelatedEntityIdManager } from "../RelatedEntityIdManager";

const ADMIN_IDS = ["adminId"];

export class UserManager extends RelatedEntityIdManager {
	userEntityType: EntityType = "user";
	userRelationshipType: RelationshipType = "owns_inverse";

	throwError(errorMessage?: string) {
		throw Error(errorMessage ?? "Access denied");
	}

	async getUser(): Promise<User | undefined> {
		const session = await auth();
		return session?.user;
	}

	async assertCanViewEntities(entityType: EntityType) {
		const isPrivateEntityType = entityType in PrivateEntityTypesObj;
		if (!isPrivateEntityType) {
			return;
		}

		const isAdmin = await this.isAdmin();
		if (isAdmin) {
			return;
		}

		this.throwError();
	}

	assertCanViewEntity(entityType: EntityType, entityId: number) {
		const isPrivateEntityType = entityType in PrivateEntityTypesObj;
		if (isPrivateEntityType) {
			return this.throwError();
		}

		this.assertHasAccess(entityType, entityId);
	}

	async assertCanCreateEntity(entityType: EntityType) {
		const errorMessage = "Access denied. You must be logged in to create item";
		const user = await this.getUser();
		if (!user) {
			return this.throwError(errorMessage);
		}

		if (entityType === this.userEntityType) {
			return this.throwError(errorMessage);
		}
	}

	async assertCanEditEntity(entityType: EntityType, entityId: number) {
		const errorMessage = "Access denied. Not allowed to edit entity";
		this.assertHasAccess(entityType, entityId, errorMessage);
	}

	async canEditEntity(
		entityType: EntityType,
		entityId: number,
	): Promise<boolean> {
		return this.hasAccess(entityType, entityId);
	}

	async assertCanDeleteEntity(entityType: EntityType, entityId: number) {
		const errorMessage = "Access denied. Not allowed to delete entity";
		this.assertHasAccess(entityType, entityId, errorMessage);
	}

	async assertHasAccess(
		entityType: EntityType,
		entityId: number,
		errorMessage?: string,
	) {
		const canAccess = await this.hasAccess(entityType, entityId);
		if (!canAccess) {
			throw Error(errorMessage);
		}
	}

	async isAdmin() {
		const user = await this.getUser();
		return user?.id ? ADMIN_IDS.includes(user.id) : false;
	}

	async hasAccess(entityType: EntityType, entityId: number): Promise<boolean> {
		const user = await this.getUser();

		if (!user?.id) {
			return Promise.resolve(false);
		}

		return this.hasRelationship({
			entityType: entityType,
			entityId,
			relatedEntityType: this.userEntityType,
			relatedEntityId: user.id,
			relationshipType: this.userRelationshipType,
		});
	}

	async grantAccess(
		entityType: EntityType,
		entityId: number,
	): Promise<boolean> {
		const user = await this.getUser();
		if (isUndefined(user?.id)) {
			return Promise.resolve(false);
		}

		const hasAccess = await this.hasAccess(entityType, entityId);
		if (hasAccess) {
			return Promise.resolve(true);
		}

		const insertId = await this.insert({
			entityType,
			entityId,
			relatedEntityType: this.userEntityType,
			relatedEntityId: user?.id,
			relationshipType: this.userRelationshipType,
		});

		return Boolean(insertId);
	}
}
