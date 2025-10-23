import type {
	MetadataComparator,
	MetadataData,
	RawMetadata,
	SchemaType,
} from "@/server/types";

export type MetadataValue = boolean | number | string;

export type MetadataFilter = RawMetadata & {
	comparator: MetadataComparator;
};

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
	dbColumnType?: string;
	// biome-ignore lint/suspicious/noExplicitAny: Fix this later
	computeFunction?: (_value: any) => any;
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

export type DbTableColumn = {
	name: string;
	type: string;
};

export interface IMetadataPropertyType {
	id: number;
	type: SchemaType;
	itemIndex?: number;
	title: string;
	name: string;
	names: string[];
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
	getDbTableColumn: () => DbTableColumn;
	getDbTableColumns: () => DbTableColumn[];
}

export interface IEntityMetadata {
	metadata: IMetadataPropertyType[];
	names: string[];

	dbValue: MetadataData[];
	dbTableName: string;
	getDbTableColumns: () => DbTableColumn[];

	validateFilter: (filter: MetadataFilter) => void;
	validateFilters: (filters?: MetadataFilter[]) => void;

	sanitizeFilter: (filter: MetadataFilter) => MetadataFilter;
	sanitizeFilters: (filters?: MetadataFilter[]) => MetadataFilter[];

	validateMetadata: (name?: string, value?: MetadataValue) => void;
	setSeedData: () => void;
}
