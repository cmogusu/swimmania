import type { MetadataData, RawMetadata, SchemaType } from "@/server/types";
import { isSet, isUndefined } from "@/server/utils";
import type {
	DbTableColumn,
	IMetadataPropertyType,
	MetadataTypeInputs,
	MetadataValue,
} from "../types";

export class BaseMetadataPropertyType implements IMetadataPropertyType {
	dbColumnType: string = "varchar(255)";

	type: SchemaType = "text";
	id: number = -1;
	name: string;
	_value!: MetadataValue;

	title: string = "";
	editTitle: string = "";

	min: number = Number.MIN_SAFE_INTEGER;
	max: number = Number.MAX_SAFE_INTEGER;

	prefix: string = "";
	suffix: string = "";

	itemIndex: number = 0;

	allowedComparators: string[] = ["=", "<>"];
	parent: IMetadataPropertyType | undefined;

	sortIndex: number = 100;

	// Used only in parent metadata type
	public get names(): string[] {
		return [];
	}

	getDbTableColumns(): DbTableColumn[] {
		return [] as DbTableColumn[];
	}

	constructor({
		id,
		name,
		title,
		value,
		editTitle,
		min,
		max,
		itemIndex,
		prefix,
		suffix,
		sortIndex,
		dbColumnType,
	}: MetadataTypeInputs) {
		if (!isUndefined(id)) this.id = id;
		if (!isUndefined(title)) this.title = title;
		if (!isUndefined(editTitle)) this.editTitle = editTitle;
		if (!isUndefined(min)) this.min = min;
		if (!isUndefined(max)) this.max = max;
		if (!isUndefined(itemIndex)) this.itemIndex = itemIndex;
		if (!isUndefined(prefix)) this.prefix = prefix;
		if (!isUndefined(suffix)) this.suffix = suffix;
		if (!isUndefined(sortIndex)) this.sortIndex = sortIndex;
		if (!isUndefined(value)) this.value = value;
		if (!isUndefined(dbColumnType)) this.dbColumnType = dbColumnType;
		this.name = name;
	}

	getDbTableColumn(): DbTableColumn {
		if (!this.dbColumnType) {
			throw Error("Database table column type not set");
		}

		return {
			name: this.name,
			type: this.dbColumnType,
		};
	}

	set(target: unknown, source?: unknown) {
		if (isSet(source)) {
			target = source;
		}
	}

	get value(): MetadataValue {
		return this._value;
	}

	set value(v: MetadataValue) {
		this.validateValue(v);
		this._value = v;
	}

	get dbValue(): MetadataData[] {
		const { id, name, value } = this;
		if (!isUndefined(value)) {
			return [{ id, name, value }];
		}

		return [];
	}

	get formattedValue(): string {
		return `${this.prefix}${this.value?.toString()}${this.suffix}`;
	}

	validateValue(_?: MetadataValue) {}

	sanitizeValue(v: MetadataValue) {
		return v;
	}

	createChildInstance(_: string, __?: RawMetadata) {}
	createAllChildInstances() {}

	setSeedData() {}

	getChild(_name: string) {
		if (this.type !== "parent") {
			throw Error("Not parent class");
		}

		return this as IMetadataPropertyType;
	}
}
