"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { EntityType } from "../types";
import { api } from "./api";

export async function deleteEntity(formData: FormData) {
	const entityId = formData.get("entityId");
	const entityType = formData.get("entityType");
	await api.deleteEntity(entityType as EntityType, Number(entityId));

	revalidatePath("/posts");
	redirect("/posts");
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

	if (data.currentPath) revalidatePath(data.currentPath as string);
}

export async function updateImage(formData: FormData) {
	const data = extractFormData(formData, [
		"entityId",
		"id",
		"alt",
		"filepath",
		"isDefault",
		"currentPath",
	]);

	await api.updateImage(
		Number(data.entityId),
		Number(data.id),
		data.alt as string,
		data.filepath as string,
		Boolean(data.isDefault),
	);

	if (data.currentPath) revalidatePath(data.currentPath as string);
}

export async function updateMetadata(formData: FormData) {
	const data = extractFormData(formData, [
		"entityType",
		"id",
		"entityId",
		"name",
		"value",
		"currentPath",
	]);

	console.log(data);
	await api.updateMetadata(
		data.entityType as EntityType,
		Number(data.id),
		Number(data.entityId),
		data.name as string,
		data.value as string,
	);

	if (data.currentPath) revalidatePath(data.currentPath as string);
}

const extractFormData = (
	formData: FormData,
	keys: string[],
): Record<string, string> =>
	keys.reduce((acc: Record<string, string>, key: string) => {
		acc[key] = formData.get(key) as string;
		return acc;
	}, {});
