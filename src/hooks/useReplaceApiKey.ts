import { useMemo } from "react";
import {
	type ApiKeysContextType,
	initialKeys,
	useApiKeyContext,
} from "@/context";

const prefix = "__PP_";
const suffix = "_PP__";
const generatePlaceHolders = (
	initialKeys: Record<string, string | boolean>,
) => {
	const placeholders: Record<string, string> = {};
	for (const key in initialKeys) {
		placeholders[key] = `${prefix}${key}${suffix}`;
	}
	return placeholders;
};

export const API_KEY_PLACEHOLDERS = generatePlaceHolders(initialKeys);

export const useReplaceApiKey = (styleUrl: string) => {
	const keys = useApiKeyContext();

	const modifiedString = useMemo(
		() => (keys.areKeysSet ? replaceKey(styleUrl, keys) : ""),

		[styleUrl, keys],
	);

	return modifiedString;
};

const replaceKey = (styleUrl: string, keys: ApiKeysContextType) => {
	for (const keyId in API_KEY_PLACEHOLDERS) {
		const placeholder = API_KEY_PLACEHOLDERS[keyId];
		if (styleUrl.includes(placeholder)) {
			// @ts-ignore
			return styleUrl.replace(placeholder, keys[keyId]);
		}
	}

	return styleUrl;
};
