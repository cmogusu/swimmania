import type { EntitiesData, IPaginated } from "@/server/types";
import { Entity } from "./Entity";
import type { RawEntity } from "./EntityManager/types";

export class Entities {
	entities: Entity[] = [];
	hasMore: boolean = false;
	pageSize: number = 0;
	nextPage: number = 1;

	constructor(
		rawEntities: RawEntity[] | undefined,
		paginationData: IPaginated,
	) {
		this.nextPage = paginationData.pageNumber + 1;
		this.pageSize = paginationData.pageSize - 1;

		if (rawEntities?.length) {
			this.hasMore = rawEntities.length > this.pageSize;
			this.entities = rawEntities
				.slice(0, this.pageSize)
				.map((e) => new Entity(e));
		}
	}

	toJSON(): EntitiesData {
		return {
			entities: this.entities.map((e) => e.toJSON()),
			hasMore: this.hasMore,
			pageSize: this.pageSize,
			nextPage: this.nextPage,
		};
	}
}
