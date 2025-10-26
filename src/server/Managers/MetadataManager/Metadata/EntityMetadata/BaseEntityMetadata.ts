import type {
	DbTableColumn,
	IEntityMetadata,
	IMetadataPropertyType,
	MetadataData,
	MetadataFilter,
	RawMetadata,
} from "@/server/types";
import { isSet, isUndefined } from "@/server/utils";

export class BaseEntityMetadata implements IEntityMetadata {
	// biome-ignore lint/suspicious/noExplicitAny: TODO - find better solution for this
	[key: string]: any;

	metadata: IMetadataPropertyType[] = [];

	get names() {
		return this.metadata.flatMap((property) =>
			property.type === "parent" ? property.names : property.name,
		);
	}

	getDbTableColumns(): DbTableColumn[] {
		return this.metadata.flatMap((property) =>
			property.type === "parent"
				? property.getDbTableColumns()
				: property.getDbTableColumn(),
		);
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

	validateFilter(filter: MetadataFilter): MetadataFilter {
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

		const validatedValue = property.validateValue(value);
		return {
			name,
			comparator,
			value: validatedValue,
		};
	}

	validateFilters(filters?: MetadataFilter[]): MetadataFilter[] {
		if (!filters?.length) {
			throw new Error("Filter array expected");
		}

		return filters.map(this.validateFilter);
	}

	toJSON() {
		return this.dbValue;
	}

	setSeedData() {
		this.metadata.forEach((m) => m.setSeedData());
	}
}
