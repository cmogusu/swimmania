import { imageManagerFactory } from "@/server/Managers";
import { createFile } from "@/utilities/file";
import { Log } from "../services";
import type { EntityType } from "../types";

const log = new Log();

export async function getImages(entityId: number) {
	try {
		const imageManager = imageManagerFactory.getInstance();
		return await imageManager.getAll({
			entityId,
		});
	} catch (error: unknown) {
		log.error("Unable to get images", error as Error);
	}
}

export async function updateImage(
	entityType: EntityType,
	entityId: number,
	id: number,
	alt: string,
) {
	try {
		const imageManager = imageManagerFactory.getInstance();
		return await imageManager.update({
			entityType,
			entityId,
			id,
			alt,
		});
	} catch (error: unknown) {
		log.error("Unable to update image", error as Error);
	}
}

export async function insertImage(
	entityType: EntityType,
	entityId: number,
	alt: string,
	imageFile: File,
) {
	try {
		const imageManager = imageManagerFactory.getInstance();
		const filepath = await createFile(imageFile);
		return await imageManager.insert({
			entityType,
			entityId,
			alt,
			filepath,
		});
	} catch (error: unknown) {
		log.error("Unable to create image", error as Error);
	}
}

export async function setDefaultImage(
	entityType: EntityType,
	entityId: number,
	id: number,
	isDefault: boolean,
) {
	try {
		const imageManager = imageManagerFactory.getInstance();
		return await imageManager.setDefault({
			entityType,
			id,
			entityId,
			isDefault,
		});
	} catch (error: unknown) {
		log.error("Unable to set default image", error as Error);
	}
}

export async function deleteImageById(
	entityType: EntityType,
	entityId: number,
	id: number,
) {
	try {
		const imageManager = imageManagerFactory.getInstance();
		return await imageManager.deleteById({
			entityType,
			id,
			entityId,
		});
	} catch (error: unknown) {
		log.error("Unable to set default image", error as Error);
	}
}
