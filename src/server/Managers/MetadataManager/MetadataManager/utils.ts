import type { RawMetadata } from "@/server/types";
import type { DbTableColumn } from "../Metadata/types";

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
	const { id, entityId, ...remainingResults } = metadataResults;
	const arr = [];
	for (const name in remainingResults) {
		arr.push({
			id,
			entityId,
			name,
			value: remainingResults[name],
		} as RawMetadata);
	}

	return arr;
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

export const extractMetadataNamesAndValues = (
	rawMetadataArr: RawMetadata[],
) => {
	const length = rawMetadataArr.length;
	const names = Array(length);
	const values = Array(length);

	let i = 0;
	while (i < length) {
		names[i] = rawMetadataArr[i].name;
		values[i] = rawMetadataArr[i].value;
		i += 1;
	}

	return { names, values };
};
