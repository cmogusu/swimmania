import { BaseQuery } from "../../services";

export class Query extends BaseQuery {
	getAll(entityId: number): string {
		this.throwIfNotSet({ entityId });
		return `SELECT * FROM \`image\` Where entityId = ${entityId};`;
	}

	getDefault(entityId: number): string {
		this.throwIfNotSet({ entityId });
		return `SELECT * FROM \`image\` Where entityId =${entityId} and isDefault = true`;
	}

	getById(entityId: number, imageId: number): string {
		this.throwIfNotSet({ entityId, imageId });
		return `SELECT * FROM \`image\` Where id = '${imageId}' and entityId = ${entityId};`;
	}

	update(
		imageId: number,
		entityId: number,
		alt: string,
		filepath: string,
		isDefault: boolean,
	) {
		const updateValues = {
			entityId,
			alt,
			filepath,
			isDefault,
		};

		this.throwIfNotSet({
			imageId,
			...updateValues,
		});

		const updateValuesStr = this.formatUpdateValues(updateValues);
		return `UPDATE \`image\` SET ${updateValuesStr} WHERE id='${imageId}';`;
	}

	insert(entityId: number, alt: string, filepath: string, isDefault: boolean) {
		const insertValues = {
			entityId,
			alt,
			filepath,
			isDefault,
		};

		this.throwIfNotSet(insertValues);

		const { keys, values } = this.formatInsertValues(insertValues);
		return `INSERT INTO \`image\` (${keys}) VALUES (${values});`;
	}

	deleteById(imageId: number, entityId: number) {
		this.throwIfNotSet({
			imageId,
			entityId,
		});

		return `Delete FROM \`image\` Where id = ${imageId} and entityId = ${entityId} `;
	}
}
