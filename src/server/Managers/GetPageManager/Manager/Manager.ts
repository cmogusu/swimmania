import type { EntitiesData, EntityData, IPaginated } from "@/server/types";
import { type ImageManager, imageManagerFactory } from "../../ImageManager";
import {
	type MetadataManager,
	metadataManagerFactory,
} from "../../MetadataManager";
import {
	type RelatedEntityIdManager,
	relatedEntityIdManagerFactory,
} from "../../RelatedEntityIdManager";
import { type UserManager, userManagerFactory } from "../../UserManager";
import { GetEntitiesInputData, GetMeetResultsInputData } from "../InputData";
import type { RawGetEntitiesInputs, RawGetMeetResultsInputs } from "../types";
import { Database } from "./Database";

export class GetPageManager {
	db: Database;

	imageManager: ImageManager;
	metadataManager: MetadataManager;
	userManager: UserManager;
	relatedEntityIdManager: RelatedEntityIdManager;

	constructor() {
		this.db = new Database();
		this.imageManager = imageManagerFactory.getInstance();
		this.metadataManager = metadataManagerFactory.getInstance();
		this.userManager = userManagerFactory.getInstance();
		this.relatedEntityIdManager = relatedEntityIdManagerFactory.getInstance();
	}

	async getEntities(rawInputs: RawGetEntitiesInputs): Promise<EntitiesData> {
		const inputData = new GetEntitiesInputData(rawInputs);
		inputData.validateData();

		const rawEntities = await this.db.getEntities(
			rawInputs.entityType,
			inputData,
		);

		return this.addPaginationData(rawEntities, inputData);
	}

	async getMeetResults(
		rawInputs: RawGetMeetResultsInputs,
	): Promise<EntityData[]> {
		const inputData = new GetMeetResultsInputData(rawInputs);
		inputData.validateData();

		return await this.db.getMeetResults("swimMeet", inputData);
	}

	addPaginationData(
		rawEntities: EntityData[],
		paginationData: IPaginated,
	): EntitiesData {
		const nextPage = paginationData.pageNumber + 1;
		const pageSize = paginationData.pageSize - 1;
		const hasMore = rawEntities?.length > pageSize;
		return {
			entities: rawEntities.slice(0, pageSize),
			pageSize,
			hasMore,
			nextPage,
		};
	}
}
