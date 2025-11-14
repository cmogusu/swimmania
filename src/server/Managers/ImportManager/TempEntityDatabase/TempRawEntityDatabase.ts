import type { DatabaseSync } from "node:sqlite";
import type { EntityType } from "@/server/types";
import type { DbOutput, ITempRawEntityDatabase } from "../types";
import { getColumnsAndValues } from "./utils";

export const DATA_INSERTED_EVENT: string = "DATA_INSERTED";

export class TempRawEntityDatabase<T> implements ITempRawEntityDatabase {
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

	insert(_data: unknown) {
		throw Error("Not implemented");
	}

	deleteTable() {
		return this.db.exec(`DROP TABLE IF EXISTS ${this.dbTable}`);
	}

	insertSingleRowRawData(data: Record<string, string | number>) {
		const { columns, values } = getColumnsAndValues(data);
		const placeHolders = Array(columns.length).fill("?").join(",");
		const query = `INSERT INTO ${this.dbTable} (${columns.join(", ")}) VALUES (${placeHolders})`;
		const insertData = this.db.prepare(query).run(...values);
		return insertData;
	}

	getUnprocessed(): DbOutput<T> {
		const query = `SELECT * FROM ${this.dbTable} where isProcessed=0 ORDER BY id`;
		const get = this.db.prepare(query);
		return get.all() as DbOutput<T>;
	}

	setIsProcessing(id: number) {
		const query = `UPDATE ${this.dbTable} SET isProcessed=1 WHERE id=?`;
		const update = this.db.prepare(query);
		return update.run(id);
	}

	setProcessed(id: number) {
		const query = `UPDATE ${this.dbTable} SET isProcessed=2 WHERE id=?`;
		const update = this.db.prepare(query);
		return update.run(id);
	}

	getAll(): DbOutput<T>[] {
		const query = `SELECT * FROM ${this.dbTable} ORDER BY id`;
		const get = this.db.prepare(query);
		return get.all() as DbOutput<T>[];
	}

	close() {
		this.db.close();
	}

	delete() {}

	[Symbol.dispose]() {
		this.close();
	}
}
