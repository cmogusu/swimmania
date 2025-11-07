import { FileManager } from "./Manager";

export const fileManagerFactory = {
	manager: undefined as FileManager | undefined,

	getInstance() {
		if (!this.manager) {
			this.manager = new FileManager();
		}

		return this.manager;
	},
};
