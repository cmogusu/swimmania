import type {
	IMetadataPropertyType,
	MetadataValue,
	Option,
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
	step?: number;
	// biome-ignore lint/suspicious/noExplicitAny: Fix this later
	computeFunction?: (_value: any) => any;
};

export type MetadataPropertyInitializer = (
	value?: MetadataValue,
) => IMetadataPropertyType;

export type ParentTypeInputs = MetadataTypeInputs & {
	childInitializers: Record<string, MetadataPropertyInitializer>;
};

export type OptionsTypeInputs = MetadataTypeInputs & {
	options: Option[];
};
