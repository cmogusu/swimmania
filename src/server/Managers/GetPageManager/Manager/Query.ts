import type { EntityType } from "@/server/types";
import { BaseQuery } from "../../services";

export class Query extends BaseQuery {
	getEntities(entityType: EntityType, limit: number, offset: number) {
		this.throwIfNotSet({
			entityType,
			limit,
			offset,
		});

		return this.exec(`CALL get_entities(?, ?, ?);`, [
			entityType,
			limit,
			offset,
		]);
	}

	getMeetResults(meetId: number) {
		this.throwIfNotSet({
			meetId,
		});

		return this.exec(`CALL get_meet_results(?, ?, ?);`, [meetId]);
	}
}
