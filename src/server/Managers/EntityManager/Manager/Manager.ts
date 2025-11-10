import type { EntityType } from "@/server/types";
import { type ImageManager, imageManagerFactory } from "../../ImageManager";
import {
	type MetadataManager,
	metadataManagerFactory,
} from "../../MetadataManager";
import {
	type RelatedEntityIdManager,
	relatedEntityIdManagerFactory,
} from "../../RelatedEntityIdManager";
import { type UserManager, userManagerFactory } from "../../UserManager";
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
	relatedEntityIdManager: RelatedEntityIdManager;

	constructor(entityType: EntityType) {
		this.entityType = entityType;
		this.db = new Database();
		this.imageManager = imageManagerFactory.getInstance();
		this.metadataManager = metadataManagerFactory.getInstance();
		this.userManager = userManagerFactory.getInstance();
		this.relatedEntityIdManager = relatedEntityIdManagerFactory.getInstance();
	}

	async getAll(rawInputs: RawGetAllEntityInputs): Promise<Entities> {
		if (rawInputs.filters) {
			return this.filterBy(rawInputs as RawFilterByEntityInputs);
		}

		const inputData = new GetAllInputData(rawInputs);
		inputData.validateData();

		await this.userManager.assertCanViewEntities(this.entityType);

		const rawEntities = await this.db.getAll(this.entityType, inputData);
		const entities = new Entities(rawEntities, inputData);
		return await this.loadRelatedEntitiesData(entities, inputData);
	}

	async getByIds(rawInputs: RawGetByIdsEntityInputs): Promise<Entities> {
		const inputData = new GetByIdsInputData(rawInputs);
		inputData.validateData();

		const rawEntities: RawEntity[] = rawInputs.entityIds.length
			? await this.db.getByIds(this.entityType, inputData)
			: [];

		const entities = new Entities(rawEntities, inputData);
		return await this.loadRelatedEntitiesData(entities, inputData);
	}

	async getById(rawInputs: RawGetByIdEntityInputs): Promise<Entity> {
		const inputData = new GetByIdInputData(rawInputs);
		inputData.validateData();

		await this.userManager.assertCanViewEntity(
			this.entityType,
			inputData.entityId,
		);

		const rawEntity = await this.db.getById(this.entityType, inputData);
		const entity = new Entity(rawEntity);
		return await this.loadRelatedEntityData(entity, inputData);
	}

	async getByName(rawInputs: RawGetByNameEntityInputs): Promise<Entity> {
		const inputData = new GetByNameInputData(rawInputs);
		inputData.validateData();

		const rawEntity = await this.db.getByName(this.entityType, inputData);
		const entity = new Entity(rawEntity);
		return await this.loadRelatedEntityData(entity, inputData);
	}

	async update(rawInputs: RawUpdateEntityInputs) {
		const inputData = new UpdateInputData(rawInputs);
		inputData.validateData();

		await this.userManager.assertCanEditEntity(
			this.entityType,
			inputData.entityId,
		);

		const updateData = await this.db.update(this.entityType, inputData);
		if (!updateData?.affectedRows) {
			throw Error("Unable to update entity");
		}

		return { id: rawInputs.entityId };
	}

	async insert(rawInputs: RawInsertEntityInputs) {
		const inputData = new InsertInputData(rawInputs);
		inputData.validateData();

		await this.userManager.assertCanCreateEntity(this.entityType);

		const insertData = await this.db.insert(this.entityType, inputData);
		const { insertId } = insertData || {};
		if (!insertId) {
			throw Error("Unable to create entity");
		}

		await this.userManager.grantAccess(this.entityType, insertId);
		return { id: insertId };
	}

	async deleteById(rawInputs: RawDeleteEntityInputs) {
		const inputData = new DeleteInputData(rawInputs);
		inputData.validateData();

		await this.userManager.assertCanDeleteEntity(
			this.entityType,
			inputData.entityId,
		);

		const deleteData = await this.db.deleteById(this.entityType, inputData);
		if (!deleteData.affectedRows) {
			throw Error("Unable to delete entity");
		}

		const { entityType } = this;
		const { entityId } = rawInputs;
		const deleteMetadata = this.metadataManager.deleteAll({
			entityType,
			entityId,
		});

		const deleteImage = this.imageManager.deleteAll({
			entityType,
			entityId,
		});

		const deleteRelated = this.relatedEntityIdManager.deleteAll({
			entityType,
			entityId,
		});

		await Promise.all([deleteMetadata, deleteImage, deleteRelated]);

		return { id: rawInputs.entityId };
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

	async loadRelatedEntityData(entity: Entity, inputData: ILoadableEntity) {
		if (inputData.loadDefaultImage) {
			entity.defaultImage = await this.imageManager.getDefault({
				entityId: entity.entityId,
			});
		}

		if (inputData.loadUserCanEdit) {
			entity.userCanEdit = await this.userManager.canEditEntity(
				this.entityType,
				entity.entityId,
			);
		}

		return entity;
	}

	async loadRelatedEntitiesData(
		entitiesObj: Entities,
		inputData: ILoadableEntity,
	) {
		const promises = entitiesObj.entities.map((entity: Entity) =>
			this.loadRelatedEntityData(entity, inputData),
		);

		await Promise.all(promises);
		return entitiesObj;
	}

	merge(a: Record<string, unknown>, b: Record<string, unknown>) {
		return { ...a, ...b };
	}
}
