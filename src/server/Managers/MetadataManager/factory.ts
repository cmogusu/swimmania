import { baseEntityFactory } from "@/server/utils";
import { MetadataManager } from "./Manager";

export const metadataManagerFactory =
	baseEntityFactory<MetadataManager>(MetadataManager);
