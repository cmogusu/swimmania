export const capitalize = (text = "") => {
	const firstLetter = text[0].toLocaleUpperCase();
	const remainingText = text.substr(1).toLocaleLowerCase();
	return `${firstLetter}${remainingText}`;
};

// biome-ignore lint/suspicious/noExplicitAny: Callback should allow all outputs
export function throttle<T extends (...args: any[]) => any>(
	func: T,
	delayMs: number,
): (...args: Parameters<T>) => ReturnType<T> {
	let nextExecutionTime = 0;
	let lastResult: ReturnType<T>;

	return function (
		this: ThisParameterType<T>,
		...args: Parameters<T>
	): ReturnType<T> {
		if (nextExecutionTime < Date.now()) {
			nextExecutionTime = Date.now() + delayMs;
			lastResult = func.apply(this, args);
		}

		return lastResult;
	};
}

export const generateRandomId = () => Math.floor(Math.random() * 1e5);

export const subtractArrays = (arr1: number[], arr2: number[]): number[] => {
	const sortedArr1: number[] = sort(arr1);
	const sortedArr2: number[] = sort(arr2);

	let i = 0;
	let j = 0;
	while (i < sortedArr1.length && j < sortedArr2.length) {
		const id1 = sortedArr1[i];
		const id2 = sortedArr2[j];

		if (id1 === id2) {
			delete sortedArr1[i];
			i += 1;
			j += 1;
		} else if (id1 < id2) {
			i += 1;
		} else {
			j += 1;
		}
	}

	return sortedArr1.filter(Boolean);
};

const sort = (arr: number[]) => arr.slice().sort((v1, v2) => v1 - v2);
