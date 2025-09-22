export const shortenText = (text = "", numberOfWords = 5) => {
	const trimmedText = text.trim();
	const shortenedText = trimmedText
		.split(" ")
		.slice(0, numberOfWords)
		.join(" ");
	return trimmedText.length > shortenedText.length
		? `${shortenedText}...`
		: shortenedText;
};

export const capitalize = (text = "") => {
	const firstLetter = text[0].toLocaleUpperCase();
	const remainingText = text.substr(1).toLocaleLowerCase();
	return `${firstLetter}${remainingText}`;
};

export const geMetadataValue = (metadata = [], key = "") => {
	const keyMetadata = metadata.filter((data) => data.key === key);

	if (keyMetadata.length === 1) {
		return formatKeyMetadata(keyMetadata[0]);
	}

	if (keyMetadata.length > 1) {
		return keyMetadata.map(formatKeyMetadata);
	}

	return undefined;
};

export const noop = () => {};

export const buildQueryString = (queryValues) => {
	const searchParams = new URLSearchParams();

	for (const key in queryValues) {
		const value = queryValues[key];
		if (value) {
			searchParams.append(key, value);
		}
	}

	return searchParams.toString();
};
