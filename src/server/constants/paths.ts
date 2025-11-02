import path from "node:path";

export const PUBLIC_FOLDER = path.join(process.cwd(), "public");
export const UPLOADS_FOLDER = path.join(PUBLIC_FOLDER, "uploads");
export const IMAGE_FOLDER = path.join(PUBLIC_FOLDER, "images");
export const IMAGE_FOLDER_URL = `/images`;
