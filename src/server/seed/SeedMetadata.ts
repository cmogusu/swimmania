import type { EntityType, RawMetadata } from "@/server/types";
import { type MetadataManager, metadataManagerFactory } from "../Managers";
import { entityMetadataFactory } from "../Managers/MetadataManager";

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
