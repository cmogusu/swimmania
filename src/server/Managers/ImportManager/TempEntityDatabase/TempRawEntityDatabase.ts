import type { DatabaseSync } from "node:sqlite";
import type { EntityType } from "@/server/types";
import type { ITempRawEntityDatabase } from "../types";
import { getColumnsAndValues } from "./utils";

export class TempRawEntityDatabase implements ITempRawEntityDatabase {
	db: DatabaseSync;
	dbTable: string;

	constructor(entityType: EntityType, db: DatabaseSync) {
		this.db = db;
		this.dbTable = this.getTableName(entityType);
		this.createRawEntityDataTable();
	}

	getTableName(entityType: EntityType) {
		if (!entityType) {
			throw Error("Entity type not set");
		}

		return `raw_${entityType}_data`;
	}

	createRawEntityDataTable() {
		throw Error("Not implemented");
	}

	insertRawData(_data: unknown) {
		throw Error("Not implemented");
	}

	deleteTable() {
		return this.db.exec(`DROP TABLE IF EXISTS ${this.dbTable}`);
	}

	insertSingleRowRawData(data: Record<string, string | number>) {
		const { columns, values } = getColumnsAndValues(data);
		const placeHolders = Array(columns.length).fill("?").join(",");
		const query = `INSERT INTO ${this.dbTable} (${columns.join(", ")}) VALUES (${placeHolders})`;
		const insert = this.db.prepare(query);
		return insert.run(...values);
	}

	getUnprocessed() {
		const query = `SELECT * FROM ${this.dbTable} where isProcessed=0 ORDER BY id`;
		const get = this.db.prepare(query);
		return get.all();
	}

	setProcessed(id: number) {
		const query = `UPDATE ${this.dbTable} SET isProcessed=1 WHERE id=?`;
		const update = this.db.prepare(query);
		return update.run(id);
	}

	getAllRawData() {
		const query = `SELECT * FROM ${this.dbTable} ORDER BY id`;
		const get = this.db.prepare(query);
		return get.all();
	}

	close() {
		this.db.close();
	}

	delete() {}

	[Symbol.dispose]() {
		this.close();
	}
}
