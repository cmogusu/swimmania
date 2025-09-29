import type { EntityType, MetadataData } from "@/server/types";

export type MetadataValue = boolean | number | string;

export type MetadataComparator = "=" | "!=" | "<" | "<=" | ">" | ">=";

export type MetadataFilter = RawMetadata & {
	comparator: MetadataComparator;
};

export type RawMetadata = {
	id?: number;
	name: string;
	value?: MetadataValue;
	entityType?: EntityType;
	entityId?: number;
	itemIndex?: number;
};

export type SchemaType =
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
	prefix?: string;
	suffix?: string;
	sortIndex?: number;
};

export type MetadataPropertyInitializer = (
	rawMetadata?: RawMetadata,
) => IMetadataPropertyType;

export type ParentTypeInputs = MetadataTypeInputs & {
	childInitializers: Record<string, MetadataPropertyInitializer>;
};

export type OptionsTypeInputs = MetadataTypeInputs & {
	options: Option[];
};

export interface IMetadataPropertyType {
	id: number;
	type: SchemaType;
	itemIndex?: number;
	title: string;
	name: string;
	value: MetadataValue;
	dbValue: MetadataData[];
	formattedValue: string;
	children?: IMetadataPropertyType[];
	options?: Option[];
	sortIndex: number;
	getChild: (childName: string) => IMetadataPropertyType;
	createChildInstance: (childName: string, rawMetadata?: RawMetadata) => void;
	createAllChildInstances: () => void;
	setSeedData: () => void;
}

export interface IEntityMetadata {
	metadata: IMetadataPropertyType[];
	dbValue: MetadataData[];
	validateFilter: (filter: MetadataFilter) => void;
	validateFilters: (filters?: MetadataFilter[]) => void;

	sanitizeFilter: (filter: MetadataFilter) => MetadataFilter;
	sanitizeFilters: (filters?: MetadataFilter[]) => MetadataFilter[];

	validateMetadata: (name?: string, value?: MetadataValue) => void;
	setSeedData: () => void;
}
