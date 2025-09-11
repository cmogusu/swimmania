import path from "node:path";
import {
	IMAGE_FOLDER,
	SITE_URL,
} from "../constants";

export const imagePathToSrc = (imgPath) => {
	// Correct function
	const relativePath = path.relative(IMAGE_FOLDER, imgPath);
	return `${SITE_URL}${relativePath}`;
};

export const isIdValid = (entityId) => entityId !== undefined;
