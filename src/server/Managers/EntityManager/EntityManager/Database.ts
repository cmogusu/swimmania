import { BaseDatabase } from "../../services/BaseDatabase";
import type { EntityInputData } from "../EntityInputData";
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

	async getAll(entityData: EntityInputData): Promise<RawEntity[]> {
		const { entityType, pageSize, offset } =
			entityData.getSanitizedGetAllData();
		const [rawEntities] = await this.query.getByType(
			entityType,
			pageSize,
			offset,
		);
		return rawEntities as RawEntity[];
	}

	async getByIds(entityData: EntityInputData): Promise<RawEntity[]> {
		const { entityType, entityIds } = entityData.getSanitizedGetByIdsInputs();
		const [rawEntities] = await this.query.getByIds(entityType, entityIds);
		return rawEntities as RawEntity[];
	}

	async getById(entityData: EntityInputData): Promise<RawEntity> {
		const { entityType, entityId } = entityData.getSanitizedGetByIdInputs();
		const [rawEntities] = await this.query.getById(entityType, entityId);
		const rawEntity = (rawEntities as RawEntity[])?.[0];
		if (!rawEntity) {
			throw Error("Entity not found");
		}

		return rawEntity;
	}

	async getByName(entityData: EntityInputData): Promise<RawEntity> {
		const { entityType, name } = entityData.getSanitizedGetByNameInputs();
		const [rawEntities] = await this.query.getByName(entityType, name);
		const rawEntity = (rawEntities as RawEntity[])?.[0];
		if (!rawEntity) {
			throw Error("Entity not found");
		}

		return rawEntity;
	}

	async update(entityData: EntityInputData) {
		const cleanEntity = entityData.getSanitizedUploadInputs();
		const [updateData] = await this.query.update(
			cleanEntity.entityType,
			cleanEntity.entityId,
			cleanEntity.name,
			cleanEntity.description,
			cleanEntity.location,
		);

		return updateData;
	}

	async insert(entityData: EntityInputData) {
		const cleanEntity = entityData.getSanitizedUploadInputs();
		const [insertData] = await this.query.insert(
			cleanEntity.entityType,
			cleanEntity.name,
			cleanEntity.description,
			cleanEntity.location,
		);

		return insertData;
	}

	async deleteById(entityData: EntityInputData) {
		const { entityType, entityId } = entityData.getSanitizedUploadInputs();
		const [deleteData] = await this.query.deleteById(entityType, entityId);
		return deleteData;
	}
}
