import {
	DeleteInputData,
	GetInputData,
	HasRelationshipInputData,
	InsertInputData,
} from "../InputData";
import { DeleteAllInputData } from "../InputData/DeleteAllInputData";
import type {
	RawDeleteAllRelatedInputData,
	RawDeleteByIdRelatedInputData,
	RawGetNonRelatedInputData,
	RawGetRelatedInputData,
	RawHasRelationshipData,
	RawInsertRelatedInputData,
} from "../types";
import { Database } from "./Database";

export class RelatedEntityIdManager {
	db: Database;

	constructor() {
		this.db = new Database();
	}

	async getRelated(
		rawRelatedEntityData: RawGetRelatedInputData,
	): Promise<number[]> {
		return this.getAll(rawRelatedEntityData, true);
	}

	getNonRelated(
		rawRelatedEntityData: RawGetNonRelatedInputData,
	): Promise<number[]> {
		return this.getAll(rawRelatedEntityData, false);
	}

	async getAll(
		rawRelatedEntityData: RawGetRelatedInputData,
		isRelated: boolean,
	): Promise<number[]> {
		const inputData = new GetInputData(rawRelatedEntityData);
		inputData.validateData();

		return isRelated
			? await this.db.getRelated(inputData)
			: await this.db.getNonRelated(inputData);
	}

	hasRelationship(rawHasRelationshipData: RawHasRelationshipData) {
		const inputData = new HasRelationshipInputData(rawHasRelationshipData);
		inputData.validateData();

		return this.db.hasExisting(inputData);
	}

	async insert(rawRelatedEntityData: RawInsertRelatedInputData) {
		const inputData = new InsertInputData(rawRelatedEntityData);
		inputData.validateData();

		const insertData = await this.db.insert(inputData);
		// @ts-ignore
		if (!insertData?.insertId) {
			throw Error("Unable to create metadata");
		}

		// @ts-ignore
		return { id: insertData.insertId };
	}

	async insertBulk(rawRelatedEntityDataArr: RawInsertRelatedInputData[]) {
		const insertPromise = rawRelatedEntityDataArr.map((data) =>
			this.insert(data),
		);

		await Promise.all(insertPromise);
	}

	async deleteById(rawRelatedEntityData: RawDeleteByIdRelatedInputData) {
		const inputData = new DeleteInputData(rawRelatedEntityData);
		inputData.validateData();

		const deleteData = await this.db.deleteById(inputData);
		// @ts-ignore
		if (!deleteData?.affectedRows) {
			throw Error("Unable to delete metadata");
		}

		// @ts-ignore
		return { id: entityId };
	}

	async deleteAll(rawRelatedEntityData: RawDeleteAllRelatedInputData) {
		const inputData = new DeleteAllInputData(rawRelatedEntityData);
		inputData.validateData();

		const deleteData = await this.db.deleteAll(inputData);
		// @ts-ignore
		if (!deleteData?.affectedRows) {
			throw Error("Unable to delete metadata");
		}

		// @ts-ignore
		return { id: entityId };
	}
}
