import { faker } from "@faker-js/faker";
import {
	type EntityManager,
	entityManagerFactory,
	type RawInsertEntityInputs,
} from "../Managers/EntityManager";
import { Log } from "../services";
import type { EntityType } from "../types";
import { isUndefined } from "../utils";
import { SeedImage } from "./SeedImage";
import { SeedMetadata } from "./SeedMetadata";

export class SeedEntity {
	log: Log;
	entityManager: EntityManager;
	seedMetadata: SeedMetadata;
	seedImage: SeedImage;

	constructor(entityType: EntityType) {
		this.log = new Log();
		this.entityManager = entityManagerFactory.getInstance(entityType);
		this.seedImage = new SeedImage();
		this.seedMetadata = new SeedMetadata(entityType);
	}

	async insertItems(itemCount: number) {
		this.log.appLogic(`Started inserting ${itemCount} items`);

		let i = 0;
		while (i < itemCount) {
			this.insertItem();
			i++;
		}
	}

	async insertItem() {
		const rawEntity = this.getSeedData();
		const { id: entityId } = await this.entityManager.insert(rawEntity);

		await Promise.all([
			this.seedImage.insertItem(entityId),
			this.seedMetadata.insertItem(entityId),
		]);
	}

	insertImage(entityId: number) {
		if (isUndefined(entityId)) {
			throw Error("Entity id not set");
		}

		return this.seedImage.insertItem(entityId);
	}

	insertMetadata(entityId: number) {
		if (isUndefined(entityId)) {
			throw Error("Entity id not set");
		}

		return this.seedMetadata.insertItem(entityId);
	}

	getSeedData(): RawInsertEntityInputs {
		return {
			name: faker.location.street(),
			description: faker.word.words({ count: { min: 10, max: 20 } }),
		};
	}
}
