import { BaseDatabase } from "../../services/BaseDatabase";
import type { SwimResultInputData } from "../SwmResultInputData";
import type { RawSwimResult } from "../types";
import { Query } from "./Query";

export class Database extends BaseDatabase {
	metadataDelimiter: string = ";";
	metadataNameValueDelimiter: string = ":";

	query: Query;

	constructor() {
		super();
		this.query = new Query();
	}

	async getUnprocessed(): Promise<RawSwimResult> {
		const query = this.query.getUnprocessed();
		const rawSwimResults = await this.execSql<RawSwimResult>(query);
		if (!rawSwimResults?.[0]) {
			throw Error("Swim result not found");
		}

		return rawSwimResults?.[0] as RawSwimResult;
	}

	async setProcessed(id: number) {
		const query = this.query.setProcessed(id);
		return this.execSql(query);
	}

	async insert(swimResultData: SwimResultInputData) {
		const cleanSwmResult = swimResultData.getSanitizedInsertData();
		const query = this.query.insert(
			cleanSwmResult.rank,
			cleanSwmResult.firstName,
			cleanSwmResult.surname,
			cleanSwmResult.thirdName,
			cleanSwmResult.age,
			cleanSwmResult.ageGroup,
			cleanSwmResult.time,
		);

		return this.execSql(query);
	}
}
