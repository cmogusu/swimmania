import type {
	IMetadataPropertyType,
	IParentMetadataPropertyType,
	MetadataValue,
	RawMetadata,
} from "@/server/types";
import type { MetadataPropertyInitializer } from "../types";

// Always returns parent metadata property
export function getPropertyInstance(
	initializers: Record<string, MetadataPropertyInitializer>,
	name: string,
	value: MetadataValue | undefined,
	intializeAllProperties?: boolean,
) {
	if (!name) {
		throw Error("Metadata name not set");
	}

	const [propertyName, childName] = name.split(".");
	const initializer = initializers[propertyName];
	if (!initializer) {
		throw Error("Invalid metadata property name");
	}

	const propertyInstance = initializer(value);
	if (childName) {
		(propertyInstance as IParentMetadataPropertyType).createChildInstance(
			childName,
			value,
		);
	}

	const { type } = propertyInstance;
	if (type === "parent" && intializeAllProperties) {
		(propertyInstance as IParentMetadataPropertyType).createAllChildInstances();
	}

	return propertyInstance;
}

export function getMetadataProperties(
	propertyInitilizers: Record<string, MetadataPropertyInitializer>,
	rawMetadata?: RawMetadata,
	intializeAllProperties: boolean = false,
): Record<string, IMetadataPropertyType> {
	const properties: Record<string, IMetadataPropertyType> = {};

	if (rawMetadata) {
		for (const name in rawMetadata) {
			const [propertyName] = name.split(".");
			const value = rawMetadata[name];

			if (properties[propertyName]?.type === "parent") {
				(
					properties[propertyName] as IParentMetadataPropertyType
				).createChildInstance(name, value);
				continue;
			}

			properties[propertyName] = getPropertyInstance(
				propertyInitilizers,
				name,
				value,
				intializeAllProperties,
			);
		}
	}

	if (!intializeAllProperties) {
		return properties;
	}

	for (const propertyName in propertyInitilizers) {
		if (!properties[propertyName]) {
			properties[propertyName] = getPropertyInstance(
				propertyInitilizers,
				propertyName,
				undefined,
				intializeAllProperties,
			);
		}
	}

	return properties;
}
