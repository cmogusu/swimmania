import { RelatedEntityManager } from "./RelatedEntityManager";

export const relatedEntityManagerFactory = {
	manager: undefined as RelatedEntityManager | undefined,

	getInstance() {
		if (!this.manager) {
			this.manager = new RelatedEntityManager();
		}

		return this.manager;
	},
};
