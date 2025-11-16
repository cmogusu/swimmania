import { importManagerFactory } from "../Managers/ImportManager";
import { Log } from "../services";
import type { EntityType, ImportableEntityTypes } from "../types";

const log = new Log();

export async function importEntities(entityType: EntityType, file: File) {
	try {
		const importManager = importManagerFactory.getInstance(
			entityType as ImportableEntityTypes,
		);

		return await importManager.importFile({ file });
	} catch (error: unknown) {
		log.error("Unable to import entities", error as Error);
	}
}
