import { isUndefined } from "@/server/utils";
import type { EntityType, RawMetadata } from "../../types";
import type { Image } from "../ImageManager";
import type { RawEntity } from "./types";

export class Entity {
	id: number;
	name: string;
	entityType: EntityType;
	description: string | undefined;
	defaultImage: Image | undefined;
	images: Image[] | undefined;
	metadata: RawMetadata[] | undefined;
	userCanEdit: boolean | undefined;

	constructor({ id, name, type, description }: RawEntity) {
		this.id = id;
		this.entityType = type;
		this.name = name;

		if (!isUndefined(description)) this.description = description;
	}
}
