export function baseEntityFactory<T>(InitializerClass: new () => T) {
	let instance: T | undefined;

	return {
		instance,
		getInstance(): T {
			if (!this.instance) {
				this.instance = new InitializerClass();
			}

			return this.instance;
		},
	};
}

export function baseEntityClassFactory<U extends string, T>(
	classesRecord: Record<U, new () => T>,
) {
	const instances: Record<string, T> = {};

	return {
		instances,
		getInstance(entityType: U): T {
			if (!entityType) {
				throw Error("Entity type not set");
			}

			if (!((entityType as string) in classesRecord)) {
				throw Error("Entity type import not supported");
			}

			if (!this.instances[entityType]) {
				const InitializerClass = classesRecord[entityType];
				this.instances[entityType] = new InitializerClass();
			}

			return this.instances[entityType];
		},
	};
}
