import { MetadataManager } from "./MetadataManager";

export const metadataManagerFactory = {
	_manager: undefined as MetadataManager | undefined,

	getInstance() {
		if (!this._manager) {
			this._manager = new MetadataManager();
		}

		return this._manager;
	},
};
