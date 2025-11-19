import type {
	DbTableColumn,
	IEntityMetadata,
	IMetadataPropertyType,
	IParentMetadataPropertyType,
	MetadataFilter,
	RawMetadata,
} from "@/server/types";
import { isSet } from "@/server/utils";
import type { MetadataPropertyInitializer } from "../types";
import { getMetadataProperties } from "./utils";

export class BaseEntityMetadata implements IEntityMetadata {
	properties: Record<string, IMetadataPropertyType> = {};
	metadata: IMetadataPropertyType[] = [];

	initializeAndSetProperties(
		propertyInitilizers: Record<string, MetadataPropertyInitializer>,
		rawMetadata?: RawMetadata,
		intializeAllProperties: boolean = false,
	) {
		const properties = getMetadataProperties(
			propertyInitilizers,
			rawMetadata,
			intializeAllProperties,
		);

		this.properties = properties;
		for (const propertyName in properties) {
			this.metadata.push(properties[propertyName]);
		}

		this.metadata.sort((m1, m2) => m1.sortIndex - m2.sortIndex);
	}

	get names() {
		return this.metadata.flatMap((property) =>
			property.type === "parent"
				? (property as IParentMetadataPropertyType).names
				: property.name,
		);
	}

	getDbTableColumns(): DbTableColumn[] {
		return this.metadata.flatMap((property) =>
			property.type === "parent"
				? (property as IParentMetadataPropertyType).getDbTableColumns()
				: property.getDbTableColumn(),
		);
	}

	getProperty(name: string): IMetadataPropertyType {
		const [propertyName, propertyChildName] = name.split(".");
		if (!Object.hasOwn(this, propertyName)) {
			throw Error("Property name does not exist");
		}

		const property = this.properties[propertyName];
		if (!propertyChildName) {
			return property;
		}

		const childProperty = (property as IParentMetadataPropertyType)?.getChild(
			propertyChildName,
		);
		if (!childProperty) {
			throw Error("Property child name does not exist");
		}

		return childProperty;
	}

	set(target: unknown, source?: unknown) {
		if (isSet(source)) {
			target = source;
		}
	}

	get dbValue(): RawMetadata {
		const dbValue = {};
		this.metadata.forEach((metadata: IMetadataPropertyType) => {
			Object.assign(dbValue, metadata.dbValue);
		});

		return dbValue;
	}

	validateFilter(filter: MetadataFilter): MetadataFilter {
		const { name, comparator, value } = filter;
		const property = this.properties[name];

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
