import { isUndefined } from "@/server/utils";
import type {
	EntityData,
	EntityType,
	RawMetadata,
	RelatedEntitiesData,
} from "../types";
import type { RawEntity } from "./EntityManager/types";
import type { Image } from "./ImageManager";

export class Entity {
	entityId: number;
	name: string;
	entityType: EntityType;
	description: string | undefined;
	defaultImage: Image | undefined;
	images: Image[] | undefined;
	metadata: RawMetadata | undefined;
	userCanEdit: boolean | undefined;
	relatedEntities: RelatedEntitiesData[] | undefined;

	constructor({ id, name, type, description }: RawEntity) {
		this.entityId = id;
		this.entityType = type;
		this.name = name;

		if (!isUndefined(description)) this.description = description;
	}

	toJSON(): EntityData {
		return {
			entityId: this.entityId,
			name: this.name,
			entityType: this.entityType,
			description: this.description,
			defaultImage: this.defaultImage?.toJSON(),
			images: this.images?.map((img) => img.toJSON()),
			metadata: this.metadata,
			userCanEdit: this.userCanEdit,
			relatedEntities: this.relatedEntities,
		};
	}
}
