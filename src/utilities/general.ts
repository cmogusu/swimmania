export const capitalize = (text = "") => {
	const firstLetter = text[0].toLocaleUpperCase();
	const remainingText = text.substr(1).toLocaleLowerCase();
	return `${firstLetter}${remainingText}`;
};

// biome-ignore lint/suspicious/noExplicitAny: Callback should allow all outputs
export function throttle<T extends (...args: any[]) => any>(
	func: T,
	delay: number,
): (...args: Parameters<T>) => ReturnType<T> {
	let timeoutId: ReturnType<typeof setTimeout> | null = null;
	let lastArgs: Parameters<T> | null = null;
	let lastThis: ThisParameterType<T> | null = null;
	let lastResult: ReturnType<T>;

	return function (
		this: ThisParameterType<T>,
		...args: Parameters<T>
	): ReturnType<T> {
		lastArgs = args;
		lastThis = this;

		if (!timeoutId) {
			lastResult = func.apply(lastThis, lastArgs);
			timeoutId = setTimeout(() => {
				timeoutId = null;
				if (lastArgs !== null) {
					// If there were calls during the timeout, execute the last one
					lastResult = func.apply(lastThis, lastArgs);
					lastArgs = null;
					lastThis = null;
				}
			}, delay);
		}
		return lastResult;
	};
}

export const generateRandomId = () => Math.floor(Math.random() * 1e5);
