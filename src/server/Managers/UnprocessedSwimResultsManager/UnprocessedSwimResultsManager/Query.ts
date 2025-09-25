import { BaseQuery } from "../../services";

export class Query extends BaseQuery {
	table = "unprocessed-swim-results";

	getUnprocessed() {
		return `SELECT * FROM \`${this.table}\` where isProcessed = 0;`;
	}

	setProcessed(id: number) {
		this.throwIfNotSet({
			id,
		});

		const updateValuesStr = this.formatUpdateValues({ isProcessed: 1 });
		return `UPDATE \`${this.table}\` SET ${updateValuesStr} WHERE id='${id}';`;
	}

	insert(
		rank: number,
		firstName: string,
		surname: string,
		thirdName: string | undefined,
		age: number | undefined,
		ageGroup: string,
		time: number,
	) {
		const insertValues: Record<string, unknown> = {
			rank,
			firstName,
			surname,
			ageGroup,
			time,
		};

		this.throwIfNotSet(insertValues);

		if (thirdName) insertValues.thirdName = thirdName;
		if (age) insertValues.age = age;

		const { keys, values } = this.formatInsertValues(insertValues);
		return `INSERT INTO \`${this.table}\` (${keys}) VALUES (${values});`;
	}
}
