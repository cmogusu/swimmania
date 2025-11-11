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

	hasRelationship(rawInputData: RawHasRelationshipData) {
		const inputData = new HasRelationshipInputData(rawInputData);
		inputData.validateData();

		return this.db.hasExisting(inputData);
	}

	async upsert(rawInputData: RawInsertRelatedInputData): Promise<void> {
		const inputData = new InsertInputData(rawInputData);
		inputData.validateData();

		await this.db.upsert(inputData);
	}

	async insertBulk(rawRelatedEntityDataArr: RawInsertRelatedInputData[]) {
		const insertPromise = rawRelatedEntityDataArr.map((data) =>
			this.upsert(data),
		);

		await Promise.all(insertPromise);
	}

	async deleteById(rawInputData: RawDeleteByIdRelatedInputData) {
		const inputData = new DeleteInputData(rawInputData);
		inputData.validateData();

		const deleteData = await this.db.deleteById(inputData);
		if (!deleteData?.affectedRows) {
			throw Error("Unable to delete metadata");
		}

		return { id: rawInputData.entityId };
	}

	async deleteAll(rawInputData: RawDeleteAllRelatedInputData) {
		const inputData = new DeleteAllInputData(rawInputData);
		inputData.validateData();

		const deleteData = await this.db.deleteAll(inputData);
		if (!deleteData?.affectedRows) {
			throw Error("Unable to delete metadata");
		}

		return { id: rawInputData.entityId };
	}
}
