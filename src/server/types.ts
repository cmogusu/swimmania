export type EntityType =
	| "coach"
	| "lifeguard"
	| "swimmer"
	| "parent"
	| "team"
	| "pool"
	| "school"
	| "swimMeet"
	| "swimEvent"
	| "swimResult"
	| "user";

export type PublicEntityType = Omit<EntityType, "user">;

export type PrivateEntityType = Extract<EntityType, "user">;

export type RelationshipType =
	| "isAlso"
	| "worksAt"
	| "worksAt_inverse"
	| "trainsAt"
	| "trainsAt_inverse"
	| "canBeFoundAt"
	| "canBeFoundAt_inverse"
	| "manages"
	| "manages_inverse"
	| "contains"
	| "contains_inverse"
	| "participatedIn"
	| "participatedIn_inverse"
	| "parentOf"
	| "parentOf_inverse";

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

export type RawMetadata = {
	id?: number;
	name: string;
	value?: MetadataValue;
	entityId?: number;
};

export type MetadataComparator = "=" | "!=" | "<" | "<=" | ">" | ">=";

export type PaginationOptions = {
	pageNumber?: number;
	pageSize?: number;
};

export interface IPaginated {
	pageNumber: number;
	pageSize: number;
}

export type ImageData = {
	id: number;
	alt: string;
	src: string;
	isDefault: boolean;
};

export type MetadataData = {
	id: number;
	name: string;
	value: MetadataValue;
};

export type EntityData = {
	id: number;
	type: EntityType;
	name: string;
	description: string | undefined;
	location: string | undefined;
	defaultImage: ImageData | undefined;
	images: ImageData[] | undefined;
	metadata: MetadataData[] | undefined;
	relationshipType?: string;
};

export type EntitiesData = {
	nextPage: number;
	entities: EntityData[];
	hasMore: boolean;
};

export type RelationshipTypeDescription = {
	getTitle: (relatedEntityType: EntityType) => string;
	description: string;
};

export type RelatedEntityRelationship = [RelationshipType, EntityType];

export type Option = {
	key: string;
	value: string;
};

export type DbTableColumn = {
	name: string;
	type: string;
};

export interface IMetadataPropertyType {
	id: number;
	type: SchemaType;
	title: string;
	name: string;
	value: MetadataValue;
	dbValue: MetadataData[];
	formattedValue: string;
	sortIndex: number;
	setSeedData: () => void;
	getDbTableColumn: () => DbTableColumn;
}

export type INumberMetadataPropertyType = IMetadataPropertyType & {
	min: number;
	max: number;
};

export type IOptionsMetadataPropertyType = IMetadataPropertyType & {
	options: Option[];
};

export type ITimeMetadataPropertyType = IMetadataPropertyType & {
	step: number;
};

export type IParentMetadataPropertyType = IMetadataPropertyType & {
	names: string[];
	children: IMetadataPropertyType[];
	getChild: (childName: string) => IMetadataPropertyType;
	createChildInstance: (childName: string, rawMetadata?: RawMetadata) => void;
	createAllChildInstances: () => void;
	getDbTableColumns: () => DbTableColumn[];
};

export interface IEntityMetadata {
	metadata: IMetadataPropertyType[];
	names: string[];

	dbValue: MetadataData[];
	getDbTableColumns: () => DbTableColumn[];

	validateFilter: (filter: MetadataFilter) => MetadataFilter;
	validateFilters: (filters?: MetadataFilter[]) => MetadataFilter[];

	setSeedData: () => void;
}

export type MetadataValue = boolean | number | string;

export type MetadataFilter = RawMetadata & {
	comparator: MetadataComparator;
};

export type ApiKeys = {
	mapbox: string;
	maptiler: string;
	tomtom: string;
	azure: string;
	google: string;
};
