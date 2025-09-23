import type { ImageManager } from "../ImageManager";
import type { MetadataManager } from "../MetadataManager";
import { Entity } from "./SwmEvent";
import type { EntityInputData } from "./SwmEventInputData/InputData";
import type { RawEntity } from "./types";

export class SwmEvents {
	entities: Entity[];
	entityInputData: EntityInputData;
	imageManager: ImageManager;
	metadataManager: MetadataManager;

	constructor(
		rawEntities: RawEntity[] | undefined,
		entityInputData: EntityInputData,
		imageManager: ImageManager,
		metadataManager: MetadataManager,
	) {
		this.entityInputData = entityInputData;
		this.imageManager = imageManager;
		this.metadataManager = metadataManager;
		this.entities = (rawEntities || []).map((e) => new Entity(e));
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
		const { pageSize, pageNumber } = this.entityInputData;
		const hasMore = this.entities.length > pageSize;
		const entities = this.entities.slice(0, pageSize).map((e) => e.toJSON());

		return {
			hasMore,
			entities,
			nextPage: pageNumber + 1,
		};
	}
}
