"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { EntityType } from "../types";
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

	revalidatePath(`/account/${data.entityType}/edit/${data.entityId}`);
}

export async function addEntity(formData: FormData) {
	const data = extractFormData(formData, [
		"entityType",
		"name",
		"description",
		"location",
		"nextPath",
	]);

	console.log("adding");
	const response = await api.addEntity(
		data.entityType as EntityType,
		data.name as string,
		data.description as string,
		data.location as string,
	);

	console.log("response", response, response?.id);
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

	revalidatePath(`/account/${data.entityType}/edit/${data.entityId}`);
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

	revalidatePath(`/account/${data.entityType}/edit/${data.entityId}`);
}

const extractFormData = (
	formData: FormData,
	keys: string[],
): Record<string, string> =>
	keys.reduce((acc: Record<string, string>, key: string) => {
		acc[key] = formData.get(key) as string;
		return acc;
	}, {});
