import type { IPaginated } from "@/server/types";
import type { ImageManager } from "../ImageManager";
import type { MetadataManager } from "../MetadataManager";
import { Entity } from "./Entity";
import type { ILoadableEntity, RawEntity } from "./types";

export class Entities {
	entities: Entity[];
	entityInputData: ILoadableEntity & IPaginated;
	imageManager: ImageManager;
	metadataManager: MetadataManager;

	constructor(
		rawEntities: RawEntity[] | undefined,
		entityInputData: ILoadableEntity & IPaginated,
		imageManager: ImageManager,
		metadataManager: MetadataManager,
	) {
		this.entityInputData = entityInputData;
		this.imageManager = imageManager;
		this.metadataManager = metadataManager;
		this.entities = (rawEntities || []).map((e) => new Entity(e));
	}

	async loadRelatedData() {
		const promises = this.entities.map((entity: Entity) =>
			entity.loadRelatedData(
				this.entityInputData,
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
