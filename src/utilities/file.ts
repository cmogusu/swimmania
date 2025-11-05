import { access, constants, writeFile } from "node:fs/promises";
import path from "node:path";
import z from "zod";
import { IMAGE_FOLDER } from "@/server/constants/paths";

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export async function createFile(
	file: File,
	allowedFileTypes: string[] = ALLOWED_FILE_TYPES,
) {
	validateFile(file);

	if (file.name === "undefined") {
		throw Error("File name not set");
	}

	if (!allowedFileTypes.includes(file.type)) {
		throw Error("Invalid file type");
	}

	const arrayBuffer = await file.arrayBuffer();
	const buffer = new Uint8Array(arrayBuffer);
	const filePath = path.join(IMAGE_FOLDER, file.name);
	const exists = await fileExists(filePath);
	if (exists) {
		return filePath;
	}

	await writeFile(filePath, buffer);
	return filePath;
}

const fileExists = (filePath: string): Promise<boolean> =>
	access(filePath, constants.R_OK)
		.then(() => true)
		.catch(() => false);

const validateFile = (file: File) =>
	z
		.object({
			originalname: z.string().min(1).max(100),
			path: z.string().min(1).max(255),
			filename: z.string().min(1),
			size: z.optional(z.number()),
		})
		.parse(file);
