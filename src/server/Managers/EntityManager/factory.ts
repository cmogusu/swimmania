import { baseEntityFactory } from "@/server/utils";
import { EntityManager } from ".";

export const entityManagerFactory =
	baseEntityFactory<EntityManager>(EntityManager);
