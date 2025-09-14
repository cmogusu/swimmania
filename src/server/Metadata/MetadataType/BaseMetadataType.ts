import type { MetadataData } from "@/server/types";
import { isSet, isUndefined } from "../../utils";
import type {
	IMetadataType,
	MetadataTypeInputs,
	MetadataValue,
	SchemaType,
} from "../types";

export class BaseMetadataType implements IMetadataType {
	type: SchemaType = "text";
	id: number = -1;
	name: string;
	_value: MetadataValue;

	title: string = "";
	editTitle: string = "";

	min: number = Number.MIN_SAFE_INTEGER;
	max: number = Number.MAX_SAFE_INTEGER;

	prefix: string = "";
	suffix: string = "";

	itemIndex: number = 0;
	isHidden: boolean = false;

	allowedComparators: string[] = ["=", "<>"];
	hasValue: boolean = false;
	parent: IMetadataType | undefined;

	constructor({
		id,
		name,
		title,
		value,
		editTitle,
		min,
		max,
		itemIndex,
		isHidden,
		prefix,
		suffix,
	}: MetadataTypeInputs) {
		if (!isUndefined(id)) this.id = id;
		if (!isUndefined(title)) this.title = title;
		if (!isUndefined(editTitle)) this.editTitle = editTitle;
		if (!isUndefined(min)) this.min = min;
		if (!isUndefined(max)) this.max = max;
		if (!isUndefined(itemIndex)) this.itemIndex = itemIndex;
		if (!isUndefined(isHidden)) this.isHidden = isHidden;
		if (!isUndefined(prefix)) this.prefix = prefix;
		if (!isUndefined(suffix)) this.suffix = suffix;
		if (!isUndefined(value)) this.value = value;
		this.name = name;
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

		this.hasValue = true;
		if (this.parent) this.parent.hasValue = true;
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

	validateValue(v?: unknown) {}

	sanitizeValue(v: MetadataValue) {
		return v;
	}
}
