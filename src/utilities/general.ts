export const capitalize = (text = "") => {
	const firstLetter = text[0].toLocaleUpperCase();
	const remainingText = text.substr(1).toLocaleLowerCase();
	return `${firstLetter}${remainingText}`;
};

export function throttle<T extends unknown[]>(
	callback: (...args: T) => void,
	delayMs: number,
) {
	let nextExecutionTime = 0;
	return (...args: T) => {
		if (nextExecutionTime < Date.now()) {
			nextExecutionTime = Date.now() + delayMs;
			return callback(...args);
		}
	};
}

export const generateRandomId = () => Math.floor(Math.random() * 1e5);
