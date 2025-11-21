"use client";

import type { PropsWithChildren } from "react";
import type { EntityData } from "@/server/types";
import { EntityContent } from "./EntityContent";

type Props = PropsWithChildren & {
	entity: EntityData;
};

export const EntityContainer = ({ entity }: Props) => {
	return <EntityContent entity={entity} />;
};
