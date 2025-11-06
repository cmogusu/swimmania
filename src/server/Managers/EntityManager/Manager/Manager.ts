import type { EntityType, IPaginated } from "@/server/types";
import { ImageManager } from "../../ImageManager";
import { MetadataManager } from "../../MetadataManager";
import { UserManager } from "../../UserManager";
import { Entities } from "../Entities";
import { Entity } from "../Entity";
import {
	DeleteInputData,
	GetAllInputData,
	GetByIdInputData,
	GetByIdsInputData,
	GetByNameInputData,
	InsertInputData,
	UpdateInputData,
} from "../InputData";
import type {
	ILoadableEntity,
	RawDeleteEntityInputs,
	RawEntity,
	RawFilterByEntityInputs,
	RawGetAllEntityInputs,
	RawGetByIdEntityInputs,
	RawGetByIdsEntityInputs,
	RawGetByNameEntityInputs,
	RawInsertEntityInputs,
	RawUpdateEntityInputs,
} from "../types";
import { Database } from "./Database";

export class EntityManager {
	entityType: EntityType;
	db: Database;

	imageManager: ImageManager;
	metadataManager: MetadataManager;
	userManager: UserManager;

	constructor(entityType: EntityType) {
		this.entityType = entityType;
		this.db = new Database();
		this.imageManager = new ImageManager();
		this.metadataManager = new MetadataManager();
		this.userManager = new UserManager(entityType);
	}

	async getAll(rawInputs: RawGetAllEntityInputs): Promise<Entities> {
		if (rawInputs.filters) {
			return this.filterBy(rawInputs as RawFilterByEntityInputs);
		}

		const inputData = new GetAllInputData(rawInputs);
		inputData.validateData();

		const canView = await this.userManager.canViewEntities();
		if (!canView) {
			throw Error("Access denied");
		}

		const rawEntities = await this.db.getAll(this.entityType, inputData);
		const entities = await this.createEntities(rawEntities, inputData);
		return entities;
	}

	async getByIds(rawInputs: RawGetByIdsEntityInputs): Promise<Entities> {
		const inputData = new GetByIdsInputData(rawInputs);
		inputData.validateData();

		const rawEntities: RawEntity[] = rawInputs.entityIds.length
			? await this.db.getByIds(this.entityType, inputData)
			: [];

		const entities = await this.createEntities(rawEntities, inputData);
		return entities;
	}

	async getById(rawInputs: RawGetByIdEntityInputs): Promise<Entity> {
		const inputData = new GetByIdInputData(rawInputs);
		inputData.validateData();

		const canView = await this.userManager.canViewEntity(inputData.entityId);
		console.log({ canView });
		if (!canView) {
			throw Error("Access denied");
		}

		const rawEntity = await this.db.getById(this.entityType, inputData);
		const entity = new Entity(rawEntity);
		entity.loadRelatedData(inputData, this.imageManager);

		return entity;
	}

	async getByName(rawInputs: RawGetByNameEntityInputs): Promise<Entity> {
		const inputData = new GetByNameInputData(rawInputs);
		inputData.validateData();

		const rawEntity = await this.db.getByName(this.entityType, inputData);
		const entity = new Entity(rawEntity);
		entity.loadRelatedData(inputData, this.imageManager);

		return entity;
	}

	async update(rawInputs: RawUpdateEntityInputs) {
		const inputData = new UpdateInputData(rawInputs);
		inputData.validateData();

		const canView = await this.userManager.canEditEntity(inputData.entityId);
		if (!canView) {
			throw Error("Access denied. Not allowed to edit entity");
		}

		const updateData = await this.db.update(this.entityType, inputData);

		// @ts-ignore
		if (!updateData?.affectedRows) {
			throw Error("Unable to update entity");
		}

		return { id: rawInputs.entityId };
	}

	async insert(rawInputs: RawInsertEntityInputs) {
		const inputData = new InsertInputData(rawInputs);
		inputData.validateData();

		const canEdit = await this.userManager.canCreateEntity();
		if (!canEdit) {
			throw Error("Access denied. Not allowed to create entity");
		}

		const insertData = await this.db.insert(this.entityType, inputData);
		// @ts-ignore
		const { insertId } = insertData || {};
		if (!insertId) {
			throw Error("Unable to create entity");
		}

		await this.userManager.grantAccess(insertId);
		return { id: insertId };
	}

	async deleteById(rawInputs: RawDeleteEntityInputs) {
		const inputData = new DeleteInputData(rawInputs);
		inputData.validateData();

		const canEdit = await this.userManager.canDeleteEntity(inputData.entityId);
		if (!canEdit) {
			throw Error("Access denied. Not allowed to delete entity");
		}

		const deleteData = await this.db.deleteById(this.entityType, inputData);

		// @ts-ignore
		if (!deleteData?.affectedRows) {
			throw Error("Unable to delete entity");
		}

		// @ts-ignore
		return { id: entityId };
	}

	findExisting(rawInputs: RawGetByNameEntityInputs) {
		return this.getByName(rawInputs);
	}

	async filterBy(rawInputs: RawFilterByEntityInputs) {
		const entityIds = await this.metadataManager.filterBy({
			entityType: this.entityType,
			filters: rawInputs.filters || [],
		});

		return this.getByIds({
			entityIds,
			entityType: this.entityType,
			...rawInputs,
		} as unknown as RawGetByIdsEntityInputs);
	}

	async createEntities(
		rawEntities: RawEntity[],
		inputData: ILoadableEntity & IPaginated,
	) {
		const entities = new Entities(rawEntities, inputData, this.imageManager);

		await entities.loadRelatedData();
		return entities;
	}

	merge(a: Record<string, unknown>, b: Record<string, unknown>) {
		return { ...a, ...b };
	}
}
