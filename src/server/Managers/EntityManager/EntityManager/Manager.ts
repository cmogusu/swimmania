import type { EntityType } from "../../../types";
import { ImageManager } from "../../ImageManager";
import { MetadataManager } from "../../MetadataManager";
import { Entities } from "../Entities";
import { Entity } from "../Entity";
import { EntityInputData } from "../EntityInputData";
import type {
	EntityDeleteRawInputs,
	EntityFilterByRawInputs,
	EntityGetAllRawInputs,
	EntityGetByIdRawInputs,
	EntityGetByIdsRawInputs,
	EntityGetByNameRawInputs,
	EntityLoadRelatedDataOptions,
	EntityPostRawInputs,
	EntityUpdateRawInputs,
	RawEntity,
} from "../types";
import { Database } from "./Database";

export class EntityManager {
	entityType: EntityType;
	db: Database;

	imageManager: ImageManager;
	metadataManager: MetadataManager;

	singleItemLoadRelatedDataOptions: EntityLoadRelatedDataOptions = {
		loadImages: true,
		loadDefaultImage: true,
		loadMetadata: true,
	};

	multipleItemsLoadRelatedDataOptions: EntityLoadRelatedDataOptions = {
		loadImages: false,
		loadDefaultImage: true,
		loadMetadata: false,
	};

	constructor(entityType: EntityType) {
		this.entityType = entityType;
		this.db = new Database();

		this.imageManager = new ImageManager();
		this.metadataManager = new MetadataManager();
	}

	async getAll(rawInputs: EntityGetAllRawInputs): Promise<Entities> {
		if (rawInputs.filters) {
			return this.filterBy(rawInputs as EntityFilterByRawInputs);
		}

		const updatedInputs = this.merge(
			this.multipleItemsLoadRelatedDataOptions,
			rawInputs,
		);

		const entityInputData = new EntityInputData(this.entityType, updatedInputs);
		entityInputData.validateGetAllInputs();

		const rawEntities = await this.db.getAll(entityInputData);
		const entities = await this.getEntities(rawEntities, entityInputData);
		return entities;
	}

	async getByIds(rawInputs: EntityGetByIdsRawInputs): Promise<Entities> {
		const updatedInputs = this.merge(
			this.multipleItemsLoadRelatedDataOptions,
			rawInputs,
		);
		const entityInputData = new EntityInputData(this.entityType, updatedInputs);
		entityInputData.validateGetByIdsInputs();

		const rawEntities = await this.db.getByIds(entityInputData);
		const entities = await this.getEntities(rawEntities, entityInputData);
		return entities;
	}

	async getById(rawInputs: EntityGetByIdRawInputs): Promise<Entity> {
		const updatedInputs = this.merge(
			this.singleItemLoadRelatedDataOptions,
			rawInputs,
		);
		const entityInputData = new EntityInputData(this.entityType, updatedInputs);
		entityInputData.validateGetByIdInputs();

		const rawEntity = await this.db.getById(entityInputData);
		const entity = new Entity(rawEntity);
		entity.loadRelatedData(
			entityInputData,
			this.imageManager,
			this.metadataManager,
		);

		return entity;
	}

	async getByName(rawInputs: EntityGetByNameRawInputs): Promise<Entity> {
		const updatedInputs = this.merge(
			this.singleItemLoadRelatedDataOptions,
			rawInputs,
		);
		const entityInputData = new EntityInputData(this.entityType, updatedInputs);
		entityInputData.validateGetByIdInputs();

		const rawEntity = await this.db.getByName(entityInputData);
		const entity = new Entity(rawEntity);
		entity.loadRelatedData(
			entityInputData,
			this.imageManager,
			this.metadataManager,
		);

		return entity;
	}

	async update(rawInputs: EntityUpdateRawInputs) {
		const entityData = new EntityInputData(this.entityType, rawInputs);
		entityData.validateUpdateInputs();
		const updateData = await this.db.update(entityData);

		// @ts-ignore
		if (!updateData?.affectedRows) {
			throw Error("Unable to update entity");
		}

		return { id: rawInputs.entityId };
	}

	async insert(rawInputs: EntityPostRawInputs) {
		const entityData = new EntityInputData(this.entityType, rawInputs);
		entityData.validateInsertInputs();

		const insertData = await this.db.insert(entityData);

		// @ts-ignore
		if (!insertData?.affectedRows) {
			throw Error("Unable to create entity");
		}

		// @ts-ignore
		return { id: insertData.insertId };
	}

	async deleteById(rawInputs: EntityDeleteRawInputs) {
		const entityData = new EntityInputData(this.entityType, rawInputs);
		entityData.validateInsertInputs();
		const deleteData = await this.db.deleteById(entityData);

		// @ts-ignore
		if (!deleteData?.affectedRows) {
			throw Error("Unable to delete entity");
		}

		// @ts-ignore
		return { id: entityId };
	}

	async filterBy(rawInputs: EntityFilterByRawInputs) {
		const entityData = new EntityInputData(this.entityType, rawInputs);
		entityData.validateFilterByInputs();
		const entityIds = await this.metadataManager.filterBy({
			entityType: this.entityType,
			filters: rawInputs.filters,
		});

		return this.getByIds({
			entityIds,
			entityType: this.entityType,
			...rawInputs,
		} as unknown as EntityGetByIdsRawInputs);
	}

	async getEntities(
		rawEntities: RawEntity[],
		entityInputData: EntityInputData,
	) {
		const entities = new Entities(
			rawEntities,
			entityInputData,
			this.imageManager,
			this.metadataManager,
		);

		await entities.loadRelatedData();
		return entities;
	}

	merge(a: Record<string, unknown>, b: Record<string, unknown>) {
		return { ...a, ...b };
	}
}
