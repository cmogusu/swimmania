import {
	importManagerFactory,
	SwimResultImportManager,
} from "@/server/Managers";

export default async function Page() {
	return (
		<div className="p-6">
			<form action={doDatabaseWork}>
				<input type="submit" className="btn btn-sm" value="Database" />
			</form>
			<form action={upload}>
				<input type="hidden" name="go" value="go" />
				<input type="submit" className="btn btn-sm" value="upload" />
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

export async function parserWork() {
	const importer = new SwimResultImportManager();
	const entityType = "pool";
	const x = importer.tempDb.getByName(entityType, "cow");
	const y = importer.tempDb.getById(entityType, 4);
	const z = importer.tempDb.getAllEntityIds(entityType);
	console.log(x, y, z);
}

async function upload() {
	"use server";
	const importManager = importManagerFactory.getInstance("swimResult");
	importManager.importJson({ fileName: "swimResults.git_skip.json" });
}
