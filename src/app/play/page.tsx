import { access, constants } from "node:fs/promises";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { EVENT } from "@/server/constants";
import { PDF_FOLDER } from "@/server/constants/paths";
import { SwimResultsParser } from "@/server/Managers/ImportManager/Manager/SwimResultsParser";

export default async function Page() {
	return (
		<div className="p-6">
			<form action={doDatabaseWork}>
				<input type="submit" className="btn btn-sm" value="Database" />
			</form>
		</div>
	);
}

async function doDatabaseWork() {
	"use server";

	parserWork();
}

export const swimMeet = {
	name: "NCSA Inter-Clubs Swimming Championships",
	startDate: "2025-04-11",
	endDate: "2025-04-13",
	description:
		"Nairobi Swimming Club HY-TEK's MEET MANAGER 8.0 - 16:22 PM 4/13/2025 Page 1",
	location: "Nairobi",
};

export const text = `
Nairobi Swimming Club HY-TEK's MEET MANAGER 8.0 - 16:22 PM 4/13/2025 Page 1
NCSA Inter-Clubs Swimming Championships April 11-13 2025
Results
Event 101 Girls Open 1500 SC Meter Freestyle
County: 19:06.98 C 10/21/2022 Victoria A. Okumu BRSC-
Meet Record: 23:01.13 M 4/12/2024 Amani K Njau SHAQS
1 Swai, Zahra 13-11 Braeburn Swimming Club 23:40.40 21:47.55M
2 Kotut, Chichi 13-11 Braeburn Swimming Club 23:00.00 23:01.80
3 Mounif Praud, Berenice 11-13 Braeburn Swimming Club 24:00.00 23:13.43
4 Achieng, Weremba M 13-11 Little Fish Swim Club 27:23.19 26:16.66
5 Adega, Aurora 15-10 Little Fish Swim Club NT 26:32.14
6 Mumu, Nalia M 11-14 Little Fish Swim Club 29:01.47 26:55.63
7 Misaki, Laurie 14-11 Little Fish Swim Club NT 28:13.37
8 Wanjiku, Samantha 16-12 Pro Swim Academy Kenya NT 30:50.09
9 Mutie, Makenna M 12-12 Pro Swim Academy Kenya NT 32:08.72`;

export async function parserWork() {
	// const dbPath = path.join(PDF_FOLDER, "swimResult/mydb.git_skip.db");
	// await access(dbPath, constants.R_OK);

	const dbPath = path.join(PDF_FOLDER, "swimResult/test.db");
	const db = new DatabaseSync(dbPath);
	const parser = new SwimResultsParser(db);
	let x;
	let y;

	// parser.parse(text);
	// parser.on(EVENT.DATA_READY, (entityType) => {
	// 	console.log("data ready", entityType);

	// 	if (entityType === "swimMeet") {
	// 		const y = parser.getMeetData();
	// 		console.log("meet-data", y);
	// 	} else {
	// 		const y = parser.getEventData();
	// 		console.log("event-data", y);
	// 	}
	// });

	// const y = parser.tempSwimEventDb.addColumn();
	// const y = parser.tempSwimEventDb.setProcessingFailure(1);
	// const x = parser.tempSwimEventDb.getUnprocessed();
	// y = parser.tempSwimEventDb.reset();
	// y = parser.getMeetData();
	// y?.onComplete(false);

	x = parser.tempSwimEventDb.getAll();
	// const { data, onComplete } = x || {}

	console.log(y, x);
}
