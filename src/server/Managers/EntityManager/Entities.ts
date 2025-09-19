import type { ImageManager } from "../ImageManager";
import type { MetadataManager } from "../MetadataManager";
import { Entity } from "./Entity";
import type { EntityInputData } from "./EntityInputData/EntityInputData";
import type { RawEntity } from "./types";

export class Entities {
	entities: Entity[];
	entityInputData: EntityInputData;
	imageManager: ImageManager;
	metadataManager: MetadataManager;

	constructor(
		rawEntities: RawEntity[],
		entityInputData: EntityInputData,
		imageManager: ImageManager,
		metadataManager: MetadataManager,
	) {
		this.entityInputData = entityInputData;
		this.imageManager = imageManager;
		this.metadataManager = metadataManager;
		this.entities = rawEntities.map((e) => new Entity(e));
	}

	async loadRelatedData() {
		const loadRelatedDataOptions =
			this.entityInputData.getLoadRelatedDataOptions();
		if (!loadRelatedDataOptions) {
			return;
		}

		const promises = this.entities.map((entity: Entity) =>
			entity.loadRelatedData(
				loadRelatedDataOptions,
				this.imageManager,
				this.metadataManager,
			),
		);

		await Promise.all(promises);
	}

	toJSON() {
		const currentPage = this.entityInputData.pageNumber;
		return {
			currentPage,
			nextPage: currentPage + 1,
			entities: this.entities,
			hasMore: true,
		};
	}
}
