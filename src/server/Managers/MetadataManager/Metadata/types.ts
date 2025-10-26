import type {
	IMetadataPropertyType,
	MetadataValue,
	Option,
	RawMetadata,
} from "@/server/types";

export type MetadataTypeInputs = {
	id?: number;
	name: string;
	title: string;
	value?: MetadataValue;
	editTitle?: string;
	min?: number;
	max?: number;
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
