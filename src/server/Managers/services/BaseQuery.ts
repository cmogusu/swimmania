import { isNumber } from "@/server/utils";

export class BaseQuery {
	table_delete: string | undefined;

	getAll_delete(limit: number, offset: number) {
		this.throwIfNotSet({
			limit,
			offset,
			table: this.table_delete,
		});

		return `SELECT * FROM \`${this.table_delete}\` LIMIT ${limit} OFFSET ${offset};`;
	}

	formatUpdateValues(
		updateValues: Record<string, number | boolean | string>,
	): string {
		const setValueArr: string[] = [];
		for (const name in updateValues) {
			const value = updateValues[name];
			const valueStr = isNumber(value)
				? `${name}=${value}`
				: `${name}='${value}'`;

			setValueArr.push(valueStr);
		}

		return setValueArr.join(", ");
	}

	formatInsertValues(insertValues: Record<string, unknown>): {
		keys: string;
		values: string;
	} {
		const keys = Object.keys(insertValues)
			.map((v) => `\`${v}\``)
			.join(", ");
		const values = Object.values(insertValues)
			.map((v) => `'${v}'`)
			.join(", ");

		return { keys, values };
	}

	throwIfNotSet(values: { [_: string]: unknown }) {
		for (const name in values) {
			const value = values[name];

			if (value === undefined || value === null) {
				throw Error(`${name} not set`);
			}
		}
	}
}
