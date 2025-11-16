import { baseEntityFactory } from "@/server/utils";
import { RelatedEntityManager } from "./Manager";

export const relatedEntityManagerFactory =
	baseEntityFactory<RelatedEntityManager>(RelatedEntityManager);
