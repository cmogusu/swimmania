import { entityManagerFactory } from "@/server/Managers";
import { POSTS_PER_PAGE } from "../constants/entity";
import { UserManager } from "../Managers/UserManager";
import { Log } from "../services";
import type { EntitiesData, EntityData, EntityType } from "../types";

const log = new Log();

export async function getEntity(
	entityType: EntityType,
	entityId: number,
	loadUserCanEdit: boolean = false,
	loadDefaultImage: boolean = true,
): Promise<EntityData | undefined> {
	try {
		const entityManager = entityManagerFactory.getInstance();
		const userId = await UserManager.getLoggedInUserId();
		const entity = await entityManager.getById({
			entityType,
			userId,
			entityId,
			loadDefaultImage,
			loadUserCanEdit,
		});

		return entity.toJSON();
	} catch (error: unknown) {
		log.error("Unable to get entries", error as Error);
	}
}

export async function getEntities(
	entityType: EntityType,
	pageNumber: number = 1,
	pageSize: number = POSTS_PER_PAGE,
	loadUserCanEdit: boolean = false,
	loadDefaultImage: boolean = true,
): Promise<EntitiesData | undefined> {
	try {
		const entityManager = entityManagerFactory.getInstance();
		const userId = await UserManager.getLoggedInUserId();
		const entities = await entityManager.getAll({
			entityType,
			userId,
			loadUserCanEdit,
			loadDefaultImage,
			pageNumber,
			pageSize,
		});

		return entities.toJSON();
	} catch (error: unknown) {
		log.error("Unable to get entries", error as Error);
	}
}

export async function deleteEntity(entityType: EntityType, entityId: number) {
	try {
		const entityManager = entityManagerFactory.getInstance();
		const userId = await getLoggedInUserIdOrThrow();
		const insertData = await entityManager.deleteById({
			entityType,
			userId,
			entityId,
		});
		return insertData;
	} catch (error: unknown) {
		log.error("Unable to delete entity", error as Error);
	}
}

export async function updateEntity(
	entityType: EntityType,
	entityId: number,
	name: string,
	description?: string,
) {
	try {
		const entityManager = entityManagerFactory.getInstance();
		const userId = await getLoggedInUserIdOrThrow();
		return await entityManager.update({
			entityType,
			userId,
			entityId,
			name,
			description,
		});
	} catch (error: unknown) {
		log.error("Unable to update entity", error as Error);
	}
}

export async function addEntity(
	entityType: EntityType,
	name: string,
	description: string,
) {
	try {
		const entityManager = entityManagerFactory.getInstance();
		const userId = await getLoggedInUserIdOrThrow();
		return await entityManager.insert({
			entityType,
			userId,
			name,
			description,
		});
	} catch (error: unknown) {
		log.error("Unable to add entity", error as Error);
	}
}

const getLoggedInUserIdOrThrow = async () => {
	const userId = await UserManager.getLoggedInUserId();
	if (!userId) {
		throw Error("User not logged in");
	}

	return userId;
};
