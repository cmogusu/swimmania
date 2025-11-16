import { userManagerFactory } from "../Managers/UserManager";
import { Log } from "../services";
import type { EntityType } from "../types";

const log = new Log();

export async function grantAccess(entityType: EntityType, entityId: number) {
	try {
		const userManager = userManagerFactory.getInstance();
		return await userManager.grantLoggedInUserEntityAccess({
			entityType,
			entityId,
		});
	} catch (error: unknown) {
		log.error("Unable to insert metadata", error as Error);
	}
}

export async function revokeAccess(entityType: EntityType, entityId: number) {
	try {
		const userManager = userManagerFactory.getInstance();
		return await userManager.revokeLoggedInUserEntityAccess({
			entityType,
			entityId,
		});
	} catch (error: unknown) {
		log.error("Unable to insert metadata", error as Error);
	}
}
