"use server";

import { auth, signOut } from "auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { seedEntityFactory } from "../seed";
import type { EntityType, MetadataValue, RelationshipType } from "../types";
import { isUndefined } from "../utils";
import { api } from "./api";

export async function getLoggedInUserId() {
	const session = await auth();
	return session?.user?.id;
}

export async function getLoggedInUser() {
	const session = await auth();
	return session?.user;
}

export async function handleSignOut() {
	await signOut;
}

export async function getEntities(entityType: EntityType, pageNumber: number) {
	return await api.getEntities(entityType, pageNumber);
}

export async function getMetadata(
	entityType: EntityType,
	entityId: number,
	names: string[],
) {
	return await api.getMetadataList(entityType, entityId, names);
}

export async function getRelatedEntities(
	entityType: EntityType,
	entityId: number,
	relatedEntityType: EntityType,
	relationshipType: RelationshipType,
) {
	return api.getRelatedEntities(
		entityType,
		entityId,
		relatedEntityType,
		relationshipType,
	);
}

export async function deleteEntity(formData: FormData) {
	const entityId = formData.get("entityId");
	const entityType = formData.get("entityType");
	await api.deleteEntity(entityType as EntityType, Number(entityId));

	revalidatePath(`/account/${entityType}`);
}

export async function updateEntity(formData: FormData) {
	const data = extractFormData(formData, [
		"entityType",
		"entityId",
		"name",
		"description",
	]);

	const entityId = Number(data.entityId);
	const entityType = data.entityType as EntityType;
	const name = data.name as string;
	const description = data.description as string;

	if (entityId > -1) {
		await api.updateEntity(entityType, entityId, name, description);
		reloadEditPage(entityType, `${entityId}`);
		return;
	}

	const response = await api.addEntity(entityType, name, description);
	if (response?.id) {
		redirect(`/account/${entityType}/edit/${response?.id}/`);
	}
}

export async function getImages(entityId: number) {
	return api.getImages(entityId);
}

export async function setDefaultImage(formData: FormData) {
	const data = extractFormData(formData, [
		"entityType",
		"entityId",
		"id",
		"isDefault",
	]);

	const entityType = data.entityType as EntityType;
	const entityId = Number(data.entityId);
	const id = Number(data.id);
	const isDefault = Boolean(data.isDefault);

	await api.setDefaultImage(entityType, entityId, id, isDefault);
	reloadEditPage(entityType, `${entityId}`);
}

export async function updateImage(formData: FormData) {
	const data = extractFormData(formData, [
		"entityType",
		"entityId",
		"id",
		"alt",
	]);

	const entityType = data.entityType as EntityType;
	const entityId = Number(data.entityId);
	const id = Number(data.id);
	const alt = data.alt as string;

	await api.updateImage(entityType, entityId, id, alt);
	reloadEditPage(entityType, `${entityId}`);
}

export async function addImage(formData: FormData) {
	const data = extractFormData(formData, [
		"entityType",
		"entityId",
		"alt",
		"image",
	]);

	const entityType = data.entityType as EntityType;
	const entityId = Number(data.entityId);
	const alt = data.alt as string;
	const imageFile = data.image as unknown as File;

	await api.insertImage(entityType, entityId, alt, imageFile);
	reloadEditPage(entityType, `${entityId}`);
}

export async function deleteImage(formData: FormData) {
	const data = extractFormData(formData, ["entityType", "entityId", "id"]);

	const entityType = data.entityType as EntityType;
	const entityId = Number(data.entityId);
	const id = Number(data.id);

	await api.deleteImageById(entityType, entityId, id);
	reloadEditPage(entityType, `${entityId}`);
}

export async function updateLocationMetadata(formData: FormData) {
	const data = extractFormData(formData, [
		"entityType",
		"entityId",
		"id",
		"lat",
		"lng",
		"locationName",
	]);

	const id = Number(data.id);
	const entityId = Number(data.entityId);
	const entityType = data.entityType as EntityType;
	const metadataArr = [
		{
			name: "location.lat",
			value: Number(data.latValue),
		},
		{
			name: "location.lng",
			value: Number(data.lngValue),
		},
		{
			name: "location.name",
			value: data.locationName as string,
		},
	];

	if (id > -1) {
		await api.updateMetadata(entityType, id, entityId, metadataArr);
	} else {
		await api.insertMetadata(entityType, entityId, metadataArr);
	}

	reloadEditPage(data.entityType, data.entityId);
}

export async function updateMetadata(formData: FormData) {
	const data = extractFormData(formData, [
		"entityType",
		"id",
		"entityId",
		"name",
		"value",
	]);

	const id = Number(data.id);
	const entityId = Number(data.entityId);
	const entityType = data.entityType as EntityType;
	const metadataArr = [
		{
			name: data.name as string,
			value: data.value as MetadataValue,
		},
	];

	if (id > -1) {
		await api.updateMetadata(entityType, id, entityId, metadataArr);
	} else {
		await api.insertMetadata(entityType, entityId, metadataArr);
	}

	reloadEditPage(data.entityType, data.entityId);
}

export async function addRelatedEntity(formData: FormData) {
	const data = extractFormData(formData, [
		"entityType",
		"entityId",
		"relatedEntityType",
		"relatedEntityId",
		"relationshipType",
	]);

	await api.addRelatedEntities(
		data.entityType as EntityType,
		Number(data.entityId),
		data.relatedEntityType as EntityType,
		Number(data.relatedEntityId),
		data.relationshipType as RelationshipType,
	);

	reloadEditPage(data.entityType, data.entityId);
}

export async function removeRelatedEntity(formData: FormData) {
	const data = extractFormData(formData, [
		"entityType",
		"entityId",
		"relatedEntityType",
		"relatedEntityId",
		"relationshipType",
	]);

	await api.removeRelatedEntities(
		data.entityType as EntityType,
		Number(data.entityId),
		data.relatedEntityType as EntityType,
		Number(data.relatedEntityId),
		data.relationshipType as RelationshipType,
	);

	reloadEditPage(data.entityType, data.entityId);
}

export async function seedEntityType(formData: FormData) {
	const { entityType, itemCount } = extractFormData(formData, [
		"entityType",
		"itemCount",
	]);

	if (isUndefined(entityType) || isUndefined(itemCount)) {
		throw Error("Entitytype or itemCount not set");
	}

	const seeder = seedEntityFactory.getInstance(entityType as EntityType);
	await seeder.insertItems(Number(itemCount));
}

export async function seedEntity(formData: FormData) {
	const { entityType, entityId, entityProperty } = extractFormData(formData, [
		"entityType",
		"entityId",
		"entityProperty",
	]);

	if (
		isUndefined(entityType) ||
		isUndefined(entityId) ||
		isUndefined(entityProperty)
	) {
		throw Error("Entitytype, entityId or entityProperty not set");
	}

	const seeder = seedEntityFactory.getInstance(entityType as EntityType);
	switch (entityProperty) {
		case "images":
			await seeder.insertImage(Number(entityId));
			break;
		case "metadata":
			await seeder.insertMetadata(Number(entityId));
			break;
	}
}

const extractFormData = (
	formData: FormData,
	keys: string[],
): Record<string, string> =>
	keys.reduce((acc: Record<string, string>, key: string) => {
		acc[key] = formData.get(key) as string;
		return acc;
	}, {});

const reloadEditPage = (entityType: string, entityId: string) => {
	revalidatePath(`/account/${entityType}/edit/${entityId}`);
};
