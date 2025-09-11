import type { ImageDatabaseRawOutputData } from "./types";

export class Image {
	id: number;
	entityId: number;
	alt: string;
	filepath: string;
	isDefault: boolean = false;

	constructor({
		id,
		entityId,
		alt,
		filepath,
		isDefault,
	}: ImageDatabaseRawOutputData) {
		this.id = id;
		this.entityId = entityId;
		this.alt = alt;
		this.filepath = filepath;
		this.isDefault = isDefault || false;
	}

	get src() {
		return this.filepath;
	}

	toJSON() {
		const { id, alt, src, isDefault } = this;
		return {
			id,
			alt,
			src,
			isDefault,
		};
	}
}
