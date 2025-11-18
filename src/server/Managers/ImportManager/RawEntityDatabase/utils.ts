export const getColumnsAndValues = (data: Record<string, number | string>) => {
	const columns = [];
	const values = [];

	for (const key in data) {
		columns.push(key);
		values.push(data[key]);
	}

	return { columns, values };
};
