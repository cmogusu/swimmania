import { BaseQuery } from "../../services";

export class Query extends BaseQuery {
	getAll(entityId: number) {
		this.throwIfNotSet({ entityId });
		return this.exec(`SELECT * FROM \`image\` Where entityId = ?;`, [entityId]);
	}

	getDefault(entityId: number) {
		this.throwIfNotSet({ entityId });
		return this.exec(
			`SELECT * FROM \`image\` Where entityId = ? and isDefault = true;`,
			[entityId],
		);
	}

	getById(entityId: number, imageId: number) {
		this.throwIfNotSet({ entityId, imageId });
		return this.exec(`SELECT * FROM \`image\` Where id = ? and entityId = ?;`, [
			imageId,
			entityId,
		]);
	}

	update(
		imageId: number,
		entityId: number,
		alt: string,
		filepath: string,
		isDefault: boolean,
	) {
		this.throwIfNotSet({
			entityId,
			alt,
			filepath,
			isDefault,
			imageId,
		});

		return this.exec(
			`UPDATE \`image\` SET entityId=?, alt=?, filepath=?, isDefault=? WHERE id=?;`,
			[entityId, alt, filepath, isDefault, imageId],
		);
	}

	insert(entityId: number, alt: string, filepath: string, isDefault: boolean) {
		this.throwIfNotSet({ entityId, alt, filepath, isDefault });

		return this.exec(
			`INSERT INTO \`image\` (entityId, alt, filepath, isDefault) VALUES (?, ?, ?, ?);`,
			[entityId, alt, filepath, isDefault],
		);
	}

	deleteById(imageId: number, entityId: number) {
		this.throwIfNotSet({
			imageId,
			entityId,
		});

		return this.exec(`Delete FROM \`image\` Where id = ? and entityId = ? `, [
			imageId,
			entityId,
		]);
	}
}
