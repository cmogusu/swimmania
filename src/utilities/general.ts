export const capitalize = (text = "") => {
	const firstLetter = text[0].toLocaleUpperCase();
	const remainingText = text.substr(1).toLocaleLowerCase();
	return `${firstLetter}${remainingText}`;
};

export const generateRandomId = () => Math.floor(Math.random() * 1e5);
