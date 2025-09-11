import type { MetadataValue } from "../../Metadata/types";
import type { MetadataDatabaseRawOutputData } from "./types";

export class Metadata {
	id: number;
	entityId: number;
	name: string;
	value: MetadataValue;
	itemIndex: number = 0;

	constructor({
		id,
		entityId,
		name,
		value,
		itemIndex,
	}: MetadataDatabaseRawOutputData) {
		this.id = id;
		this.entityId = entityId;
		this.name = name;
		this.value = value;
		this.itemIndex = itemIndex ?? 0;
	}

	toJSON() {
		const { id, entityId, name, value } = this;
		return {
			id,
			entityId,
			name,
			value,
		};
	}
}
