import type { DbTableColumn, RawMetadata } from "@/server/types";

export const arrayToObject = (
	arr: (string | number)[],
): Record<string, boolean> => {
	return arr.reduce(
		(obj, item) => {
			obj[item] = true;
			return obj;
		},
		{} as Record<string, boolean>,
	);
};

export const metadataResultToArray = (
	metadataResults: Record<string, unknown>,
): RawMetadata[] => {
	if (!metadataResults) {
		return [];
	}

	const { entityId, ...remainingResults } = metadataResults;
	const arr = [];
	for (const name in remainingResults) {
		arr.push({
			entityId,
			name: formatColumnNameFromDb(name),
			value: remainingResults[name],
		} as RawMetadata);
	}

	return arr;
};

export const formatMetadataFromDb = (rawMetadata: RawMetadata) => {
	const metadata: Record<string, unknown> = {};
	for (const name in metadata) {
		const updatedName = formatColumnNameFromDb(name);
		metadata[updatedName] = rawMetadata[name];
	}

	delete metadata.entityId;
	return metadata as RawMetadata;
};

export const formatMetadataForDb = (rawMetadata: RawMetadata) => {
	const metadata: Record<string, unknown> = {};
	for (const name in metadata) {
		const updatedName = formatColumnNameForDb(name);
		metadata[updatedName] = rawMetadata[name];
	}

	return metadata as RawMetadata;
};

export const formatColumnForDb = (column: DbTableColumn): DbTableColumn => ({
	name: formatColumnNameForDb(column.name),
	type: column.type,
});

export const formatColumnNameForDb = (columnName: string): string =>
	columnName.replace(".", "_");

export const formatColumnNameFromDb = (columnName: string): string =>
	columnName.replace("_", ".");

export const getMissingColumns = (
	columns: DbTableColumn[],
	columnNames: Record<string, boolean>,
): DbTableColumn[] => columns.filter((column) => !columnNames[column.name]);

export const getExtraColumnNames = (
	columns: DbTableColumn[],
	columnNames: Record<string, boolean>,
): string[] => {
	const columnNamesClone = { ...columnNames };
	columns.forEach((column) => {
		delete columnNamesClone[column.name];
	});

	return Object.keys(columnNamesClone);
};

export const extractMetadataNamesAndValues = (rawMetadata: RawMetadata) => {
	const names = [];
	const values = [];

	for (const key in rawMetadata) {
		const value = rawMetadata[key];
		values.push(value);
		names.push(key);
	}

	return { names, values };
};
