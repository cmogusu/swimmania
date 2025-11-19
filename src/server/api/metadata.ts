import { metadataManagerFactory } from "@/server/Managers";
import { Log } from "../services";
import type { EntityType, RawMetadata } from "../types";

const log = new Log();

export async function getMetadataList(
	entityType: EntityType,
	entityId: number,
	names: string[],
) {
	try {
		const metadataManager = metadataManagerFactory.getInstance();
		return await metadataManager.getList({
			entityType,
			entityId,
			names,
		});
	} catch (error: unknown) {
		log.error("Unable to update metadata", error as Error);
	}
}

export async function getMetadata(
	entityType: EntityType,
	entityId: number,
): Promise<RawMetadata | undefined> {
	try {
		const metadataManager = metadataManagerFactory.getInstance();
		return await metadataManager.getAll({
			entityId,
			entityType,
		});
	} catch (error: unknown) {
		log.error("Unable to get metadata", error as Error);
	}
}

export async function updateMetadata(
	entityType: EntityType,
	entityId: number,
	rawMetadata: RawMetadata,
) {
	try {
		const metadataManager = metadataManagerFactory.getInstance();
		return await metadataManager.update({
			entityType,
			entityId,
			rawMetadata,
		});
	} catch (error: unknown) {
		log.error("Unable to update metadata", error as Error);
	}
}

export async function upsertMetadata(
	entityType: EntityType,
	entityId: number,
	rawMetadata: RawMetadata,
) {
	try {
		const metadataManager = metadataManagerFactory.getInstance();
		return await metadataManager.upsert({
			entityType,
			entityId,
			rawMetadata,
		});
	} catch (error: unknown) {
		log.error("Unable to insert metadata", error as Error);
	}
}
