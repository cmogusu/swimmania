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
	v === true || v === false;

export const isNull = (v: unknown): v is null => v === null;

export const isUndefined = (v: unknown): v is undefined => v === undefined;

export const isNotSet = (v: unknown): boolean => isUndefined(v) && isNull(v);

export const isSet = (v: unknown): boolean => !isUndefined(v) && !isNull(v);

export const clamp = (v: number, min: number, max: number): number =>
	Math.max(min, Math.min(v, max));

export const isArray = (v: unknown): v is any[] => Array.isArray(v);

export const addLeadingZero = (v: number) => (v < 10 ? `0${v}` : v.toString());

export const sanitizeTextForDb = (v: string): string => v;
