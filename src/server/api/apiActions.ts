"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { seedEntityFactory } from "../seed";
import type { EntityType } from "../types";
import { isUndefined } from "../utils";
import { api } from "./api";

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
		"location",
		"currentPath",
	]);

	await api.updateEntity(
		data.entityType as EntityType,
		Number(data.entityId),
		data.name as string,
		data.description as string,
		data.location as string,
	);

	reloadEditPage(data.entityType, data.entityId);
}

export async function addEntity(formData: FormData) {
	const data = extractFormData(formData, [
		"entityType",
		"name",
		"description",
		"location",
	]);

	const response = await api.addEntity(
		data.entityType as EntityType,
		data.name as string,
		data.description as string,
		data.location as string,
	);

	if (response?.id) {
		redirect(`/account/${data.entityType}/edit/${response.id}/`);
	}
}

export async function updateImage(formData: FormData) {
	const data = extractFormData(formData, [
		"entityId",
		"id",
		"alt",
		"filepath",
		"isDefault",
	]);

	await api.updateImage(
		Number(data.entityId),
		Number(data.id),
		data.alt as string,
		data.filepath as string,
		Boolean(data.isDefault),
	);

	reloadEditPage(data.entityType, data.entityId);
}

export async function insertImage(formData: FormData) {
	const data = extractFormData(formData, [
		"entityId",
		"alt",
		"filepath",
		"isDefault",
	]);

	const response = await api.insertImage(
		Number(data.entityId),
		data.alt as string,
		data.filepath as string,
		Boolean(data.isDefault),
	);
	console.log(response);

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

	await api.updateMetadata(
		data.entityType as EntityType,
		Number(data.id),
		Number(data.entityId),
		data.name as string,
		data.value as string,
	);

	reloadEditPage(data.entityType, data.entityId);
}

export async function insertMetadata(formData: FormData) {
	const data = extractFormData(formData, [
		"entityType",
		"entityId",
		"name",
		"value",
	]);

	await api.insertMetadata(
		data.entityType as EntityType,
		Number(data.entityId),
		data.name as string,
		data.value as string,
	);

	reloadEditPage(data.entityType, data.entityId);
}

export async function seedDb(formData: FormData) {
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
