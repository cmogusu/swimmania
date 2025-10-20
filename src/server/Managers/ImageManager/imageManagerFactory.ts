import { ImageManager } from "./ImageManager";

export const imageManagerFactory = {
	manager: undefined as ImageManager | undefined,

	getInstance() {
		if (!this.manager) {
			this.manager = new ImageManager();
		}

		return this.manager;
	},
};
