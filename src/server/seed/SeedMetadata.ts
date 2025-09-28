import { type MetadataManager, metadataManagerFactory } from "../Managers";
import {
	entityMetadataFactory,
	type RawMetadata,
} from "../Managers/MetadataManager";
import type { EntityType } from "../types";

export class SeedMetadata {
	entityType: EntityType;
	metadataManager: MetadataManager;

	constructor(entityType: EntityType) {
		this.entityType = entityType;
		this.metadataManager = metadataManagerFactory.getInstance();
	}

	async insertItem(entityId: number) {
		const rawMetadataArr = this.getSeedData();
		await this.metadataManager.insertBulk(
			this.entityType,
			entityId,
			rawMetadataArr,
		);
	}

	getSeedData(): RawMetadata[] {
		const metadata = entityMetadataFactory.getInstance(
			this.entityType,
			undefined,
			true,
		);

		metadata.setSeedData();
		return metadata.dbValue;
	}
}
