import type { IPaginated } from "@/server/types";
import type { ImageManager } from "../ImageManager";
import type { MetadataManager } from "../MetadataManager";
import type { RelationshipType } from "../RelatedEntityIdManager";
import { Entity } from "./Entity";
import type { ILoadableEntity, RawEntity } from "./types";

export class Entities {
	entities: Entity[];
	loadRelatedDataAndPaginationOptions: ILoadableEntity & IPaginated;
	imageManager: ImageManager;
	metadataManager: MetadataManager;

	isRelatedEntities: boolean = false;
	relationshipType?: RelationshipType;

	constructor(
		rawEntities: RawEntity[] | undefined,
		loadRelatedDataAndPaginationOptions: ILoadableEntity & IPaginated,
		imageManager: ImageManager,
		metadataManager: MetadataManager,
	) {
		this.loadRelatedDataAndPaginationOptions =
			loadRelatedDataAndPaginationOptions;
		this.imageManager = imageManager;
		this.metadataManager = metadataManager;
		this.entities = (rawEntities || []).map((e) => new Entity(e));
	}

	async loadRelatedData() {
		const promises = this.entities.map((entity: Entity) =>
			entity.loadRelatedData(
				this.loadRelatedDataAndPaginationOptions,
				this.imageManager,
				this.metadataManager,
			),
		);

		await Promise.all(promises);
	}

	setRelationshipType(relationshipType: RelationshipType) {
		this.isRelatedEntities = true;
		this.relationshipType = relationshipType;
	}

	toJSON() {
		const { pageSize, pageNumber } = this.loadRelatedDataAndPaginationOptions;
		const hasMore = this.entities.length > pageSize;
		const entities = this.entities.slice(0, pageSize).map((e) => e.toJSON());

		return {
			hasMore,
			entities,
			nextPage: pageNumber + 1,
			...(this.isRelatedEntities
				? { relationshipType: this.relationshipType }
				: {}),
		};
	}
}
