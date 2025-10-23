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
