import type {
	IMetadataPropertyType,
	IParentMetadataPropertyType,
	RawMetadata,
} from "@/server/types";
import type { MetadataPropertyInitializer } from "../types";

// Always returns parent metadata property
export function getPropertyInstance(
	initializers: Record<string, MetadataPropertyInitializer>,
	rawMetadata?: RawMetadata,
	intializeAllProperties?: boolean,
) {
	const { name } = rawMetadata || {};
	if (!name) {
		throw Error("Metadata name not set");
	}

	const [propertyName, childName] = name.split(".");
	const initializer = initializers[propertyName];
	if (!initializer) {
		throw Error("Invalid metadata property name");
	}

	const propertyInstance = initializer(rawMetadata);
	if (childName) {
		(propertyInstance as IParentMetadataPropertyType).createChildInstance(
			childName,
			rawMetadata,
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
	rawMetadataArr?: RawMetadata[],
	intializeAllProperties: boolean = false,
): Record<string, IMetadataPropertyType> {
	const properties: Record<string, IMetadataPropertyType> = {};

	rawMetadataArr?.forEach((rawMetadata: RawMetadata) => {
		const { name } = rawMetadata;
		const [propertyName] = name.split(".");

		if (properties[propertyName]?.type === "parent") {
			(
				properties[propertyName] as IParentMetadataPropertyType
			).createChildInstance(name, rawMetadata);
			return;
		}

		properties[propertyName] = getPropertyInstance(
			propertyInitilizers,
			rawMetadata,
			intializeAllProperties,
		);
	});

	if (!intializeAllProperties) {
		return properties;
	}

	for (const propertyName in propertyInitilizers) {
		if (!properties[propertyName]) {
			properties[propertyName] = getPropertyInstance(
				propertyInitilizers,
				{ name: propertyName },
				intializeAllProperties,
			);
		}
	}

	return properties;
}
