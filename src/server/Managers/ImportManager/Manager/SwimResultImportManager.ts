import { access, constants, readFile } from "node:fs/promises";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
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
import { SwimEventParser, SwimMeetParser } from "../FileParsers";
import { TempEntityDatabase } from "../TempEntityDatabase";
import { tempEntityDatabaseFactory } from "../TempEntityDatabase/factory";
import type { ITempRawEntityDatabase } from "../types";
import { BaseImportManager } from "./BaseImportManager";
import type {
	EventData,
	MeetData,
	RawFileNameImportInputs,
	ResultData,
} from "./types";

export class SwimResultImportManager extends BaseImportManager {
	dataFolder: string;
	entityType: EntityType = "swimResult";
	entityManager: EntityManager;
	metadataManager: MetadataManager;
	relatedEntityIdManager: RelatedEntityIdManager;

	tempDb: TempEntityDatabase;
	tempSwimEventDb: ITempRawEntityDatabase;
	tempSwimMeetDb: ITempRawEntityDatabase;

	constructor() {
		super();

		this.dataFolder = path.join(PDF_FOLDER, this.entityType);
		this.entityManager = entityManagerFactory.getInstance();
		this.metadataManager = metadataManagerFactory.getInstance();
		this.relatedEntityIdManager = relatedEntityIdManagerFactory.getInstance();

		const dbPath = path.join(PDF_FOLDER, `swimResult/mydb.db`);
		const db = new DatabaseSync(dbPath);
		this.tempDb = new TempEntityDatabase(db);
		this.tempSwimMeetDb = tempEntityDatabaseFactory.getInstance("swimMeet", db);
		this.tempSwimEventDb = tempEntityDatabaseFactory.getInstance(
			"swimEvent",
			db,
		);
	}

	async importText(text: string) {
		const swimEventParser = new SwimEventParser();
		swimEventParser.parse(text);
		swimEventParser.on("data", this.tempSwimEventDb.insertRawData);

		const swimMeetParser = new SwimMeetParser();
		swimMeetParser.parse(text);
		swimMeetParser.on("data", this.tempSwimMeetDb.insertRawData);
	}

	async importJson({ fileName }: RawFileNameImportInputs) {
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
		const existingMeetId = this.tempDb.getByName(entityType, entityName);
		if (existingMeetId) {
			return existingMeetId;
		}

		const { id: meetId } = await this.entityManager.insert({
			entityType,
			name: meet.name,
			description: meet.subtitle,
		});

		this.tempDb.insert(entityType, meetId, entityName);
		await this.metadataManager.upsert({
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
		const existingEventId = this.tempDb.getByName(entityType, entityName);
		if (existingEventId) {
			return existingEventId;
		}

		const { id: eventId } = await this.entityManager.insert({
			entityType,
			name: `Event ${event_number}`,
			description: `${distance} ${gender} ${age_group}`,
		});

		this.tempDb.insert(entityType, eventId, entityName);
		await this.metadataManager.upsert({
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
			await this.relatedEntityIdManager.upsert({
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
		const existingResultId = this.tempDb.getByName(entityType, entityName);
		if (existingResultId) {
			return existingResultId;
		}

		const { id: resultId } = await this.entityManager.insert({
			entityType,
			name: entityName,
			description: `${rank} ${name} ${age}`,
		});

		this.tempDb.insert(entityType, resultId, entityName);
		await this.metadataManager.upsert({
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

		await this.relatedEntityIdManager.upsert({
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
		let swimmerId = this.tempDb.getByName(entityType, entityName);

		if (!swimmerId) {
			const results = await this.entityManager.insert({
				entityType,
				name: entityName,
				description: `swimmer ${entityName}`,
			});

			swimmerId = results.id;
			this.tempDb.insert(entityType, swimmerId, entityName);
		}

		await this.relatedEntityIdManager.upsert({
			entityId: swimmerId,
			entityType: "swimmer",
			relatedEntityId: eventId,
			relatedEntityType: "swimEvent",
			relationshipType: "participatedIn",
		});

		await this.relatedEntityIdManager.upsert({
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
		let teamId: number = this.tempDb.getByName(entityType, entityName);

		if (!teamId) {
			const results = await this.entityManager.insert({
				entityType,
				name: entityName,
				description: `swimmer ${entityName}`,
			});

			teamId = results.id;
			this.tempDb.insert(entityType, teamId, entityName);
		}

		await this.relatedEntityIdManager.upsert({
			entityId: teamId,
			entityType: "team",
			relatedEntityId: swimmerId,
			relatedEntityType: "swimmer",
			relationshipType: "contains",
		});

		await this.relatedEntityIdManager.upsert({
			entityId: teamId,
			entityType: "team",
			relatedEntityId: resultId,
			relatedEntityType: "swimResult",
			relationshipType: "participatedIn",
		});
	}
}
