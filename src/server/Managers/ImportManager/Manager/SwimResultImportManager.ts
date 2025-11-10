import { access, constants, readFile } from "fs/promises";
import path from "path";
import { PDF_FOLDER } from "@/server/constants/paths";
import type { EntityType } from "@/server/types";
import { type EntityManager, entityManagerFactory } from "../../EntityManager";
import {
	type MetadataManager,
	metadataManagerFactory,
} from "../../MetadataManager";
import {
	type RelatedEntityIdManager,
	relatedEntityIdManagerFactory,
} from "../../RelatedEntityIdManager";
import { BaseImportManager } from "./BaseImportManager";
import { Database } from "./Database";
import type { EventData, MeetData, ResultData } from "./types";

export class SwimResultImportManager extends BaseImportManager {
	dataFolder: string;
	entityType: EntityType = "swimResult";
	swimResultManager: EntityManager;
	swimEventManager: EntityManager;
	swimMeetManager: EntityManager;
	metadataManager: MetadataManager;
	relatedEntityIdManager: RelatedEntityIdManager;
	db: Database;

	constructor() {
		super();

		this.dataFolder = path.join(PDF_FOLDER, this.entityType);
		this.swimResultManager = entityManagerFactory.getInstance("swimResult");
		this.swimEventManager = entityManagerFactory.getInstance("swimEvent");
		this.swimMeetManager = entityManagerFactory.getInstance("swimMeet");
		this.metadataManager = metadataManagerFactory.getInstance();
		this.relatedEntityIdManager = relatedEntityIdManagerFactory.getInstance();

		const dbPath = path.join(PDF_FOLDER, `swimResult/mydb.db`);
		this.db = new Database(dbPath);
	}

	async importJson(fileName: string) {
		const filePath = path.join(this.dataFolder, fileName);
		await access(filePath, constants.R_OK);
		const fileData = await readFile(filePath, "utf8");
		const parsedData = JSON.parse(fileData);
		const { event: meet, results: events } = parsedData;

		let meetId: number | undefined;
		if (meet) {
			meetId = await this.insertSwimMeet(meet);
		}

		if (events?.length) {
			events.forEach((event: EventData) => this.insertSwimEvent(event, meetId));
		}
	}

	async insertSwimMeet(meet: MeetData): Promise<number> {
		if (!meet?.name) {
			throw Error("Swim meet not set");
		}

		const entityType = "swimMeet";
		const entityName = meet.name;
		const existingMeetId = this.db.getByName(entityType, entityName);
		if (existingMeetId) {
			return existingMeetId;
		}

		const { id: meetId } = await this.swimMeetManager.insert({
			name: meet.name,
			description: meet.subtitle,
		});

		this.db.insert(entityType, meetId, entityName);
		await this.metadataManager.insert({
			entityType,
			entityId: meetId,
			rawMetadataArr: [
				{
					name: "startEndDates.startDate",
					value: meet.date,
				},
			],
		});

		return meetId;
	}

	async insertSwimEvent(event: EventData, meetId: number | undefined) {
		if (!event) {
			throw Error("Swim event not set");
		}

		const { event_number, gender, age_group, distance, results } = event;
		const entityType = "swimEvent";
		const entityName = `Event ${event_number}`;
		const existingEventId = this.db.getByName(entityType, entityName);
		if (existingEventId) {
			return existingEventId;
		}

		const { id: eventId } = await this.swimEventManager.insert({
			name: `Event ${event_number}`,
			description: `${distance} ${gender} ${age_group}`,
		});

		this.db.insert(entityType, eventId, entityName);
		await this.metadataManager.insert({
			entityType: "swimEvent",
			entityId: eventId,
			rawMetadataArr: [
				{
					name: "eventNumber",
					value: event_number,
				},
			],
		});

		if (meetId) {
			await this.relatedEntityIdManager.insert({
				entityId: meetId,
				entityType: "swimMeet",
				relatedEntityId: eventId,
				relatedEntityType: "swimEvent",
				relationshipType: "contains",
			});
		}

		if (results?.length) {
			results.forEach((result: ResultData) =>
				this.insertSwimResult(result, eventId),
			);
		}

		return eventId;
	}

	async insertSwimResult(result: ResultData, eventId: number) {
		if (!result) {
			throw Error("Swim result not set");
		}

		const { rank, name, age, team } = result;
		const entityName = `${rank} ${name}`;
		const entityType = "swimResult";
		const existingResultId = this.db.getByName(entityType, entityName);
		if (existingResultId) {
			return existingResultId;
		}

		const { id: resultId } = await this.swimResultManager.insert({
			name: entityName,
			description: `${rank} ${name} ${age}`,
		});

		this.db.insert(entityType, resultId, entityName);
		await this.metadataManager.insert({
			entityType: "swimResult",
			entityId: resultId,
			rawMetadataArr: [
				{
					name: "rank",
					value: rank,
				},
				{
					name: "surname",
					value: name,
				},
				{
					name: "age",
					value: age,
				},
			],
		});

		await this.relatedEntityIdManager.insert({
			entityId: eventId,
			entityType: "swimEvent",
			relatedEntityId: resultId,
			relatedEntityType: "swimResult",
			relationshipType: "contains",
		});

		const swimmerId = await this.insertSwimmer(name, eventId, resultId);
		await this.insertTeam(team, swimmerId, resultId);
	}

	async insertSwimmer(name: string, eventId: number, resultId: number) {
		const entityName = name;
		const entityType = "swimmer";
		let swimmerId = this.db.getByName(entityType, entityName);

		if (!swimmerId) {
			const results = await this.swimResultManager.insert({
				name: entityName,
				description: `swimmer ${entityName}`,
			});

			swimmerId = results.id;
			this.db.insert(entityType, swimmerId, entityName);
		}

		await this.relatedEntityIdManager.insert({
			entityId: swimmerId,
			entityType: "swimmer",
			relatedEntityId: eventId,
			relatedEntityType: "swimEvent",
			relationshipType: "participatedIn",
		});

		await this.relatedEntityIdManager.insert({
			entityId: swimmerId,
			entityType: "swimmer",
			relatedEntityId: resultId,
			relatedEntityType: "swimResult",
			relationshipType: "participatedIn",
		});

		return swimmerId;
	}

	async insertTeam(name: string, swimmerId: number, resultId: number) {
		const entityName = name;
		const entityType = "team";
		let teamId = this.db.getByName(entityType, entityName);

		if (!teamId) {
			const results = await this.swimResultManager.insert({
				name: entityName,
				description: `swimmer ${entityName}`,
			});

			teamId = results.id;
			this.db.insert(entityType, teamId, entityName);
		}

		await this.relatedEntityIdManager.insert({
			entityId: teamId,
			entityType: "team",
			relatedEntityId: swimmerId,
			relatedEntityType: "swimmer",
			relationshipType: "contains",
		});

		await this.relatedEntityIdManager.insert({
			entityId: teamId,
			entityType: "team",
			relatedEntityId: resultId,
			relatedEntityType: "swimResult",
			relationshipType: "participatedIn",
		});
	}
}
