import type { DatabaseSync } from "node:sqlite";
import { EntityTypes } from "@/server/constants";
import type { EntityType } from "@/server/types";
import type { ITempEntityDatabase } from "../types";

export class TempEntityDatabase implements ITempEntityDatabase {
	// TODO: Replace DatabaseSync with better-sqlite3
	db: DatabaseSync;

	constructor(db: DatabaseSync) {
		this.db = db;
		this.createEntityIdsTables();
	}

	getDbTable(entityType: EntityType) {
		return `${entityType}_ids`;
	}

	createEntityIdsTables() {
		EntityTypes.map((entityType) => {
			this.createEntityIdsTable(entityType);
		});
	}

	createEntityIdsTable(entityType: EntityType) {
		const table = this.getDbTable(entityType);
		this.db.exec(`
		CREATE TABLE IF NOT EXISTS ${table}(
      entityId INTEGER PRIMARY KEY,
			name TEXT
		)	STRICT
	`);
	}

	getById(entityType: EntityType, entityId: number) {
		const table = this.getDbTable(entityType);
		console.log(table);
		const query = this.db.prepare(
			`SELECT name FROM ${table} WHERE entityId = ?`,
		);

		return query.get(entityId)?.name;
	}

	getByName(entityType: EntityType, name: string) {
		const table = this.getDbTable(entityType);
		const query = this.db.prepare(`SELECT entityId FROM ${table} WHERE name=?`);

		const { entityId } = query.get(name) || {};
		return entityId as number;
	}

	insert(entityType: EntityType, entityId: number, name: string) {
		const table = this.getDbTable(entityType);
		const query = `INSERT INTO ${table} (entityId, name) VALUES (?, ?) ON CONFLICT(entityId) DO UPDATE SET name = ?`;
		const insert = this.db.prepare(query);
		return insert.run(entityId, name, name);
	}

	getAll(entityType: EntityType) {
		const table = this.getDbTable(entityType);
		const query = `SELECT * FROM ${table} ORDER BY entityId`;
		const get = this.db.prepare(query);
		return get.all();
	}

	close() {
		this.db.close();
	}

	[Symbol.dispose]() {
		this.close();
	}
}
