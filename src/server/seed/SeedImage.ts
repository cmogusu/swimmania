import { faker } from "@faker-js/faker";
import { type ImageManager, imageManagerFactory } from "../Managers";
import type { EntityType } from "../types";

export class SeedImage {
	imageManager: ImageManager;

	constructor() {
		this.imageManager = imageManagerFactory.getInstance();
	}

	async insertItem(entityType: EntityType, userId: string, entityId: number) {
		const { alt, filepath } = this.getSeedData();
		const { id: imageId } = await this.imageManager.insert({
			entityType,
			userId,
			entityId,
			alt,
			filepath,
		});

		await this.imageManager.setDefault({
			entityType,
			userId,
			entityId,
			id: imageId,
			isDefault: true,
		});
	}

	getSeedData() {
		const imageIndex = Math.floor(Math.random() * 7) + 1;

		return {
			alt: faker.word.words({ count: { min: 3, max: 8 } }),
			filepath: `/images/pool-${imageIndex}.jpg`,
		};
	}
}
