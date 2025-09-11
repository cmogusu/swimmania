import mysql from "mysql2/promise";
import type { Log } from "./Log";

let connectionPool: mysql.Pool;

export function getConnectionPool(log: Log) {
	if (connectionPool) {
		return connectionPool;
	}

	const { MARIADB_DATABASE, MARIADB_USER, MARIADB_PASSWORD } = process.env;
	if (!MARIADB_DATABASE || !MARIADB_USER || !MARIADB_PASSWORD) {
		throw Error(
			"Database connection config missing. Please set them in the env file",
		);
	}

	connectionPool = mysql.createPool({
		host: "localhost",
		database: process.env.MARIADB_DATABASE,
		user: process.env.MARIADB_USER,
		password: process.env.MARIADB_PASSWORD,
		waitForConnections: true,
		connectionLimit: 10,
		maxIdle: 10,
		idleTimeout: 60000,
		queueLimit: 0,
		enableKeepAlive: true,
		keepAliveInitialDelay: 0,
	});

	log.appLogic("Initialized connection to database");
	return connectionPool;
}
