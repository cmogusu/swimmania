import type { EntityType } from "../../../types";
import {
	type EntityGetByIdsRawInputs,
	entityManagerFactory,
} from "../../EntityManager";
import type { Entities } from "../../EntityManager/Entities";
import { RelatedEntityInputData } from "../RelatedEntityInputData";
import type { RelatedEntityRawInputData } from "../types";
import { Database } from "./Database";

export class RelatedEntityManager {
	db: Database;

	constructor() {
		this.db = new Database();
	}

	getRelated(
		rawRelatedEntityData: RelatedEntityRawInputData,
	): Promise<Entities> {
		return this.getAll(rawRelatedEntityData, true);
	}

	getNonRelated(
		rawRelatedEntityData: RelatedEntityRawInputData,
	): Promise<Entities> {
		return this.getAll(rawRelatedEntityData, false);
	}

	async getAll(
		rawRelatedEntityData: RelatedEntityRawInputData,
		isRelated: boolean,
	): Promise<Entities> {
		const inputData = new RelatedEntityInputData(rawRelatedEntityData);
		inputData.validateGetAllData();

		const entityIds = isRelated
			? await this.db.getRelated(inputData)
			: await this.db.getNonRelated(inputData);

		return await this.getEntities(
			entityIds,
			rawRelatedEntityData.relatedEntityType,
		);
	}

	async insert(rawRelatedEntityData: RelatedEntityRawInputData) {
		const inputData = new RelatedEntityInputData(rawRelatedEntityData);
		inputData.validateInsertData();

		const insertData = await this.db.insert(inputData);
		// @ts-ignore
		if (!insertData?.insertId) {
			throw Error("Unable to create metadata");
		}

		// @ts-ignore
		return { id: insertData.insertId };
	}

	async insertBulk(rawRelatedEntityDataArr: RelatedEntityRawInputData[]) {
		const insertPromise = rawRelatedEntityDataArr.map((data) =>
			this.insert(data),
		);

		await Promise.all(insertPromise);
	}

	async deleteById(rawRelatedEntityData: RelatedEntityRawInputData) {
		const inputData = new RelatedEntityInputData(rawRelatedEntityData);
		inputData.validateDeleteData();

		const deleteData = await this.db.deleteById(inputData);
		// @ts-ignore
		if (!deleteData?.affectedRows) {
			throw Error("Unable to delete metadata");
		}

		// @ts-ignore
		return { id: entityId };
	}

	getEntities(entityIds: number[], entityType: EntityType): Promise<Entities> {
		const entityManager = entityManagerFactory.getInstance(entityType);
		return entityManager.getByIds({ entityIds } as EntityGetByIdsRawInputs);
	}
}
