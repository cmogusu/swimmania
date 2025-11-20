"use client";

import type { PropsWithChildren } from "react";
import {
	EntitiesContextProvider,
	EntityDrawerContextProvider,
	EntityLocationContextProvider,
	EntityVisibilityNotifierContextProvider,
	SelectedEntityContextProvider,
	VisibleEntityIdsContextProvider,
} from "@/context";
import type { EntitiesData, EntityType } from "@/server/types";
import { PageLayoutContent } from "./PageLayoutContent";

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
						<EntityVisibilityNotifierContextProvider>
							<EntityLocationContextProvider>
								<PageLayoutContent
									entityType={entityType}
									entitiesData={entitiesData}
								/>
							</EntityLocationContextProvider>
						</EntityVisibilityNotifierContextProvider>
					</VisibleEntityIdsContextProvider>
				</EntityDrawerContextProvider>
			</SelectedEntityContextProvider>
		</EntitiesContextProvider>
	);
};
