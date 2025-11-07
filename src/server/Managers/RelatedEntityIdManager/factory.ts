import { RelatedEntityIdManager } from "./Manager";

export const relatedEntityIdManagerFactory = {
	_manager: undefined as RelatedEntityIdManager | undefined,

	getInstance() {
		if (!this._manager) {
			this._manager = new RelatedEntityIdManager();
		}

		return this._manager;
	},
};
