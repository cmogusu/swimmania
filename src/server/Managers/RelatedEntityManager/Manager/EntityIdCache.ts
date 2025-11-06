// TODO: Move this into bulk import manager. Not needed for normal related entity use

// Basic implementation of in-memory cache. This is a temporary solution and should be replaced with a better solution.
export class EntityIdCache {
	store: Record<string, number> = {};

	has(entityType: string, name: string): boolean {
		const cacheKey = this.getKey(entityType, name);
		return cacheKey in this.store;
	}

	get(entityType: string, name: string): number {
		const cacheKey = this.getKey(entityType, name);
		return this.store[cacheKey];
	}

	set(entityType: string, name: string, entityId: number) {
		const cacheKey = this.getKey(entityType, name);
		this.store[cacheKey] = entityId;
	}

	clear(entityType: string, name: string) {
		const cacheKey = this.getKey(entityType, name);
		delete this.store[cacheKey];
	}

	getKey(entityType: string, name: string) {
		return `${entityType}:${name}`;
	}
}
