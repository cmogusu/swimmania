import { SwimResultInputData } from "../SwmResultInputData";
import type { RawSetProcessedSwmResultInputs, RawSwimResult } from "../types";
import { Database } from "./Database";

export class UnprocessedSwimResultsManager {
	db: Database;

	constructor() {
		this.db = new Database();
	}

	async getUnprocessed(): Promise<RawSwimResult> {
		const swmResult = await this.db.getUnprocessed();
		return swmResult;
	}

	async setProcessed({ id }: RawSetProcessedSwmResultInputs) {
		const updateData = await this.db.setProcessed(id);

		// @ts-ignore
		if (!updateData?.affectedRows) {
			throw Error("Unable to update image");
		}

		return { id };
	}

	async insert(rawInputs: RawSwimResult) {
		const inputData = new SwimResultInputData(rawInputs);
		inputData.validateInsertInputs();

		const insertData = await this.db.insert(inputData);

		// @ts-ignore
		if (!insertData?.affectedRows) {
			throw Error("Unable to insert swim result");
		}

		// @ts-ignore
		return { id: insertData.insertId };
	}
}
