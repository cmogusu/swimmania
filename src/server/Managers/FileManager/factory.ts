import { baseEntityFactory } from "@/server/utils";
import { FileManager } from "./Manager";

export const fileManagerFactory = baseEntityFactory<FileManager>(FileManager);
