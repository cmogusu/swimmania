import path from "node:path";

export const PublicFolder = path.join(__dirname, "../../public");
export const ImageFolder = path.join(PublicFolder, "img");

export const POSTS_PER_PAGE = 5;
export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

if (!process.env.SITE_ORIGIN_URL) {
	throw Error("Site url not set. Set it in env file");
}
export const SITE_URL = process.env.SITE_ORIGIN_URL;

if (!process.env.SITE_ORIGIN_URL) {
	throw Error("Client url not set. Set it in env file");
}
export const CLIENT_URL = process.env.CLIENT_ORIGIN_URL;

export const PUBLIC_FOLDER = path.join(__dirname, "../public");
export const IMAGE_FOLDER = path.join(PUBLIC_FOLDER, "images");
export const IMAGE_FOLDER_URL = `/images`;

// Entity types
export const EntityTypes = {
	swimmer: "swimmer",
	school: "school",
	pool: "pool",
	team: "team",
	gala: "gala",
	coach: "coach",
};

export const EntityTypesKeys = Object.keys(EntityTypes);

export const TopLevelEntityTypes = [
	EntityTypes.pool,
	EntityTypes.school,
	EntityTypes.swimmer,
	EntityTypes.team,
];

// Metadata types
export const MetadataTypes = {
	text: "text",
	number: "number",
	ratings: "ratings",
	time: "time",
	boolean: "boolean",
};

export const MetadataTypeKeys = Object.keys(MetadataTypes);
