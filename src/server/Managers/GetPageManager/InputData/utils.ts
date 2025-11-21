import { isUndefined } from "@/server/utils";

export const sanitizeBoolean = (
	value: boolean | undefined,
	defaultValue: boolean,
) => (isUndefined(value) ? defaultValue : Boolean(value));
