import type { EntityType } from "../../../types";
import { ImageManager } from "../../ImageManager";
import { MetadataManager } from "../../MetadataManager";
import { Entity } from "../Entity";
import { EntityInputData } from "../EntityInputData/EntityInputData";
import type {
	EntityDatabaseOutputData,
	EntityDeleteRawInputs,
	EntityFilterByRawInputs,
	EntityGetAllRawInputs,
	EntityGetByIdRawInputs,
	EntityGetByIdsRawInputs,
	EntityLoadRelatedDataOptions,
	EntityPostRawInputs,
	EntityUpdateRawInputs,
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

	async getAll(rawInputs: EntityGetAllRawInputs): Promise<Entity[]> {
		if (rawInputs.filters) {
			return this.filterBy(rawInputs as EntityFilterByRawInputs);
		}

		const updatedInputs = this.merge(
			this.multipleItemsLoadRelatedDataOptions,
			rawInputs,
		);

		const entityData = new EntityInputData(this.entityType, updatedInputs);
		entityData.validateGetAllInputs();

		const rawEntities = await this.db.getAll(entityData);
		return await this.createEntities(
			rawEntities,
			entityData.getLoadRelatedDataOptions(),
		);
	}

	async getById(rawInputs: EntityGetByIdRawInputs) {
		const updatedInputs = this.merge(
			this.singleItemLoadRelatedDataOptions,
			rawInputs,
		);
		const entityData = new EntityInputData(this.entityType, updatedInputs);
		entityData.validateGetByIdInputs();

		const rawEntry = await this.db.getById(entityData);
		return await this.createEntity(
			rawEntry,
			entityData.getLoadRelatedDataOptions(),
		);
	}

	async getByIds(rawInputs: EntityGetByIdsRawInputs): Promise<Entity[]> {
		const updatedInputs = this.merge(
			this.multipleItemsLoadRelatedDataOptions,
			rawInputs,
		);
		const entityData = new EntityInputData(this.entityType, updatedInputs);
		entityData.validateGetByIdsInputs();

		const rawEntries = await this.db.getByIds(entityData);
		return await this.createEntities(
			rawEntries,
			entityData.getLoadRelatedDataOptions(),
		);
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

	private async createEntity(
		rawEntity: EntityDatabaseOutputData,
		inputData?: EntityLoadRelatedDataOptions,
	): Promise<Entity> {
		const entity = new Entity(
			rawEntity,
			this.imageManager,
			this.metadataManager,
		);

		if (inputData) {
			await entity.loadRelatedData.call(entity, inputData);
		}

		return entity;
	}

	private async createEntities(
		rawEntities: EntityDatabaseOutputData[],
		inputData?: EntityLoadRelatedDataOptions,
	): Promise<Entity[]> {
		const creationTasks = rawEntities.map((rawEntity) =>
			this.createEntity(rawEntity, inputData),
		);

		return await Promise.all(creationTasks);
	}

	merge(a: Record<string, unknown>, b: Record<string, unknown>) {
		return { ...a, ...b };
	}
}
