import { InsertInputData, UpdateInputData } from "../InputData";
import type { RawSwimResult, RawUpdateSwmResultInputs } from "../types";
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

	async setProcessed(rawInputs: RawUpdateSwmResultInputs) {
		const inputData = new UpdateInputData(rawInputs);
		inputData.validateData();
		const updateData = await this.db.setProcessed(inputData);

		// @ts-ignore
		if (!updateData?.affectedRows) {
			throw Error("Unable to update image");
		}

		return { id: inputData.id };
	}

	async insert(rawInputs: RawSwimResult) {
		const inputData = new InsertInputData(rawInputs);
		inputData.validateData();
		const insertData = await this.db.insert(inputData);

		// @ts-ignore
		if (!insertData?.affectedRows) {
			throw Error("Unable to insert swim result");
		}

		// @ts-ignore
		return { id: insertData.insertId };
	}
}
