import { MetadataManager } from "./MetadataManager/MetadataManager";

export const metadataManagerFactory = {
	_metadataManager: undefined as MetadataManager | undefined,

	getInstance() {
		if (!this._metadataManager) {
			this._metadataManager = new MetadataManager();
		}

		return this._metadataManager;
	},
};
