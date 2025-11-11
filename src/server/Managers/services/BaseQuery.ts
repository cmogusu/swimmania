import type mysql from "mysql2/promise";
import { isArray, isString } from "@/server/utils";
import { getConnectionPool } from "./DbConnectionPool";
import { Log } from "./Log";

export class BaseQuery {
	log: Log;
	connectionPool: mysql.Pool;

	isDisposed: boolean = false;
	MaxQueryLimit: number = 1000;

	constructor() {
		this.log = new Log();
		this.connectionPool = getConnectionPool(this.log);
	}

	exec(sql: string, values: unknown) {
		return this.connectionPool.execute(sql, values);
	}

	throwIfNotSet(values: { [_: string]: unknown }) {
		for (const name in values) {
			const value = values[name];

			if (isArray(value) && !value.length) {
				throw Error(`${name} array is empty`);
			}

			if (value === undefined || value === null) {
				throw Error(`${name} not set`);
			}
		}
	}

	logQuery(query: string, params: unknown[]) {
		let i = 0;
		const stringQuery = query.replaceAll("?", () => {
			const param = params[i++];
			return isString(param) ? `'${param}'` : `${param}`;
		});

		this.log.appLogic(stringQuery);
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
