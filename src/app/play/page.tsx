import type { File } from "node:buffer";
import crypto from "node:crypto";
import fs from "node:fs";
import {
	access,
	constants,
	mkdir,
	readdir,
	rename,
	stat,
	writeFile,
} from "node:fs/promises";
import path from "node:path";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import { UPLOADS_FOLDER } from "@/server/constants/paths";

export default async function Page() {
	// console.log(cleaned);
	const { window } = new JSDOM();
	const domPurify = DOMPurify(window);
	const cleaned = domPurify.sanitize("<p>hello world</p>");
	console.log(cleaned);
	return <div className="p-6">hello</div>;
}

export async function x() {
	const files = await readdir(UPLOADS_FOLDER);
	const promises = files.map((f) => {
		const filePath = path.join(UPLOADS_FOLDER, f);
		return stat(filePath);
	});

	const fileStats = await Promise.all(promises);
	const sorted = fileStats.sort((f1, f2) => f1.birthtimeMs - f2.birthtimeMs);
	for (const fileStat of sorted) {
		console.log(fileStat);
	}
}

export async function upload() {
	const filePath = "/Users/clive/www/swimmania/public/uploads/camel.jpg";
	const hash =
		"febf88ea4051355e7918b87cf19c9602a9c8223dbe2eb5ca15b7d469823254c7";

	const folderPath = getFolderPath(hash);
	await createFolder(folderPath);
	await moveFileIntoFolder(folderPath, filePath);
}

async function moveFileIntoFolder(folderPath: string, filePath: string) {
	const fileName = path.basename(filePath);
	const fileNameInFolder = path.join(folderPath, fileName);
	try {
		await access(fileNameInFolder);
	} catch (_e) {
		await rename(filePath, fileNameInFolder);
	}
}

const getFolderPath = (folderName: string) =>
	path.join(UPLOADS_FOLDER, folderName);

export async function createFolder(folderPath: string) {
	try {
		await access(folderPath, constants.W_OK);
	} catch (_e) {
		await mkdir(folderPath);
	}
}

export function getFileHash(filePath: string) {
	return new Promise((resolve) => {
		const hash = crypto.createHash("sha256");
		const stream = fs.createReadStream(filePath);

		stream.on("error", (error) => console.log(error));
		stream.on("data", (chunk) => hash.update(chunk));
		stream.on("end", () => {
			resolve(hash.digest("hex"));
		});
	});
}

export async function uploadFile(file: File) {
	const arrayBuffer = await file.arrayBuffer();
	const buffer = new Uint8Array(arrayBuffer);
	const filePath = path.join(UPLOADS_FOLDER, file.name);
	await writeFile(filePath, buffer);

	return filePath;
}

export async function getFile(formData: FormData): Promise<File> {
	const file = formData.get("image") as unknown as File;
	if (!file) {
		throw Error("No file uploaded");
	}

	return file as File;
}
