import type { EntityType } from "@/server/types";

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

export type RawGetByIdImageInputs = {
	entityType: EntityType;
	id: number;
	entityId: number;
};

export type RawGetDefaultImageInputs = {
	entityId: number;
};

export type RawSetDefaultImageInputs = {
	entityType: EntityType;
	id: number;
	entityId: number;
	isDefault: boolean;
};

export type RawUpdateImageInputs = {
	entityType: EntityType;
	id: number;
	entityId: number;
	alt: string;
};

export type RawInsertImageInputs = {
	entityType: EntityType;
	entityId: number;
	alt: string;
	filepath: string;
};

export type RawDeleteAllImageInputs = {
	entityType: EntityType;
	entityId: number;
};

export type RawDeleteByIdImageInputs = {
	entityType: EntityType;
	id: number;
	entityId: number;
};
