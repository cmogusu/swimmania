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
	classesRecord: Record<U, new (args: unknown[]) => T>,
) {
	const instances: Record<string, T> = {};

	return {
		instances,
		getInstance(entityType: U, ...args: unknown[]): T {
			if (!entityType) {
				throw Error("Entity type not set");
			}

			if (!((entityType as string) in classesRecord)) {
				throw Error("Entity type import not supported");
			}

			if (!this.instances[entityType]) {
				const InitializerClass = classesRecord[entityType];
				// @ts-ignore
				this.instances[entityType] = new InitializerClass(...args);
			}

			return this.instances[entityType];
		},
	};
}
