import type {
	EntitiesData,
	EntityData,
	IPaginated,
	UserId,
} from "@/server/types";
import { Entities } from "../../Entities";
import { Entity } from "../../Entity";
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
import {
	DeleteInputData,
	GetByIdInputData,
	GetByIdsInputData,
	GetByNameInputData,
	GetEntitiesInputData,
	InsertInputData,
	UpdateInputData,
} from "../InputData";
import { FindInputData } from "../InputData/FindInputData";
import type {
	ILoadableEntity,
	RawDeleteEntityInputs,
	RawEntity,
	RawFindEntityInputs,
	RawGetByIdEntityInputs,
	RawGetByIdsEntityInputs,
	RawGetByNameEntityInputs,
	RawGetEntitiesInputs,
	RawInsertEntityInputs,
	RawUpdateEntityInputs,
} from "../types";
import { Database } from "./Database";

export class GetPageManager {
	db: Database;

	imageManager: ImageManager;
	metadataManager: MetadataManager;
	userManager: UserManager;
	relatedEntityIdManager: RelatedEntityIdManager;

	constructor() {
		this.db = new Database();
		this.imageManager = imageManagerFactory.getInstance();
		this.metadataManager = metadataManagerFactory.getInstance();
		this.userManager = userManagerFactory.getInstance();
		this.relatedEntityIdManager = relatedEntityIdManagerFactory.getInstance();
	}

	async getEntities(rawInputs: RawGetEntitiesInputs): Promise<EntitiesData> {
		const inputData = new GetEntitiesInputData(rawInputs);
		inputData.validateData();

		const rawEntities = await this.db.getEntities(
			rawInputs.entityType,
			inputData,
		);

		return this.addPaginationData(rawEntities, inputData);
	}

	addPaginationData(
		rawEntities: EntityData[],
		paginationData: IPaginated,
	): EntitiesData {
		const nextPage = paginationData.pageNumber + 1;
		const pageSize = paginationData.pageSize - 1;
		const hasMore = rawEntities?.length > pageSize;
		return {
			entities: rawEntities.slice(0, pageSize),
			pageSize,
			hasMore,
			nextPage,
		};
	}

	async getByIds(rawInputs: RawGetByIdsEntityInputs): Promise<Entities> {
		const inputData = new GetByIdsInputData(rawInputs);
		inputData.validateData();

		const rawEntities: RawEntity[] = rawInputs.entityIds.length
			? await this.db.getByIds(rawInputs.entityType, inputData)
			: [];

		const entities = new Entities(rawEntities, inputData);
		return await this.loadRelatedEntitiesData(entities, inputData);
	}

	async getById(rawInputs: RawGetByIdEntityInputs): Promise<Entity> {
		const inputData = new GetByIdInputData(rawInputs);
		inputData.validateData();

		await this.userManager.assertCanViewEntity(
			rawInputs.entityType,
			inputData.userId,
			inputData.entityId,
		);

		const rawEntity = await this.db.getById(rawInputs.entityType, inputData);
		const entity = new Entity(rawEntity);
		return await this.loadRelatedEntityData(entity, inputData);
	}

	async getByName(rawInputs: RawGetByNameEntityInputs): Promise<Entity> {
		const inputData = new GetByNameInputData(rawInputs);
		inputData.validateData();

		const rawEntity = await this.db.getByName(rawInputs.entityType, inputData);
		const entity = new Entity(rawEntity);
		return await this.loadRelatedEntityData(entity, inputData);
	}

	async update(rawInputs: RawUpdateEntityInputs) {
		const inputData = new UpdateInputData(rawInputs);
		inputData.validateData();

		await this.userManager.assertCanEditEntity(
			rawInputs.entityType,
			inputData.userId,
			inputData.entityId,
		);

		const updateData = await this.db.update(rawInputs.entityType, inputData);
		if (!updateData?.affectedRows) {
			throw Error("Unable to update entity");
		}

		return { id: rawInputs.entityId };
	}

	async insert(rawInputs: RawInsertEntityInputs) {
		const inputData = new InsertInputData(rawInputs);
		inputData.validateData();

		await this.userManager.assertCanCreateEntity(
			rawInputs.entityType,
			inputData.userId,
		);

		const insertData = await this.db.insert(rawInputs.entityType, inputData);
		const { insertId } = insertData || {};
		if (!insertId) {
			throw Error("Unable to create entity");
		}

		await this.userManager.grantAccess(
			rawInputs.entityType,
			inputData.userId,
			insertId,
		);
		await this.metadataManager.insertEmpty({
			entityId: insertId,
			entityType: rawInputs.entityType,
		});

		return { id: insertId };
	}

	async deleteById(rawInputs: RawDeleteEntityInputs) {
		const inputData = new DeleteInputData(rawInputs);
		inputData.validateData();

		await this.userManager.assertCanDeleteEntity(
			rawInputs.entityType,
			inputData.userId,
			inputData.entityId,
		);

		const deleteData = await this.db.deleteById(
			rawInputs.entityType,
			inputData,
		);
		if (!deleteData.affectedRows) {
			throw Error("Unable to delete entity");
		}

		const { entityId, entityType } = rawInputs;
		const deleteMetadata = this.metadataManager.delete({
			entityType,
			entityId,
		});

		const deleteImage = this.imageManager.deleteAll({
			userId: inputData.userId,
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

	async find(rawInputs: RawFindEntityInputs) {
		const inputData = new FindInputData(rawInputs);
		inputData.validateData();

		const rawEntity = await this.db.find(rawInputs.entityType, inputData);
		return rawEntity ? new Entity(rawEntity) : undefined;
	}

	async loadRelatedEntityData(
		entity: Entity,
		inputData: ILoadableEntity & Partial<UserId>,
	) {
		if (inputData.loadDefaultImage) {
			entity.defaultImage = await this.imageManager.getDefault({
				entityId: entity.entityId,
			});
		}

		if (inputData.loadUserCanEdit && inputData.userId) {
			entity.userCanEdit = await this.userManager.canEditEntity(
				entity.entityType,
				inputData.userId,
				entity.entityId,
			);
		}

		return entity;
	}

	async loadRelatedEntitiesData(
		entitiesObj: Entities,
		inputData: ILoadableEntity & Partial<UserId>,
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
