import type { DatabaseSync } from "node:sqlite";
import type { EntityType } from "@/server/types";
import type { DbOutput, ITempRawEntityDatabase } from "../types";
import { MAX_FAILURE_COUNT, PROCESSING_STATE } from "./constants";
import { getColumnsAndValues } from "./utils";

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

	// TODO: Delete
	reset() {
		const query = `UPDATE ${this.dbTable} SET isProcessed=0, failureCount=0`;
		const update = this.db.prepare(query);
		return update.run();
	}

	// TODO: Delete
	addColumn() {
		const query = `ALTER TABLE ${this.dbTable} ADD COLUMN failureCount INTEGER NOT NULL DEFAULT 0;`;
		this.db.exec(query);
	}

	getUnprocessed(): DbOutput<T> {
		const query = `SELECT * FROM ${this.dbTable} where isProcessed=${PROCESSING_STATE.UNPROCESSED} AND failureCount<${MAX_FAILURE_COUNT} ORDER BY id LIMIT 1`;
		const get = this.db.prepare(query);
		const response = get.all() as DbOutput<T>[];
		return response?.[0];
	}

	setIsProcessing(id: number) {
		const query = `UPDATE ${this.dbTable} SET isProcessed=${PROCESSING_STATE.PROCESSING} WHERE id=?`;
		const update = this.db.prepare(query);
		return update.run(id);
	}

	setProcessed(id: number) {
		const query = `UPDATE ${this.dbTable} SET isProcessed=${PROCESSING_STATE.PROCESSED} WHERE id=?`;
		const update = this.db.prepare(query);
		return update.run(id);
	}

	setProcessingFailure(id: number) {
		const query = `UPDATE ${this.dbTable} SET isProcessed=${PROCESSING_STATE.UNPROCESSED}, failureCount=failureCount + 1 WHERE id=?`;
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
