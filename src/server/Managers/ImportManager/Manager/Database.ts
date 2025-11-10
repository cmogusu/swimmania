import { access } from "node:fs/promises";
import { DatabaseSync } from "node:sqlite";
import type { EntityType } from "@/server/types";

export class Database {
	db: string;

	constructor(dbPath: string) {
		access(dbPath);
		this.db = new DatabaseSync(dbPath);
	}

	createEntityDbTable(entityType: EntityType) {
		this.db.exec(
			`
		CREATE TABLE IF NOT EXISTS ${entityType}(
      entityId INTEGER PRIMARY KEY,
			name TEXT
		)	STRICT
    `,
			(statement: unknown, error: Error | null) => {
				console.log("done", error, statement);
			},
		);
	}

	getById(entityType: EntityType, entityId: number) {
		const query = this.db.prepare(
			`SELECT name FROM ${entityType} WHERE entityId = ?`,
		);

		query.get(entityId);
	}

	getByName(entityType: EntityType, name: string) {
		const query = this.db.prepare(
			`SELECT entityId FROM ${entityType} WHERE name=?`,
		);

		const { entityId } = query.get(name) || {};
		return entityId;
	}

	insert(entityType: EntityType, entityId: number, name: string) {
		const query = `INSERT INTO ${entityType} (entityId, name) values (?, ?)`;
		const insert = this.db.prepare(query);
		return insert.run(entityId, name);
	}

	getAll(entityType: EntityType) {
		const query = `SELECT * FROM ${entityType} ORDER BY entityId`;
		const get = this.db.prepare(query);
		return get.all();
	}

	destroy() {
		this.db.close();
	}
}
