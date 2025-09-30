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
