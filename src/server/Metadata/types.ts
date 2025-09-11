import type { EntityType, MetadataData } from "../types";

export type MetadataValue = boolean | number | string;

export type MetadataComparator = "=" | "!=" | "<" | "<=" | ">" | ">=";

export type MetadataFilter = RawMetadata & {
	comparator: MetadataComparator;
};

export type RawMetadata = {
	id?: number;
	name: string;
	value?: MetadataValue;
	RawMetadata?: string;
	entityType?: EntityType;
	entityId?: number;
	itemIndex?: number;
	isHidden?: boolean;
};

export type SchemaType =
	| "none"
	| "parent"
	| "number"
	| "ratings"
	| "boolean"
	| "options"
	| "text"
	| "latitude"
	| "longitude"
	| "time"
	| "date";

export type Option = {
	key: string;
	value: string;
};

export type MetadataTypeInputs = {
	id?: number;
	name: string;
	title: string;
	value?: MetadataValue;
	editTitle?: string;
	min?: number;
	max?: number;
	itemIndex?: number;
	isHidden?: boolean;
	prefix?: string;
	suffix?: string;
};

export type ParentTypeInputs = MetadataTypeInputs & {
	children?: IMetadataType[];
};

export type OptionsTypeInputs = MetadataTypeInputs & {
	options?: Option[];
};

export interface IMetadataType {
	id: number;
	type: SchemaType;
	itemIndex?: number;
	isHidden?: boolean;
	name: string;
	value: MetadataValue;
	dbValue: MetadataData[];
	formattedValue: string;
	hasValue: boolean;
	children?: IMetadataType[];
}

export interface IEntityMetadata {
	metadata: IMetadataType[];
	dbValue: MetadataData[];
	validateFilter: (filter: MetadataFilter) => void;
	validateFilters: (filters?: MetadataFilter[]) => void;

	sanitizeFilter: (filter: MetadataFilter) => MetadataFilter;
	sanitizeFilters: (filters?: MetadataFilter[]) => MetadataFilter[];

	validateMetadata: (name?: string, value?: MetadataValue) => void;
}
