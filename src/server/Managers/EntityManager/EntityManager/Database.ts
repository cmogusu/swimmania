import { BaseDatabase } from "../../services/BaseDatabase";
import type { EntityInputData } from "../EntityInputData/EntityInputData";
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
		const query = this.query.getByType(entityType, pageSize, offset);

		const rawEntities = await this.execSql(query);
		return rawEntities as RawEntity[];
	}

	async getByIds(entityData: EntityInputData): Promise<RawEntity[]> {
		const { entityType, entityIds } = entityData.getSanitizedGetByIdsInputs();
		const query = this.query.getByIds(entityType, entityIds);
		const rawEntities = await this.execSql(query);
		return rawEntities as RawEntity[];
	}

	async getById(entityData: EntityInputData): Promise<RawEntity> {
		const { entityType, entityId } = entityData.getSanitizedGetByIdInputs();
		const query = this.query.getById(entityType, entityId);
		const rawEntities = await this.execSql<RawEntity>(query);
		if (!rawEntities?.[0]) {
			throw Error("Entity not found");
		}

		return rawEntities?.[0] as RawEntity;
	}

	update(entityData: EntityInputData) {
		const cleanEntity = entityData.getSanitizedUploadInputs();
		const query = this.query.update(
			cleanEntity.entityType,
			cleanEntity.entityId,
			cleanEntity.name,
			cleanEntity.description,
			cleanEntity.location,
		);

		return this.execSql(query);
	}

	insert(entityData: EntityInputData) {
		const cleanEntity = entityData.getSanitizedUploadInputs();
		const query = this.query.insert(
			cleanEntity.entityType,
			cleanEntity.name,
			cleanEntity.description,
			cleanEntity.location,
		);
		return this.execSql(query);
	}

	deleteById(entityData: EntityInputData) {
		const { entityType, entityId } = entityData.getSanitizedUploadInputs();
		const query = this.query.deleteById(entityType, entityId);
		return this.execSql(query);
	}
}
