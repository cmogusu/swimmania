import type { EntityType } from "@/server/types";
import { BaseDatabase } from "../../services/BaseDatabase";
import type {
	DeleteInputData,
	GetAllInputData,
	GetByIdInputData,
	GetByIdsInputData,
	GetByNameInputData,
	InsertInputData,
	UpdateInputData,
} from "../InputData";
import type { RawEntity } from "../types";
import { Query } from "./Query";

export class Database extends BaseDatabase {
	metadataDelimiter: string = ";";
	metadataNameValueDelimiter: string = ":";

	query: Query;

	constructor() {
		super();
		this.query = new Query();
	}

	async getAll(
		entityType: EntityType,
		inputData: GetAllInputData,
	): Promise<RawEntity[]> {
		const { pageSize, offset } = inputData.getSanitized();
		const [rawEntities] = await this.query.getByType(
			entityType,
			pageSize,
			offset,
		);
		return rawEntities as RawEntity[];
	}

	async getByIds(
		entityType: EntityType,
		inputData: GetByIdsInputData,
	): Promise<RawEntity[]> {
		const { entityIds } = inputData.getSanitized();
		const [rawEntities] = await this.query.getByIds(entityType, entityIds);
		return rawEntities as RawEntity[];
	}

	async getById(
		entityType: EntityType,
		inputData: GetByIdInputData,
	): Promise<RawEntity> {
		const { entityId } = inputData.getSanitized();
		const [rawEntities] = await this.query.getById(entityType, entityId);
		const rawEntity = (rawEntities as RawEntity[])?.[0];
		if (!rawEntity) {
			throw Error("Entity not found");
		}

		return rawEntity;
	}

	async getByName(
		entityType: EntityType,
		inputData: GetByNameInputData,
	): Promise<RawEntity> {
		const { name } = inputData.getSanitized();
		const [rawEntities] = await this.query.getByName(entityType, name);
		const rawEntity = (rawEntities as RawEntity[])?.[0];
		if (!rawEntity) {
			throw Error("Entity not found");
		}

		return rawEntity;
	}

	async update(entityType: EntityType, inputData: UpdateInputData) {
		const cleanEntity = inputData.getSanitized();
		const [updateData] = await this.query.update(
			entityType,
			cleanEntity.entityId,
			cleanEntity.name,
			cleanEntity.description,
		);

		return updateData;
	}

	async insert(entityType: EntityType, inputData: InsertInputData) {
		const cleanEntity = inputData.getSanitized();
		const [insertData] = await this.query.insert(
			entityType,
			cleanEntity.name,
			cleanEntity.description,
		);

		return insertData;
	}

	async deleteById(entityType: EntityType, inputData: DeleteInputData) {
		const { entityId } = inputData.getSanitized();
		const [deleteData] = await this.query.deleteById(entityType, entityId);
		return deleteData;
	}
}
