import { BaseQuery } from "../../services";

export class Query extends BaseQuery {
	getAll(entityId: number) {
		this.throwIfNotSet({ entityId });
		return this.exec(`SELECT * FROM \`image\` WHERE entityId = ?;`, [entityId]);
	}

	getDefault(entityId: number) {
		this.throwIfNotSet({ entityId });
		return this.exec(
			`SELECT * FROM \`image\` WHERE entityId = ? and isDefault = true;`,
			[entityId],
		);
	}

	async setDefault(entityId: number, imageId: number) {
		this.throwIfNotSet({ imageId, entityId });

		await this.exec(
			`UPDATE \`image\` SET isDefault=false WHERE entityId=? AND isDefault=true;`,
			[entityId],
		);

		return this.exec(`UPDATE \`image\` SET isDefault=true WHERE id=?;`, [
			imageId,
		]);
	}

	async removeDefault(entityId: number, imageId: number) {
		this.throwIfNotSet({ imageId, entityId });

		return this.exec(
			`UPDATE \`image\` SET isDefault=false WHERE entityId=? AND id=?`,
			[entityId, imageId],
		);
	}

	update(imageId: number, entityId: number, alt: string) {
		this.throwIfNotSet({
			alt,
			imageId,
			entityId,
		});

		return this.exec(`UPDATE \`image\` SET alt=? WHERE id=? AND entityId=?;`, [
			alt,
			imageId,
			entityId,
		]);
	}

	insert(entityId: number, alt: string, filepath: string) {
		this.throwIfNotSet({ entityId, filepath });

		return this.exec(
			`INSERT INTO \`image\` (entityId, filepath, isDefault, alt) VALUES (?, ?, ?, ?);`,
			[entityId, filepath, false, alt || null],
		);
	}

	deleteById(imageId: number, entityId: number) {
		this.throwIfNotSet({
			imageId,
			entityId,
		});

		return this.exec(`Delete FROM \`image\` WHERE id = ? AND entityId = ? `, [
			imageId,
			entityId,
		]);
	}
}
