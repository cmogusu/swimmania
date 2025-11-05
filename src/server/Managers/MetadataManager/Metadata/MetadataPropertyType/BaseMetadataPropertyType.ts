import type {
	DbTableColumn,
	IMetadataPropertyType,
	MetadataData,
	MetadataValue,
	RawMetadata,
	SchemaType,
} from "@/server/types";
import { isUndefined } from "@/server/utils";
import type { MetadataTypeInputs } from "../types";
import { type Validate, ValidateInstance } from "./Validate";

export class BaseMetadataPropertyType implements IMetadataPropertyType {
	dbColumnType: string = "varchar(255)";
	validate: Validate;

	type: SchemaType = "text";
	id: number = -1;
	name: string;
	_value!: MetadataValue;

	title: string = "";
	editTitle: string = "";

	prefix: string = "";
	suffix: string = "";

	allowedComparators: string[] = ["=", "<>"];
	parent: IMetadataPropertyType | undefined;

	sortIndex: number = 100;

	constructor({
		id,
		name,
		title,
		editTitle,
		prefix,
		suffix,
		sortIndex,
		dbColumnType,
	}: MetadataTypeInputs) {
		this.validate = ValidateInstance;

		if (!isUndefined(id)) this.id = id;
		if (!isUndefined(title)) this.title = title;
		if (!isUndefined(editTitle)) this.editTitle = editTitle;
		if (!isUndefined(prefix)) this.prefix = prefix;
		if (!isUndefined(suffix)) this.suffix = suffix;
		if (!isUndefined(sortIndex)) this.sortIndex = sortIndex;
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
