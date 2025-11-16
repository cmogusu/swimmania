import { faker } from "@faker-js/faker";
import {
	type EntityManager,
	entityManagerFactory,
	type RawInsertEntityInputs,
} from "../Managers/EntityManager";
import { UserManager } from "../Managers/UserManager";
import { Log } from "../services";
import type { EntityType } from "../types";
import { isUndefined } from "../utils";
import { SeedImage } from "./SeedImage";
import { SeedMetadata } from "./SeedMetadata";

export class SeedEntity {
	log: Log;
	entityType: EntityType;
	entityManager: EntityManager;
	seedMetadata: SeedMetadata;
	seedImage: SeedImage;

	constructor(entityType: EntityType) {
		this.log = new Log();
		this.entityType = entityType;
		this.entityManager = entityManagerFactory.getInstance();
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
		const userId = await UserManager.getLoggedInUserIdOrThrow();
		const rawEntity = await this.getSeedData();
		const { id: entityId } = await this.entityManager.insert(rawEntity);

		await Promise.all([
			this.seedImage.insertItem(this.entityType, userId, entityId),
			this.seedMetadata.insertItem(entityId),
		]);
	}

	async insertImage(entityId: number) {
		const userId = await UserManager.getLoggedInUserIdOrThrow();
		if (isUndefined(entityId)) {
			throw Error("Entity id not set");
		}

		return this.seedImage.insertItem(this.entityType, userId, entityId);
	}

	insertMetadata(entityId: number) {
		if (isUndefined(entityId)) {
			throw Error("Entity id not set");
		}

		return this.seedMetadata.insertItem(entityId);
	}

	async getSeedData(): Promise<RawInsertEntityInputs> {
		const userId = await UserManager.getLoggedInUserIdOrThrow();
		return {
			entityType: this.entityType,
			name: faker.location.street(),
			description: faker.word.words({ count: { min: 10, max: 20 } }),
			userId,
		};
	}
}
