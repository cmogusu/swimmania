import { EntityTypePlurals } from "../constants";
import type { EntityType } from "../types";

export const isString = (v: unknown): v is string => typeof v === "string";

export const isNumber = (v: unknown): v is number => {
	if (typeof v === "number") {
		return true;
	}

	if (typeof v === "string") {
		return !Number.isNaN(Number(v));
	}

	return false;
};

export const isBoolean = (v: unknown): v is boolean => typeof v === "boolean";

export const isNull = (v: unknown): v is null => v === null;

export const isUndefined = (v: unknown): v is undefined => v === undefined;

export const isNotSet = (v: unknown): boolean => isUndefined(v) && isNull(v);

export const isSet = (v: unknown) => !isUndefined(v) && !isNull(v);

export const clamp = (v: number | string, min: number, max: number): number =>
	Math.max(min, Math.min(Number(v), max));

export const isArray = (v: unknown): v is unknown[] => Array.isArray(v);

export const addLeadingZero = (v: number) => (v < 10 ? `0${v}` : v.toString());

export const sanitizeTextForDb = (v: string): string => v;

export const getPlural = (entityType: EntityType) =>
	EntityTypePlurals[entityType];
