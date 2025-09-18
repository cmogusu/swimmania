import { faker } from "@faker-js/faker";
import {
	type EntityManager,
	EntityManagerFactory,
	type EntityPostRawInputs,
} from "../Managers/EntityManager";
import { Log } from "../services";
import type { EntityType } from "../types";
import { SeedImage } from "./SeedImage";
import { SeedMetadata } from "./SeedMetadata";

export class SeedEntity {
	log: Log;
	entityManager: EntityManager;
	seedMetadata: SeedMetadata;
	seedImage: SeedImage;

	constructor(entityType: EntityType) {
		this.log = new Log();
		this.entityManager = EntityManagerFactory.getInstance(entityType);
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

	getSeedData(): EntityPostRawInputs {
		return {
			name: faker.location.street(),
			description: faker.word.words({ count: { min: 10, max: 20 } }),
			location: `${faker.location.county()} ${faker.location.country()}`,
		};
	}
}
