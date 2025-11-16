import { baseEntityFactory } from "@/server/utils";
import { UserManager } from "./Manager";

export const userManagerFactory = baseEntityFactory<UserManager>(UserManager);
