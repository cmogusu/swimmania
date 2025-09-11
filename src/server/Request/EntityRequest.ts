import type { EntityManager } from "../managers/EntityManager";
import { BaseRequest } from "./BaseRequest";

export class EntityRequest extends BaseRequest {
	entityManager: EntityManager;

	constructor(entityManager: EntityManager) {
		super();
		this.entityManager = entityManager;
	}

	async getAll(req, res) {
		const { page: pageNumber, filters } = req.query;

		try {
			const entities = await this.entityManager.getAll({
				pageNumber,
				filters,
			});
			this.respondSuccess(res, entities);
		} catch (error: any) {
			const errorMessage = "Unable to get entities";
			this.log.error(errorMessage, error);
			this.respondFailure(res, errorMessage);
		}
	}

	async getById(req, res) {
		const { entityId } = req.params;

		try {
			const entity = await this.entityManager.getById(entityId);
			this.respondSuccess(res, entity);
		} catch (error: any) {
			const errorMessage = "Unable to get entity";
			this.log.error(errorMessage, error);
			this.respondFailure(res, errorMessage);
		}
	}

	async patch(req, res) {
		const { entityId } = req.params;
		const { entity } = req.body;

		try {
			const updateData = await this.entityManager.update({
				entityId,
				name: entity.name,
				description: entity.description,
				location: entity.location,
			});

			this.respondSuccess(res, updateData);
		} catch (error: any) {
			const errorMessage = "Unable to update entity";
			this.log.error(errorMessage, error);
			this.respondFailure(res, errorMessage);
		}
	}

	async post(req, res) {
		const { entity } = req.body;

		try {
			const insertData = await this.entityManager.insert(entity);
			this.respondSuccess(res, insertData);
		} catch (error) {
			const errorMessage = "Unable to create entity";
			this.log.error(errorMessage, error);
			this.respondFailure(res, errorMessage);
		}
	}

	deleteById = () => async (req, res) => {
		const { entityId } = req.params;

		try {
			const insertData = await this.entityManager.deleteById(entityId);
			this.respondSuccess(res, insertData);
		} catch (error) {
			const errorMessage = "Unable to delete entity";
			this.log.error(errorMessage, error);
			this.respondFailure(res, errorMessage);
		}
	};
}
