import { baseEntityFactory } from "@/server/utils";
import { RelatedEntityIdManager } from "./Manager";

export const relatedEntityIdManagerFactory =
	baseEntityFactory<RelatedEntityIdManager>(RelatedEntityIdManager);
