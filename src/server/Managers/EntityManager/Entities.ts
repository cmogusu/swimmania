import type { IPaginated, RelationshipType } from "@/server/types";
import { Entity } from "./Entity";
import type { RawEntity } from "./types";

export class Entities {
	entities: Entity[] = [];
	hasMore: boolean = false;
	pageSize: number = 0;
	nextPage: number = 1;

	isRelatedEntities: boolean = false;
	relationshipType?: RelationshipType;

	constructor(
		rawEntities: RawEntity[] | undefined,
		paginationData: IPaginated,
	) {
		const { pageSize, pageNumber } = paginationData;
		this.nextPage = pageNumber + 1;
		this.pageSize = pageNumber;

		if (rawEntities?.length) {
			this.hasMore = rawEntities.length > pageSize;
			this.entities = rawEntities.map((e) => new Entity(e));
		}
	}

	setRelationshipType(relationshipType: RelationshipType) {
		this.isRelatedEntities = true;
		this.relationshipType = relationshipType;
	}
}
