import type { EntityData, EntityType, ImageData } from "@/server/types";
import { formatMetadataFromDb } from "../../MetadataManager/Manager/utils";
import { BaseDatabase } from "../../services/BaseDatabase";
import type {
	GetEntitiesInputData,
	GetMeetResultsInputData,
} from "../InputData";
import type { RawDbEntities } from "../types";
import { Query } from "./Query";

export class Database extends BaseDatabase {
	metadataDelimiter: string = ";";
	metadataNameValueDelimiter: string = ":";

	query: Query;

	constructor() {
		super();
		this.query = new Query();
	}

	async getEntities(
		entityType: EntityType,
		inputData: GetEntitiesInputData,
	): Promise<EntityData[]> {
		const [rawEntitiesContainer] = await this.query.getEntities(
			entityType,
			inputData.pageSize,
			inputData.offset,
		);

		// @ts-ignore
		const [rawEntities] = rawEntitiesContainer || [];
		return (rawEntities as RawDbEntities[]).map((rawEntity) =>
			this.formatFromDb(entityType, rawEntity),
		);
	}

	async getMeetResults(
		entityType: EntityType,
		inputData: GetMeetResultsInputData,
	): Promise<EntityData[]> {
		const [rawEntitiesContainer] = await this.query.getMeetResults(
			inputData.meetId,
		);

		// @ts-ignore
		const [meetData, meetResuls] = rawEntitiesContainer || [];
		return (meetResuls as RawDbEntities[]).map((rawEntity) =>
			this.formatFromDb(entityType, rawEntity),
		);
	}

	formatFromDb(
		entityType: EntityType,
		rawEntitiesData: RawDbEntities,
	): EntityData {
		const {
			id: entityId,
			entityName,
			entityDescription,
			imageAlt,
			imageFilePath,
			...metadata
		} = rawEntitiesData;

		const defaultImage: ImageData | undefined = imageFilePath
			? {
					id: -1,
					alt: imageAlt || "",
					src: imageFilePath,
					isDefault: true,
				}
			: undefined;

		const entity: EntityData = {
			entityId,
			entityType,
			name: entityName,
			description: entityDescription,
			defaultImage,
			metadata: formatMetadataFromDb(metadata),
		};

		return entity;
	}
}
