import type { ImageDatabaseRawOutputData } from "./types";

export class Image {
	id: number;
	entityId: number;
	name: string;
	description: string;
	filepath: string;
	isDefault: boolean = false;

	constructor({
		id,
		entityId,
		name,
		description,
		filepath,
		isDefault,
	}: ImageDatabaseRawOutputData) {
		this.id = id;
		this.entityId = entityId;
		this.name = name;
		this.description = description;
		this.filepath = filepath;
		this.isDefault = isDefault || false;
	}

	get src() {
		return this.filepath;
	}

	toJSON() {
		const { id, description, src } = this;
		return {
			id,
			alt: description,
			src,
		};
	}
}
