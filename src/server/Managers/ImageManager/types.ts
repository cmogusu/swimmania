export type ImageFileDataItem = {
	originalname: string;
	path: string;
	filename: string;
	size: number;
};

// Outputs
export type ImageDatabaseRawOutputData = {
	id: number;
	entityId: number;
	alt: string;
	src: string;
	isDefault: boolean;
	filepath: string;
};

export type ImageDatabaseOutputData = Required<ImageDatabaseRawOutputData>;

// Inputs
export type ImageGetAllRawInputs = {
	entityId: number;
};

export type ImageDefaultRawInputs = ImageGetAllRawInputs;

export type ImageGetByIdRawInputs = {
	id: number;
	entityId: number;
};

export type ImageUpdateRawInputs = {
	id: number;
	entityId: number;
	alt: string;
	filepath: string;
	isDefault: boolean;
	file?: ImageFileDataItem;
};

export type ImagePostRawInputs = {
	entityId: number;
	alt: string;
	filepath?: string;
	isDefault: boolean;
	file?: ImageFileDataItem;
};

export type ImageDeleteRawInputs = {
	id: number;
	entityId: number;
};

export type RawImageInputs = {
	id?: number;
	entityId: number;
	alt?: string;
	filepath?: string;
	isDefault?: boolean;
	file?: ImageFileDataItem;
};
