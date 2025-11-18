import EventEmitter from "node:events";
import type { DatabaseSync } from "node:sqlite";
import type { EntityType } from "@/server/types";
import type { EntityInsertData } from "../Manager/types";
import type { DbOutput, IDataStore, IRawEntityDatabase } from "../types";
import {
	DATA_ENDED_SETTINGS_NAME,
	MAX_FAILURE_COUNT,
	PROCESSING_STATE,
} from "./constants";
import { getColumnsAndValues } from "./utils";

export class RawEntityDatabase<OutputType>
	extends EventEmitter
	implements IDataStore, IRawEntityDatabase
{
	db: DatabaseSync;
	dbTable: string;
	settingsTable: string;

	constructor(db: DatabaseSync, entityType: EntityType) {
		super();
		this.db = db;
		this.dbTable = `raw_${entityType}_data`;
		this.createRawEntityDataTable();

		this.settingsTable = `${entityType}_settings`;
		this.createSettingsTable();
	}

	createRawEntityDataTable() {
		throw Error("Not implemented");
	}

	createSettingsTable() {
		this.db.exec(`
      CREATE TABLE IF NOT EXISTS ${this.settingsTable} (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        value TEXT NULL
      ) STRICT
    `);
	}

	insert(_data: unknown) {
		throw Error("Not implemented");
	}

	setDataEnded() {
		const query = `INSERT INTO ${this.settingsTable} (name, value) VALUES ('${DATA_ENDED_SETTINGS_NAME}', 'true')`;
		const update = this.db.prepare(query);
		return update.run();
	}

	getWasDataEnded(): boolean {
		const query = `SELECT * FROM ${this.settingsTable} where name='${DATA_ENDED_SETTINGS_NAME}' ORDER BY id LIMIT 1`;
		const prepared = this.db.prepare(query);
		return !!prepared.get();
	}

	getAllSettings() {
		const query = `SELECT * FROM ${this.settingsTable} ORDER BY id`;
		const get = this.db.prepare(query);
		return get.all();
	}

	// TODO: Delete
	deleteTable() {
		return this.db.exec(`DROP TABLE IF EXISTS ${this.dbTable}`);
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

	getData(): EntityInsertData<OutputType> | undefined {
		const data = this.getUnprocessed();
		if (!data) {
			return;
		}

		this.setIsProcessing(data.id);
		const onComplete = (isProcessingSuccessful: boolean) => {
			if (isProcessingSuccessful) {
				this.setProcessed(data.id);
			} else {
				this.setProcessingFailure(data.id);
			}
		};

		return { data, onComplete };
	}

	insertSingleRowRawData(data: Record<string, string | number>) {
		const { columns, values } = getColumnsAndValues(data);
		const placeHolders = Array(columns.length).fill("?").join(",");
		const query = `INSERT INTO ${this.dbTable} (${columns.join(", ")}) VALUES (${placeHolders})`;
		const insertData = this.db.prepare(query).run(...values);
		return insertData;
	}

	getUnprocessed(): DbOutput<OutputType> {
		const query = `SELECT * FROM ${this.dbTable} where isProcessed=${PROCESSING_STATE.UNPROCESSED} AND failureCount<${MAX_FAILURE_COUNT} ORDER BY id LIMIT 1`;
		const prepared = this.db.prepare(query);
		return prepared.get() as DbOutput<OutputType>;
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

	getAll(): DbOutput<OutputType>[] {
		const query = `SELECT * FROM ${this.dbTable} ORDER BY id`;
		const get = this.db.prepare(query);
		return get.all() as DbOutput<OutputType>[];
	}

	close() {
		this.db.close();
	}

	[Symbol.dispose]() {
		this.close();
	}
}
