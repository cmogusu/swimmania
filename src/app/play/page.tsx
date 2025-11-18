import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { ANONYMOUS_USER_ID } from "@/server/constants";
import { PDF_FOLDER } from "@/server/constants/paths";
import { SwimResultImportManager } from "@/server/Managers";
import { fileManagerFactory } from "@/server/Managers/FileManager";
import { InsertEntity } from "@/server/Managers/ImportManager/InsertEntity";

export default async function Page() {
	return (
		<div className="p-6">
			<form action={doSth}>
				<input type="submit" className="btn btn-sm" value="do sth" />
			</form>

			<form action={uploadImg}>
				{/* <input
					className="input input-sm"
					type="file"
					name="pdf"
					placeholder="upload pdf"
					accept="application/pdf"
				/> */}
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

export async function doSth(_formData: FormData) {
	"use server";

	// const file = formData.get("image") as File;
	const userId = "cmhkpa90f0000sydtu86fbldo";
	const filePath =
		"/Users/clive/www/swimmania/public/images/d2372f07df0c64343dd46fc04888dc823af6f9175ad0ebfcc94050fb152aa97b.png";

	// const dbPath = path.join(PDF_FOLDER, "/swimResult/mydb.tempDb");

	new SwimResultImportManager(userId, filePath, fileText);
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

const fileText = `
/Users/clive/www/swimmania/public/images/d2372f07df0c64343dd46fc04888dc823af6f9175ad0ebfcc94050fb152aa97b.png Nairobi Swimming Club HY-TEK's MEET MANAGER 8.0 - 16:22 PM 4/13/2025 Page 1
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
9 Mutie, Makenna M 12-12 Pro Swim Academy Kenya NT 32:08.72
Event 102 Boys Open 1500 SC Meter Freestyle
County: 17:50.89 C 3/15/2019 Alvin Omondi
Meet Record: 20:52.86 M 4/12/2024 Joseph Okal ZEFIS-ZZ
Name Age Team Seed Time Finals Time
1 Kenyi, Max 16-08 Braeburn Swimming Club 19:51.90 19:48.59M
2 Ogola, Andrew 13-11 Little Fish Swim Club 21:44.51 20:37.68
3  Okumu, Lawrence 13-12 Braeburn Swimming Club NT 21:22.91
4 Azzalini, Enrico M 19-06 Braeburn Swimming Club 23:00.00 23:51.76
5 Omolo, Alister O 17-08 Swimming Dev Program of Kenya NT 24:59.46
6 Mutie, Ty Taaveti 10-14 Pro Swim Academy Kenya NT 25:30.67
7 Shakombo, Jabari H 10-15 Little Fish Swim Club NT 26:24.24
8 Anduvate, Gideon 10-14 Little Fish Swim Club NT 28:41.35
Event 103 Women 35 & Over 50 SC Meter Backstroke MASTERS
1 Makau, AnitaK 42-82 NextGen Multi Sport Academy 54.45 57.84
2 Kiomburi, Mercy 43-81 NextGen Multi Sport Academy NT 1:05.53
Event 104 Men 25-29 50 SC Meter Backstroke MASTERS
County: 33.96 C 8/25/2023 Nick Joseph Odhiambo PSAK
1 Odhiambo, Nick Joseph 27-98 Pro Swim Academy Kenya 33.96 36.54`;
