import {
	MetadataManager,
	type MetadataRawInputs,
} from "../managers/MetadataManager";
import { BaseRequest } from "./BaseRequest";

export class Request extends BaseRequest {
	metadataManager: MetadataManager;

	constructor() {
		super();
		this.metadataManager = new MetadataManager();
	}

	async getAll(req, res) {
		const { entityId } = req.params;
		const rawData: MetadataRawInputs = { entityId };

		try {
			const metadatas = await this.metadataManager.getAll(rawData);
			this.respondSuccess(res, metadatas);
		} catch (error: any) {
			this.handleError(res, error, "Unable to get entity metadatas");
		}
	}

	async getById(req, res) {
		const { entityId, metadataId } = req.params;
		const rawData: MetadataRawInputs = { entityId, id: metadataId };

		try {
			const metadata = await this.metadataManager.getByMetadataId(rawData);
			this.respondSuccess(res, metadata);
		} catch (error: any) {
			this.handleError(res, error, "Unable to get metadata");
		}
	}

	async patch(req, res) {
		const { entityId } = req.params;
		const { id, name, value } = req.body;
		const metadata: MetadataRawInputs = {
			id,
			entityId,
			name,
			value,
		};

		try {
			const updateData = await this.metadataManager.update(metadata);
			this.respondSuccess(res, updateData);
		} catch (error: any) {
			this.handleError(res, error, "Unable to update metadata");
		}
	}

	async post(req, res) {
		const { entityId } = req.params;
		const { name, value } = req.body;
		const metadata: MetadataRawInputs = {
			entityId,
			name,
			value,
		};

		try {
			const insertData = await this.metadataManager.insert(metadata);
			this.respondSuccess(res, insertData);
		} catch (error) {
			this.handleError(res, error, "Unable to create metadata");
		}
	}

	async deleteById(req, res) {
		const { entityId } = req.params;

		try {
			const insertData = await this.metadataManager.deleteById(entityId);
			this.respondSuccess(res, insertData);
		} catch (error) {
			this.handleError(res, error, "Unable to delete entity");
		}
	}
}
