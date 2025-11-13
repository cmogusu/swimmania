import { importManagerFactory } from "@/server/Managers";
import { SwimEventParser } from "@/server/Managers/ImportManager/FileParsers";

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

export async function parserWork() {
	const swimEventParser = new SwimEventParser();
	swimEventParser.fetch(rawText);
	swimEventParser.on("data", (data) => {
		console.log("***, meet", data);
	});

	const swimMeetParser = new SwimMeetParser();
	swimMeetParser.fetch(meetText);
	swimMeetParser.on("data", (data) => {
		console.log("***, meet", data);
	});
}

async function upload() {
	"use server";
	const importManager = importManagerFactory.getInstance("swimResult");
	importManager.importJson({ fileName: "swimResults.git_skip.json" });
}
