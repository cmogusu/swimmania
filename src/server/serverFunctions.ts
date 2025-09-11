"use server";

import fs from "node:fs/promises";
import path from "node:path";
import { logError, logInfo } from "@/utilities/log";

export async function getApiKeys() {
	return new Promise((resolve) => {
		resolve({
			mapboxApiKey: process.env.MAPBOX_ACCESS_TOKEN,
			maptilerApiKey: process.env.MAPTILER_API_KEY,
			tomtomApiKey: process.env.TOMTOM_API_KEY,
			azureApiKey: process.env.AZURE_API_KEY,
		});
	});
}

export async function moveFileToImgFolder(fileName: string) {
	// @ts-ignore
	const home: string = process.env.HOME;
	const downloadsFolder = path.join(home, "Downloads");
	const imgFolder = path.join(home, "www/mapguru/public/img");
	const oldImgPath = path.join(downloadsFolder, fileName);
	const newImgPath = path.join(imgFolder, fileName);
	await moveFile(oldImgPath, newImgPath);
}

export async function moveFile(oldPath: string, newPath: string) {
	try {
		await fs.rename(oldPath, newPath);
		logInfo(`File moved successfully from ${oldPath} to ${newPath}`);
	} catch (error: unknown) {
		const { code, message } = error as Error;
		if (code === "EXDEV") {
			logError(
				"Cannot move file across different file systems. Copying instead...",
			);
			await fs.copyFile(oldPath, newPath);
			await fs.unlink(oldPath);
			logError(
				`File copied and original deleted from ${oldPath} to ${newPath}`,
			);
		} else {
			logError(`Error moving file: ${message}`);
			throw error;
		}
	}
}
