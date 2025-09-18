import { faker } from "@faker-js/faker";
import { type ImageManager, imageManagerFactory } from "../Managers";
import type { ImagePostRawInputs } from "../Managers/ImageManager";

export class SeedImage {
	imageManager: ImageManager;

	constructor() {
		this.imageManager = imageManagerFactory.getInstance();
	}

	async insertItem(entityId: number) {
		const rawImageData = this.getSeedData(entityId);
		await this.imageManager.insert(rawImageData);
	}

	getSeedData(entityId: number): ImagePostRawInputs {
		const imageIndex = Math.floor(Math.random() * 7) + 1;

		return {
			entityId,
			alt: faker.word.words({ count: { min: 3, max: 8 } }),
			filepath: `/images/pool-${imageIndex}.jpg`,
			isDefault: true,
		};
	}
}
