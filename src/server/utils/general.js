import path from "node:path";
import {
	IMAGE_FOLDER,
} from "../folderConstants";

export const imagePathToSrc = (imgPath) => {
	// Correct function
	const relativePath = path.relative(IMAGE_FOLDER, imgPath);
	return `${relativePath}`;
};

export const isIdValid = (entityId) => entityId !== undefined;
