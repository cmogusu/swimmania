import { UnprocessedSwimResultsManager } from "./UnprocessedSwimResultsManager";

export const unprocessedSwimResultsManagerFactory = {
	_manager: undefined as UnprocessedSwimResultsManager | undefined,

	getInstance() {
		if (!this._manager) {
			this._manager = new UnprocessedSwimResultsManager();
		}

		return this._manager;
	},
};
