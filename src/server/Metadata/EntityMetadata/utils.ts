import type {
	IMetadataPropertyType,
	MetadataPropertyInitializer,
	RawMetadata,
} from "../types";

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
		propertyInstance.createChildInstance(childName, rawMetadata);
		intializeAllProperties && propertyInstance.createAllChildInstances();
	}

	return propertyInstance;
}

export function getMetadataProperties(
	propertyInitilizers: Record<string, MetadataPropertyInitializer>,
	rawMetadataArr?: RawMetadata[],
	intializeAllProperties: boolean = false,
): Record<string, IMetadataPropertyType> {
	const rawMetadataObject = createRawMetadataObjectFromArr(rawMetadataArr);
	const properties: Record<string, IMetadataPropertyType> = {};

	for (const propertyName in propertyInitilizers) {
		const rawMetadata = rawMetadataObject[propertyName];
		if (rawMetadata || intializeAllProperties) {
			properties[propertyName] = getPropertyInstance(
				propertyInitilizers,
				rawMetadata,
				intializeAllProperties,
			);
		}
	}

	return properties;
}

function createRawMetadataObjectFromArr(
	rawMetadataArr?: RawMetadata[],
): Record<string, RawMetadata> {
	return (rawMetadataArr || []).reduce(
		(obj: Record<string, RawMetadata>, rawMetadata: RawMetadata) => {
			const { name } = rawMetadata;
			obj[name] = rawMetadata;
			return obj;
		},
		{},
	);
}
