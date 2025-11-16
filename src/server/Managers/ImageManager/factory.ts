import { baseEntityFactory } from "@/server/utils";
import { ImageManager } from "./Manager";

export const imageManagerFactory =
	baseEntityFactory<ImageManager>(ImageManager);
