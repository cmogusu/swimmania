// Basic implementation of in-memory cache. This is a temporary solution and should be replaced with a better solution.
export class LruCache<T> {
	store: Record<string, T> = {};

	has(cacheKey: string) {
		return cacheKey in this.store;
	}

	get(cacheKey: string) {
		return this.store[cacheKey];
	}

	set(cacheKey: string, value: T) {
		this.store[cacheKey] = value;
	}
}
