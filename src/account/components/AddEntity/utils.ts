import type { EntityData, EntityType, ImageData, MetadataData } from "@/server";

export const createEmptyEntity = (entityType: EntityType): EntityData => {
	const image = createEmptyImage();
	const metadata = createEmptyMetadata();

	return {
		id: -1,
		type: entityType,
		name: "cow",
		description: "very fat cow",
		location: "kisumu",
		defaultImage: image,
		images: [image],
		metadata: [metadata],
	};
};

const createEmptyImage = (): ImageData => ({
	id: -1,
	alt: "",
	src: "",
	isDefault: true,
});

const createEmptyMetadata = (): MetadataData => ({
	id: -1,
	name: "",
	value: "",
});
