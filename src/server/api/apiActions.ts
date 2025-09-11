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
