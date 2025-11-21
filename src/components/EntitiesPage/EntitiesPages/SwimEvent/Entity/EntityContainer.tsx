"use client";

import type { PropsWithChildren } from "react";
import type { EntityData } from "@/server/types";
import { EntityContent } from "./EntityContent";

type Props = PropsWithChildren & {
	entity: EntityData;
	itemPosition: number;
};

export const EntityContainer = ({ entity, itemPosition }: Props) => {
	return <EntityContent entity={entity} itemPosition={itemPosition} />;
};
