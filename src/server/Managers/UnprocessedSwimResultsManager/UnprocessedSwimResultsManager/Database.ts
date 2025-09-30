import { BaseDatabase } from "../../services/BaseDatabase";
import type { InsertInputData, UpdateInputData } from "../InputData";
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
		const [rawSwimResults] = await this.query.getUnprocessed();
		const rawSwimResult = (rawSwimResults as unknown as RawSwimResult[])?.[0];
		if (!rawSwimResult) {
			throw Error("Swim result not found");
		}

		return rawSwimResult;
	}

	async setProcessed(swimResultData: UpdateInputData) {
		const { id } = swimResultData.getSanitized();
		const [updateData] = await this.query.setProcessed(id);
		return updateData;
	}

	async insert(swimResultData: InsertInputData) {
		const swimData = swimResultData.getSanitized();
		const [insertData] = await this.query.insert(
			swimData.eventNumber,
			swimData.gender,
			swimData.team,
			swimData.distance,
			swimData.distanceUnit,
			swimData.stroke,
			swimData.rank,
			swimData.firstName,
			swimData.surname,
			swimData.thirdName,
			swimData.age,
			swimData.ageGroup,
			swimData.time,
		);

		return insertData;
	}
}
