import { auth } from "auth";
import type { User } from "next-auth";
import { PrivateEntityTypesObj } from "@/server/constants";
import type { EntityType, RelationshipType } from "@/server/types";
import { isUndefined } from "@/server/utils";
import { RelatedEntityIdManager } from "../RelatedEntityIdManager";

const ADMIN_IDS = ["adminId"];

export class UserManager extends RelatedEntityIdManager {
	entityType: EntityType;
	userEntityType: EntityType = "user";
	userRelationshipType: RelationshipType = "owns_inverse";

	constructor(entityType: EntityType) {
		super();
		this.entityType = entityType;
	}

	async getUser(): Promise<User | undefined> {
		const session = await auth();
		return session?.user;
	}

	async canViewEntities() {
		const isPrivateEntityType = this.entityType in PrivateEntityTypesObj;
		if (!isPrivateEntityType) {
			return true;
		}

		const isAdmin = await this.isAdmin();
		if (isAdmin) {
			return true;
		}

		return false;
	}

	canViewEntity(_entityId: number) {
		const isPrivateEntityType = this.entityType in PrivateEntityTypesObj;
		if (!isPrivateEntityType) {
			return true;
		}

		return true;
	}

	canCreateEntity(entityType: EntityType): boolean {
		if (entityType === this.userEntityType) {
			return false;
		}

		return true;
	}

	async canEditEntity(entityId: number): Promise<boolean> {
		return this.hasAccess(entityId);
	}

	canDeleteEntity(entityId: number): Promise<boolean> {
		return this.hasAccess(entityId);
	}

	async isAdmin() {
		const user = await this.getUser();
		return user?.id ? ADMIN_IDS.includes(user.id) : false;
	}

	async hasAccess(entityId: number): Promise<boolean> {
		const user = await this.getUser();

		if (isUndefined(user?.id)) {
			return Promise.resolve(false);
		}

		return this.hasRelationship({
			entityType: this.entityType,
			entityId,
			relatedEntityType: this.userEntityType,
			relatedEntityId: user.id,
			relationshipType: this.userRelationshipType,
		});
	}

	async grantAccess(entityId: number): Promise<boolean> {
		const user = await this.getUser();
		if (isUndefined(user?.id)) {
			return Promise.resolve(false);
		}

		const hasAccess = await this.hasAccess(entityId);
		if (hasAccess) {
			return Promise.resolve(true);
		}

		const insertId = await this.insert({
			entityType: this.entityType,
			entityId,
			relatedEntityType: this.userEntityType,
			relatedEntityId: user?.id,
			relationshipType: this.userRelationshipType,
		});

		return Boolean(insertId);
	}
}
