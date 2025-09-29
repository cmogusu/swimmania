import type mysql from "mysql2/promise";
import { getConnectionPool } from "./DbConnectionPool";
import { Log } from "./Log";

export class BaseDatabase {
	log: Log;
	connectionPool: mysql.Pool;
	isDisposed: boolean = false;

	constructor() {
		this.log = new Log();
		this.connectionPool = getConnectionPool(this.log);
	}

	// TODO: Convert to connectionPool.execute
	async execSql<T>(query: string): Promise<T[]> {
		const [rows] = await this.connectionPool.query(query);
		return rows as T[];
	}

	escape(value: unknown) {
		this.connectionPool.escape(value);
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
