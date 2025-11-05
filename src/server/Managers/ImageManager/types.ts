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
export type RawGetAllImageInputs = {
	entityId: number;
};

export type RawGetDefaultImageInputs = {
	entityId: number;
};

export type RawSetDefaultImageInputs = {
	id: number;
	entityId: number;
	isDefault: boolean;
};

export type RawUpdateImageInputs = {
	id: number;
	entityId: number;
	alt: string;
};

export type RawInsertImageInputs = {
	entityId: number;
	alt: string;
	filepath: string;
};

export type RawDeleteImageInputs = {
	id: number;
	entityId: number;
};
