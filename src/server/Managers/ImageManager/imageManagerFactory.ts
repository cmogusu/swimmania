import { ImageManager } from "./ImageManager/ImageManager";

export const imageManagerFactory = {
	_imageManager: undefined as ImageManager | undefined,

	getInstance() {
		if (!this._imageManager) {
			this._imageManager = new ImageManager();
		}

		return this._imageManager;
	},
};
