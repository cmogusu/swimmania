import type { MetadataData, RawMetadata } from "@/server/types";
import { isSet, isUndefined } from "@/server/utils";
import type {
	IEntityMetadata,
	IMetadataPropertyType,
	MetadataFilter,
	MetadataValue,
} from "../types";

export class BaseEntityMetadata implements IEntityMetadata {
	// biome-ignore lint/suspicious/noExplicitAny: TODO - find better solution for this
	[key: string]: any;
	metadata: IMetadataPropertyType[] = [];

	getNames() {
		const names = [];

		for (const property of this.metadata) {
			if (property.type === "parent") {
				const childNames = property.children?.map((p) => p.name) || [];
				names.push(...childNames);
			} else {
				names.push(property.name);
			}
		}

		return names;
	}

	setValue(rawMetadata: RawMetadata) {
		const { id, name, value, itemIndex } = rawMetadata;
		const property = this.getProperty(name);

		if (!isUndefined(id)) property.id = id;
		if (!isUndefined(value)) property.value = value;
		if (!isUndefined(itemIndex)) property.itemIndex = itemIndex;
	}

	getProperty(name: string): IMetadataPropertyType {
		const [propertyName, propertyChildName] = name.split(".");
		if (!Object.hasOwn(this, propertyName)) {
			throw Error("Property name does not exist");
		}

		const property = this[propertyName];
		if (!propertyChildName) {
			return property;
		}

		if (!Object.hasOwn(property, propertyChildName)) {
			throw Error("Property child name does not exist");
		}

		return property[propertyChildName];
	}

	set(target: unknown, source?: unknown) {
		if (isSet(source)) {
			target = source;
		}
	}

	get dbValue(): MetadataData[] {
		return this.metadata
			.flatMap((metadata) => metadata.dbValue)
			.filter(Boolean);
	}

	validateMetadata(name?: string, value?: MetadataValue) {
		if (!name) {
			throw Error("Metadata name required");
		}

		let property = this[name];
		if (name.includes(".")) {
			const [parentName, childName] = name.split(".");
			property = this[parentName][childName];
		}

		if (!property) {
			throw Error("Invalid metadata name");
		}

		property.validateValue(value);
	}

	validateFilter(filter: MetadataFilter): void {
		const { name, comparator, value } = filter;
		const property = this[name];

		if (!property) {
			throw Error("Invalid metadata name");
		}

		if (property.type === "parent") {
			throw Error("Filter using parent is prohibited");
		}

		if (!property.allowedComparators.includes(comparator)) {
			throw Error("Invalid comparator");
		}

		property.validateValue(value);
	}

	validateFilters(filters?: MetadataFilter[]): void {
		if (!filters?.length) {
			throw new Error("Filter array expected");
		}
		filters.map(this.validateFilter);
	}

	sanitizeFilter(filter: MetadataFilter): MetadataFilter {
		const { name, comparator, value } = filter;

		return {
			name,
			comparator,
			value: this[name].sanitizeValue(value),
		};
	}

	sanitizeFilters(filters?: MetadataFilter[]): MetadataFilter[] {
		if (!filters?.length) {
			throw new Error("Filter array expected");
		}
		return filters.map(this.sanitizeFilter);
	}

	toJSON() {
		return this.dbValue;
	}

	setSeedData() {
		this.metadata.forEach((m) => m.setSeedData());
	}
}
