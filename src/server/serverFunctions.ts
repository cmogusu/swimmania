"use server";

import assert from "node:assert";
import type { ApiKeys } from "@/server/types";

assert.ok(process.env.MAPBOX_API_KEY, "Mapbox api key not set");
assert.ok(process.env.MAPTILER_API_KEY, "Maptile api key not set");
assert.ok(process.env.TOMTOM_API_KEY, "Tomtom api key not set");
assert.ok(process.env.AZURE_API_KEY, "Azure api key not set");

const apiKeys: ApiKeys = {
	mapbox: process.env.MAPBOX_API_KEY ?? "",
	maptiler: process.env.MAPTILER_API_KEY ?? "",
	tomtom: process.env.TOMTOM_API_KEY ?? "",
	azure: process.env.AZURE_API_KEY ?? "",
};

export const getApiKey = async (key: string): Promise<string> =>
	new Promise((resolve, reject) => {
		if (key in apiKeys) {
			resolve((apiKeys as Record<string, string>)[key]);
		} else {
			reject("Key not found");
		}
	});

export const getApiKeys = async (): Promise<ApiKeys> =>
	Promise.resolve(apiKeys);
