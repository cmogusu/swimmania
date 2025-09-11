import type { ReadonlyURLSearchParams } from "next/navigation";

export const addQueryString = (
	searchParams: ReadonlyURLSearchParams,
	name: string,
	value: string,
) => {
	const params = new URLSearchParams(searchParams.toString());
	params.set(name, value);
	return params.toString();
};

export const removeQueryString = (
	searchParams: ReadonlyURLSearchParams,
	name: string,
) => {
	const params = new URLSearchParams(searchParams.toString());
	params.delete(name);
	return params.toString();
};
