import { auth } from "auth";
import { PrivateEntityTypesObj } from "@/server/constants";
import type { EntityType, RelationshipType } from "@/server/types";
import { isUndefined } from "@/server/utils";
import { RelatedEntityIdManager } from "../RelatedEntityIdManager";
import { GrantAccessInputData, RevokeAccessInputData } from "./InputData";
import type {
	RawGrantAccessInputs,
	RawGrantLoggedInUserAccessInputs,
	RawRevokeAccessInputs,
} from "./type";

const ADMIN_IDS = [process.env.ADMIN_USER_ID];

export class UserManager extends RelatedEntityIdManager {
	static async getLoggedInUserId(): Promise<string | undefined> {
		const session = await auth();
		return session?.user?.id;
	}

	static async getLoggedInUserIdOrThrow(): Promise<string> {
		const userId = await UserManager.getLoggedInUserId();
		if (!userId) {
			throw Error("User not logged in");
		}

		return userId;
	}

	userEntityType: EntityType = "user";
	userRelationshipType: RelationshipType = "owns_inverse";

	throwError(errorMessage?: string) {
		throw Error(errorMessage ?? "Access denied");
	}

	async assertCanViewEntities(entityType: EntityType, userId?: string) {
		const isPrivateEntityType = entityType in PrivateEntityTypesObj;
		if (!isPrivateEntityType) {
			return;
		}

		const isAdmin = await this.isAdmin(userId);
		if (isAdmin) {
			return;
		}

		this.throwError();
	}

	async assertCanViewEntity(
		entityType: EntityType,
		userId: string | undefined,
		entityId: number,
	) {
		const isPrivateEntityType = entityType in PrivateEntityTypesObj;
		if (isPrivateEntityType) {
			return this.throwError();
		}

		await this.assertHasAccess(entityType, userId, entityId);
	}

	async assertCanCreateEntity(entityType: EntityType, userId: string) {
		const errorMessage = "Access denied. You must be logged in to create item";
		if (!userId) {
			return this.throwError(errorMessage);
		}

		if (entityType === this.userEntityType) {
			return this.throwError(errorMessage);
		}
	}

	async assertCanEditEntity(
		entityType: EntityType,
		userId: string,
		entityId: number,
	) {
		const errorMessage = "Access denied. Not allowed to edit entity";
		await this.assertHasAccess(entityType, userId, entityId, errorMessage);
	}

	async canEditEntity(
		entityType: EntityType,
		userId: string,
		entityId: number,
	): Promise<boolean> {
		return await this.hasAccess(entityType, userId, entityId);
	}

	async assertCanDeleteEntity(
		entityType: EntityType,
		userId: string | undefined,
		entityId: number,
	) {
		const errorMessage = "Access denied. Not allowed to delete entity";
		await this.assertHasAccess(entityType, userId, entityId, errorMessage);
	}

	async assertHasAccess(
		entityType: EntityType,
		userId: string | undefined,
		entityId: number,
		errorMessage?: string,
	) {
		const canAccess = await this.hasAccess(entityType, userId, entityId);
		if (!canAccess) {
			throw Error(errorMessage);
		}
	}

	async isAdmin(userId?: string) {
		return userId ? ADMIN_IDS.includes(userId) : false;
	}

	async hasAccess(
		entityType: EntityType,
		userId: string | undefined,
		entityId: number,
	): Promise<boolean> {
		if (!userId) {
			return Promise.resolve(false);
		}

		return await this.hasRelationship({
			entityType: entityType,
			entityId,
			relatedEntityType: this.userEntityType,
			relatedEntityId: userId,
			relationshipType: this.userRelationshipType,
		});
	}

	async revokeLoggedInUserEntityAccess(
		rawInputs: RawGrantLoggedInUserAccessInputs,
	) {
		const userId = await UserManager.getLoggedInUserId();
		if (!userId) {
			throw new Error("User not logged in");
		}

		return await this.revokeEntityAccess({
			...rawInputs,
			userId,
		});
	}

	async grantLoggedInUserEntityAccess(
		rawInputs: RawGrantLoggedInUserAccessInputs,
	) {
		const userId = await UserManager.getLoggedInUserId();
		if (!userId) {
			throw new Error("User not logged in");
		}

		return await this.grantEntityAccess({
			...rawInputs,
			userId,
		});
	}

	async grantEntityAccess(rawInputs: RawGrantAccessInputs) {
		const inputData = new GrantAccessInputData(rawInputs);
		inputData.validateData();

		return await this.grantAccess(
			inputData.entityType,
			inputData.userId,
			inputData.entityId,
		);
	}

	async revokeEntityAccess(rawInputs: RawRevokeAccessInputs) {
		const inputData = new RevokeAccessInputData(rawInputs);
		inputData.validateData();

		return await this.revokeAccess(
			inputData.entityType,
			inputData.userId,
			inputData.entityId,
		);
	}

	async grantAccess(
		entityType: EntityType,
		userId: string,
		entityId: number,
	): Promise<boolean> {
		if (isUndefined(userId)) {
			throw Error("User id not set");
		}

		const hasAccess = await this.hasAccess(entityType, userId, entityId);
		if (hasAccess) {
			return Promise.resolve(true);
		}

		await this.upsert({
			entityType,
			entityId,
			relatedEntityType: this.userEntityType,
			relatedEntityId: userId,
			relationshipType: this.userRelationshipType,
		});

		return true;
	}

	async revokeAccess(
		entityType: EntityType,
		userId: string,
		entityId: number,
	): Promise<boolean> {
		if (isUndefined(userId)) {
			throw Error("User id not set");
		}

		const { id } = await this.deleteById({
			entityType,
			entityId,
			relatedEntityType: this.userEntityType,
			relatedEntityId: userId,
			relationshipType: this.userRelationshipType,
		});

		return Boolean(id);
	}
}
