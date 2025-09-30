import type { EntityType, IPaginated } from "../../../types";
import { ImageManager } from "../../ImageManager";
import { MetadataManager } from "../../MetadataManager";
import {
	RelatedEntityManager,
	type RelationshipType,
} from "../../RelatedEntityManager";
import { Entities } from "../Entities";
import { Entity } from "../Entity";
import { entityManagerFactory } from "../entityManagerFactory";
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
	RawRelatedEntity,
	RawUpdateEntityInputs,
} from "../types";
import { Database } from "./Database";
import { LruCache } from "./LruCache";

type EntityId = {
	id: number;
};

export class EntityManager {
	entityType: EntityType;
	db: Database;
	cache: LruCache<EntityId>;

	relationships: Record<string, EntityType[]> = {};

	imageManager: ImageManager;
	metadataManager: MetadataManager;
	relatedEntityManager: RelatedEntityManager;

	constructor(entityType: EntityType) {
		this.entityType = entityType;
		this.db = new Database();
		this.cache = new LruCache<EntityId>();

		this.imageManager = new ImageManager();
		this.metadataManager = new MetadataManager();
		this.relatedEntityManager = new RelatedEntityManager();
	}

	async getAll(rawInputs: RawGetAllEntityInputs): Promise<Entities> {
		if (rawInputs.filters) {
			return this.filterBy(rawInputs as RawFilterByEntityInputs);
		}

		const inputData = new GetAllInputData(rawInputs);
		inputData.validateData();

		const rawEntities = await this.db.getAll(this.entityType, inputData);
		const entities = await this.getEntities(rawEntities, inputData);
		return entities;
	}

	async getByIds(rawInputs: RawGetByIdsEntityInputs): Promise<Entities> {
		const inputData = new GetByIdsInputData(rawInputs);
		inputData.validateData();

		const rawEntities = await this.db.getByIds(this.entityType, inputData);
		const entities = await this.getEntities(rawEntities, inputData);
		return entities;
	}

	async getById(rawInputs: RawGetByIdEntityInputs): Promise<Entity> {
		const inputData = new GetByIdInputData(rawInputs);
		inputData.validateData();

		const rawEntity = await this.db.getById(this.entityType, inputData);
		const entity = new Entity(rawEntity);
		entity.loadRelatedData(inputData, this.imageManager, this.metadataManager);

		return entity;
	}

	async getByName(rawInputs: RawGetByNameEntityInputs): Promise<Entity> {
		const inputData = new GetByNameInputData(rawInputs);
		inputData.validateData();

		const rawEntity = await this.db.getByName(this.entityType, inputData);
		const entity = new Entity(rawEntity);
		entity.loadRelatedData(inputData, this.imageManager, this.metadataManager);

		return entity;
	}

	async update(rawInputs: RawUpdateEntityInputs) {
		const inputData = new UpdateInputData(rawInputs);
		inputData.validateData();
		const updateData = await this.db.update(this.entityType, inputData);

		// @ts-ignore
		if (!updateData?.affectedRows) {
			throw Error("Unable to update entity");
		}

		return { id: rawInputs.entityId };
	}

	async insert(rawInputs: RawInsertEntityInputs) {
		const { metadata, related } = rawInputs;
		const insertData = await this.insertEntity(rawInputs);

		if (metadata) {
			await this.metadataManager.insertBulk(
				this.entityType,
				insertData.id,
				metadata,
			);
		}

		if (related) {
			await Promise.all(
				related.map((r) => this.insertRelated(insertData.id, r)),
			);
		}

		return insertData;
	}

	async insertEntity(rawInputs: RawInsertEntityInputs) {
		const inputData = new InsertInputData(rawInputs);
		inputData.validateData();
		const insertData = await this.db.insert(this.entityType, inputData);

		// @ts-ignore
		if (!insertData?.affectedRows) {
			throw Error("Unable to create entity");
		}

		// @ts-ignore
		return { id: insertData.insertId };
	}

	async insertRelated(entityId: number, related: RawRelatedEntity) {
		const { type: relatedEntityType, name, relationshipType } = related;
		const relationship = this.relationships[relationshipType];
		if (!relationship?.includes(relatedEntityType)) {
			throw Error("Invalid relationship");
		}

		const relatedEntityManager =
			entityManagerFactory.getInstance(relatedEntityType);

		let relatedEntity: { id: number } | undefined;
		if (relatedEntityManager.cache.has(name)) {
			relatedEntity = relatedEntityManager.cache.get(name);
		}

		if (!relatedEntity) {
			relatedEntity = await relatedEntityManager.findExisting(related);
		}

		if (!relatedEntity) {
			relatedEntity = await relatedEntityManager.insert(related);
		}

		relatedEntityManager.cache.set(name, relatedEntity);
		await this.relatedEntityManager.insert({
			entityId,
			entityType: this.entityType,
			relatedEntityId: relatedEntity.id,
			relatedEntityType,
			relationshipType,
		});
	}

	async deleteById(rawInputs: RawDeleteEntityInputs) {
		const inputData = new DeleteInputData(rawInputs);
		inputData.validateData();
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

	async getEntities(
		rawEntities: RawEntity[],
		inputData: ILoadableEntity & IPaginated,
	) {
		const entities = new Entities(
			rawEntities,
			inputData,
			this.imageManager,
			this.metadataManager,
		);

		await entities.loadRelatedData();
		return entities;
	}

	merge(a: Record<string, unknown>, b: Record<string, unknown>) {
		return { ...a, ...b };
	}

	async getAllRelated(entityId: number) {
		const related: Record<string, Record<string, Entities>> = {};

		for (const relationshipType in this.relationships) {
			related[relationshipType] = await this.getRelatedByRelationshipType(
				entityId,
				relationshipType as RelationshipType,
			);
		}

		return related;
	}

	async getRelatedByRelationshipType(
		entityId: number,
		relationshipType: RelationshipType,
	): Promise<Record<string, Entities>> {
		const relatedEntityTypes = this.relationships[relationshipType];
		if (!relatedEntityTypes) {
			throw Error("Entity not related");
		}

		const relatedEntities: Record<string, Entities> = {};
		for (const relatedEntityType of relatedEntityTypes) {
			relatedEntities[relatedEntityType] =
				await this.relatedEntityManager.getRelated({
					entityId,
					entityType: this.entityType,
					relatedEntityType,
				});
		}

		return relatedEntities;
	}
}
