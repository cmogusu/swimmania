import type mysql from "mysql2/promise";
import type { FieldPacket, QueryResult } from "mysql2/promise";
import { isNumber } from "@/server/utils";
import { getConnectionPool } from "./DbConnectionPool";
import { Log } from "./Log";

export class BaseQuery {
	log: Log;
	connectionPool: mysql.Pool;
	exec: <T extends QueryResult>(
		sql: string,
		values: unknown,
	) => Promise<[T, FieldPacket[]]>;

	isDisposed: boolean = false;

	constructor() {
		this.log = new Log();
		this.connectionPool = getConnectionPool(this.log);
		this.exec = this.connectionPool.execute;
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

	[Symbol.dispose]() {
		if (!this.isDisposed) {
			this.connectionPool.end().then(() => {
				this.log.appLogic("Ended connection");
			});

			this.isDisposed = true;
		}
	}
}
