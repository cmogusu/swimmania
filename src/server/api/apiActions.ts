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
	const { entityType, entityId, name, description, location, currentPath } =
		extractFormData(formData, [
			"entityType",
			"entityId",
			"name",
			"description",
			"location",
			"currentPath",
		]);

	await api.updateEntity(
		entityType as EntityType,
		Number(entityId),
		name as string,
		description as string,
		location as string,
	);

	if (currentPath) revalidatePath(currentPath as string);
}

export async function updateImage(formData: FormData) {
	const { entityId, id, alt, filepath, isDefault, currentPath } =
		extractFormData(formData, [
			"entityId",
			"id",
			"alt",
			"filepath",
			"isDefault",
			"currentPath",
		]);

	await api.updateImage(
		Number(entityId),
		Number(id),
		alt as string,
		filepath as string,
		Boolean(isDefault),
	);

	if (currentPath) revalidatePath(currentPath as string);
}

const extractFormData = (
	formData: FormData,
	keys: string[],
): Record<string, string> =>
	keys.reduce((acc: Record<string, string>, key: string) => {
		acc[key] = formData.get(key) as string;
		return acc;
	}, {});
