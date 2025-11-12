import fs from "node:fs";
import { access, constants } from "node:fs/promises";
import path from "node:path";
import { chain } from "stream-chain";
import { parser } from "stream-json";
import { streamValues } from "stream-json/streamers/StreamValues";
import { PDF_FOLDER } from "@/server/constants/paths";
import { importManagerFactory } from "@/server/Managers";
import { DeepSeekParser } from "@/server/Managers/ImportManager/FileParsers";

// const {pick}   = require('stream-json/filters/Pick');
// const {ignore} = require('stream-json/filters/Ignore');
// const {streamValues} = require('stream-json/streamers/StreamValues');

// const fs   = require('fs');
// const zlib = require('zlib');

// const pipeline = chain([
//   fs.createReadStream('sample.json.gz'),
//   zlib.createGunzip(),
//   parser(),
//   pick({filter: 'data'}),
//   ignore({filter: /\b_meta\b/i}),
//   streamValues(),
//   data => {
//     const value = data.value;
//     // keep data only for the accounting department
//     return value && value.department === 'accounting' ? data : null;
//   }
// ]);

// let counter = 0;
// pipeline.on('data', () => ++counter);
// pipeline.on('end', () =>
//   console.log(`The accounting department has ${counter} employees.`));

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

const rawText = `
Nairobi Swimming Club HY-TEK's MEET MANAGER 8.0 - 16:22 PM 4/13/2025 Page 1
NCSA Inter-Clubs Swimming Championships April 11-13 2025
Results
Event 101 Girls Open 1500 SC Meter Freestyle
County: 19:06.98 C 10/21/2022 Victoria A. Okumu BRSC-
Meet Record: 23:01.13 M 4/12/2024 Amani K Njau SHAQS
1 Swai, Zahra 13-11 Braeburn Swimming Club 23:40.40 21:47.55M
2 Kotut, Chichi 13-11 Braeburn Swimming Club 23:00.00 23:01.80
Event 102 Boys Open 1500 SC Meter Freestyle
County: 17:50.89 C 3/15/2019 Alvin Omondi
Meet Record: 20:52.86 M 4/12/2024 Joseph Okal ZEFIS-ZZ
Name Age Team Seed Time Finals Time
1 Kenyi, Max 16-08 Braeburn Swimming Club 19:51.90 19:48.59M
2 Ogola, Andrew 13-11 Little Fish Swim Club 21:44.51 20:37.68
3  Okumu, Lawrence 13-12 Braeburn Swimming Club NT 21:22.91
`;

async function doDatabaseWork() {
	"use server";

	parserWork();
}

export async function parserWork() {
	const parser = new DeepSeekParser();
	parser.on("swimEventData", (data) => {
		console.log("***", data);
	});

	await parser.fetchSwimEventsAndResults(rawText);
}

async function upload() {
	"use server";
	const importManager = importManagerFactory.getInstance("swimResult");
	importManager.importJson({ fileName: "swimResults.git_skip.json" });
}

export async function pipelineWork() {
	const filePath = path.join(PDF_FOLDER, "swimResult/swimResult.json");
	await access(filePath, constants.R_OK);

	const pipeline = chain([
		fs.createReadStream(filePath),
		parser({ jsonStreaming: true, streamKeys: true }),
		streamValues(),
		(data: string) => {
			console.log("fart", data);
		},
	]);

	let counter = 0;
	pipeline.on("data", () => counter++);
	pipeline.on("end", () => console.log("finished", counter));
}
