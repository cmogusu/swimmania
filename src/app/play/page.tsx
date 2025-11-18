import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { ANONYMOUS_USER_ID } from "@/server/constants";
import { PDF_FOLDER } from "@/server/constants/paths";
import { fileManagerFactory } from "@/server/Managers/FileManager";
import { InsertEntity } from "@/server/Managers/ImportManager/InsertEntity";
import { RawSwimMeetDatabase } from "@/server/Managers/ImportManager/RawEntityDatabase";

export default async function Page() {
	return (
		<div className="p-6">
			<form action={doSth}>
				<input type="submit" className="btn btn-sm" value="do sth" />
			</form>

			<form action={uploadImg}>
				<input
					className="input input-sm"
					type="file"
					name="image"
					placeholder="upload pdf"
					accept="application/pdf"
				/>
				<input
					className="input input-sm"
					type="file"
					name="image"
					accept="image/*"
				/>
				<input type="submit" className="btn btn-sm" value="img" />
			</form>
		</div>
	);
}

export async function doSth() {
	"use server";

	const dbPath = path.join(PDF_FOLDER, "/swimResult/mydb.tempDb");
	const db = new DatabaseSync(dbPath);
	const rawDb = new RawSwimMeetDatabase(db);

	// const d = rawDb.getAllSettings();
	const e = rawDb.getWasDataEnded();
	console.log(e);
}

export async function uploadImg(formData: FormData) {
	"use server";

	const file = formData.get("image") as File;
	const fileManager = fileManagerFactory.getInstance();
	const { filePath, fileText } = await fileManager.readImageFile({ file });
	console.log(filePath, fileText);
}

export async function uploadPdf(file: File) {
	const fileManager = fileManagerFactory.getInstance();
	const { filePath, fileText } = await fileManager.readPdfFile({ file });
	console.log(filePath, fileText);
}

export const swimMeet = {
	name: "NCSA Inter-Clubs Swimming Championships",
	startDate: "2025-04-11",
	endDate: "2025-04-13",
	description:
		"Nairobi Swimming Club HY-TEK's MEET MANAGER 8.0 - 16:22 PM 4/13/2025 Page 1",
	location: "Nairobi",
};

export const swimEvent = {
	eventNumber: 101,
	stroke: "freestyle",
	distance: "1500",
	distanceUnit: "meter",
	gender: "female",
	ageGroup: "Open",
	rank: 1,
	surname: "Swayi",
	firstName: "Zahrah",
	age: 13,
	team: "Braeburn Swimming Club house",
	time: "23:40.40",
};

export async function parserWork() {
	const dbPath = path.join(PDF_FOLDER, "swimResult/test.db");
	const db = new DatabaseSync(dbPath);
	const insert = new InsertEntity(db);

	const meetId = 289;
	const eventId = 293;
	const resultId = 292;
	const swimmerId = 294;
	const userId = ANONYMOUS_USER_ID;
	const x = await insert.team(
		swimEvent,
		userId,
		meetId,
		eventId,
		resultId,
		swimmerId,
	);
	console.log(x);
}
