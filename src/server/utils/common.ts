// import { EntityTypesKeys } from "../constants";

// const DefaultPageSize = 3;
// const DefaultPageNumber = 1;

// export const isNoneEmptyString = (value: string) =>
// 	/^[A-Za-z0-9]+$/.test(value);

// export const isNoneEmptyNumber = (value: string) => /^\d$/.test(value);

// export const throwIfArrayEmpty = (array?: unknown[], valueName = "") => {
// 	if (array === undefined || !array.length) {
// 		throw Error(`${valueName} array empty`);
// 	}
// };

// export const throwIfNotSet = (value: unknown, valueName = "") => {
// 	if (value === undefined || value == null) {
// 		throw Error(`${valueName} value not set`);
// 	}
// };

// export const getNumberFromString = (numberString: string) =>
// 	Number.isNaN(numberString) ? undefined : parseInt(numberString, 10);

// // export const filterByMetadata =
// // 	(entityType: string, entityDb: unknown) => async (req, res) => {
// // 		// const filterByQuery = req.
// // 		const pageNumber = getNumberFromString(req.query.page) ?? DefaultPageNumber;
// // 		const entities = await entityDb.getAll({
// // 			pageNumber,
// // 			pageSize: DefaultPageSize,
// // 		});

// // 		res.send({ success: true, data: entities });
// // 	};

// // Util functions
// export function isPageSizeSet(pageSize: number) {
// 	if (!pageSize) {
// 		logError("Page size not set");
// 		return false;
// 	}

// 	return true;
// }

// export function isItemIdValid(entityId: number) {
// 	if (!entityId) {
// 		logError("Item id not set");
// 		return false;
// 	}

// 	return true;
// }

// export function isNameValid(entityName: string) {
// 	if (!entityName) {
// 		logError("Entity name not set");
// 		return false;
// 	}

// 	return true;
// }

// export function isEntityTypeValid(entityType: string) {
// 	if (!entityType) {
// 		logError("EntityType has not been set");
// 		return false;
// 	}

// 	if (!EntityTypesKeys.includes(entityType)) {
// 		logError("Invalid value of entityType set");
// 		return false;
// 	}

// 	return true;
// }

// function logError(errorMessage: string) {
// 	console.error("Entity file error", Error(errorMessage));
// }

// export function isFilterByValid(filterBy: unknown) {
// 	return !!filterBy && typeof filterBy === "string";
// }

// export const isString = (v: unknown): v is string => typeof v === "string";

// export const isNumber = (v: unknown): v is number => {
// 	if (typeof v === "number") {
// 		return true;
// 	}

// 	if (typeof v === "string") {
// 		return !Number.isNaN(Number(v));
// 	}

// 	return false;
// };

// export const isBoolean = (v: unknown): v is boolean =>
// 	v === true || v === false;

// export const isNull = (v: unknown): v is null => v === null;

// export const isUndefined = (v: unknown): v is undefined => v === undefined;

// export const isNotSet = (v: unknown): boolean => isUndefined(v) && isNull(v);

// export const isSet = (v: unknown): boolean => !isUndefined(v) && !isNull(v);

// export const clamp = (v: number, min: number, max: number): number =>
// 	Math.max(min, Math.min(v, max));

// export const isArray = (v: unknown): v is any[] => Array.isArray(v);

// export const addLeadingZero = (v: number) => (v < 10 ? `0${v}` : v.toString());

// export const sanitizeTextForDb = (v: string): string => v;

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

export const isBoolean = (v: unknown): v is boolean =>
	[true, false].includes(v as boolean) ||
	["true", "false"].includes(v as string);

export const isNull = (v: unknown): v is null => v === null;

export const isUndefined = (v: unknown): v is undefined => v === undefined;

export const isNotSet = (v: unknown): boolean => isUndefined(v) && isNull(v);

export const isSet = (v: unknown): boolean => !isUndefined(v) && !isNull(v);

export const clamp = (v: number, min: number, max: number): number =>
	Math.max(min, Math.min(v, max));

export const isArray = (v: unknown): v is any[] => Array.isArray(v);

export const addLeadingZero = (v: number) => (v < 10 ? `0${v}` : v.toString());

export const sanitizeTextForDb = (v: string): string => v;
