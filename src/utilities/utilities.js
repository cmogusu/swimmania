const isFunction = (func) => typeof func === "function";

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

const formatKeyMetadata = (singleMetadata) => {
	const { value, type } = singleMetadata;

	if (type === "number" && isNaN(parseFloat(value))) {
		return parseFloat(value);
	}

	if (type === "boolean" && ['true', 'false'].includes(value)) {
		return value === "true" ? true : false;
	}

	return value;
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

export const splitUrl = () => {
	// eslint-disable-next-line no-undef
	const pathName = global.location?.pathname || "";
	const splitPathName = pathName
		.split("/")
		.filter((v) => !!v && !["add", "edit"].includes(v));
	const [entityType, entityId, relatedEntityType, relatedEntityId] =
		splitPathName;

	return {
		entityType,
		entityId,
		relatedEntityType,
		relatedEntityId,
	};
};

export const useGetEntityId = (obj) => {
	const { entityId } = obj;
	return entityId;
};

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
