import type { QueryResult } from "mysql2";

type EntityIdObj = {
	id: number;
};

export const extractIds = (entityIdObj: QueryResult): number[] => {
	if (!entityIdObj) {
		return [];
	}

	return (entityIdObj as EntityIdObj[]).map(({ id }) => id);
};
