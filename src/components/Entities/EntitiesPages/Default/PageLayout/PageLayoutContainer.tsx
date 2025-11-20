"use client";

import type { PropsWithChildren } from "react";
import {
	EntitiesContextProvider,
	EntityDrawerContextProvider,
	EntityLocationContextProvider,
	SelectedEntityContextProvider,
	VisibleEntityIdsContextProvider,
} from "@/context";
import type { EntitiesData, EntityType } from "@/server/types";
import { Entities } from "../Entities";

type Props = PropsWithChildren & {
	entityType: EntityType;
	entitiesData: EntitiesData;
};

export const PageLayoutContainer = ({ entityType, entitiesData }: Props) => {
	return (
		<EntitiesContextProvider
			entitiesData={entitiesData}
			entityType={entityType}
		>
			<SelectedEntityContextProvider>
				<EntityDrawerContextProvider>
					<VisibleEntityIdsContextProvider>
						<EntityLocationContextProvider>
							<Entities entityType={entityType} entitiesData={entitiesData} />
						</EntityLocationContextProvider>
					</VisibleEntityIdsContextProvider>
				</EntityDrawerContextProvider>
			</SelectedEntityContextProvider>
		</EntitiesContextProvider>
	);
};
