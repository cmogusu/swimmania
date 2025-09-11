import type { EntityType } from "../../../types";
import {
	type Entity,
	type EntityGetByIdsRawInputs,
	EntityManagerFactory,
} from "../../EntityManager";
import { RelatedEntityInputData } from "../RelatedEntityInputData/RelatedEntityInputData";
import type { RelatedEntityRawInputData } from "../types";
import { Database } from "./Database";

export class RelatedEntityManager {
	db: Database;

	constructor() {
		this.db = new Database();
	}

	getRelated(
		rawRelatedEntityData: RelatedEntityRawInputData,
	): Promise<Entity[]> {
		return this.getAll(rawRelatedEntityData, true);
	}

	getNonRelated(
		rawRelatedEntityData: RelatedEntityRawInputData,
	): Promise<Entity[]> {
		return this.getAll(rawRelatedEntityData, false);
	}

	async getAll(
		rawRelatedEntityData: RelatedEntityRawInputData,
		isRelated: boolean,
	): Promise<Entity[]> {
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

	getEntities(entityIds: number[], entityType: EntityType): Promise<Entity[]> {
		const entityManager = EntityManagerFactory.getInstance(entityType);
		return entityManager.getByIds({ entityIds } as EntityGetByIdsRawInputs);
	}
}
