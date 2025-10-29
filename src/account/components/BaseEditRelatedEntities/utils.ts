import type { EntityData } from "@/server/types";

export const getNonRelatedEntities = (
	unsortedEntities: EntityData[] | undefined,
	unsortedRelatedEntities: EntityData[] | undefined,
) => {
	if (!unsortedEntities?.length) {
		return [];
	}

	if (!unsortedRelatedEntities?.length) {
		return unsortedEntities;
	}

	const nonRelatedEntities = sort(unsortedEntities);
	const relatedEntities = sort(unsortedRelatedEntities);

	let i = 0;
	let j = 0;
	while (i < nonRelatedEntities.length && j < relatedEntities.length) {
		const nonRelatedId = nonRelatedEntities[i].id;
		const relatedId = relatedEntities[j].id;

		if (nonRelatedId === relatedId) {
			delete nonRelatedEntities[i];
			i += 1;
			j += 1;
		} else if (nonRelatedId < relatedId) {
			i += 1;
		} else {
			j += 1;
		}
	}

	return nonRelatedEntities.filter(Boolean);
};

const sort = (entities: EntityData[]) =>
	entities.slice().sort((e1, e2) => e1.id - e2.id);
