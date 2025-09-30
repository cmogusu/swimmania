import { BaseQuery } from "../../services";

export class Query extends BaseQuery {
	getUnprocessed() {
		return `SELECT * FROM \`unprocessed_swim_results\` where isProcessed = 0 limit 1;`;
	}

	setProcessed(id: number) {
		this.throwIfNotSet({ id });
		return this.exec(
			`UPDATE \`unprocessed_swim_results\` SET isProcessed=1 WHERE id=?;`,
			[id],
		);
	}

	insert(
		eventNumber: number,
		gender: string,
		team: string,
		distance: string,
		distanceUnit: string,
		stroke: string,
		rank: number,
		firstName: string,
		surname: string,
		thirdName: string | undefined,
		age: number | undefined,
		ageGroup: string,
		time: string,
	) {
		this.throwIfNotSet({
			rank,
			firstName,
			surname,
			ageGroup,
			time,
		});

		return this.exec(
			`INSERT INTO \`unprocessed_swim_results\` (eventNumber, gender, team, distance, distanceUnit, stroke, rank, firstName, surname, time, age, thirdName) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);`,
			[
				eventNumber,
				gender,
				team,
				distance,
				distanceUnit,
				stroke,
				rank,
				firstName,
				surname,
				time,
				age || null,
				thirdName || null,
			],
		);
	}
}
