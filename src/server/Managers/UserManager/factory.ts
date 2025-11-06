import { UserManager } from "./Manager";

export const userManagerFactory = {
	_manager: undefined as UserManager | undefined,

	getInstance() {
		if (!this._manager) {
			this._manager = new UserManager();
		}

		return this._manager;
	},
};
