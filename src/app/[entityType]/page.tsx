import type { Metadata } from "next";
import { EntityDrawerContainer } from "@/components/EntityDrawer";
import {
	EntitiesContextProvider,
	EntityDrawerContextProvider,
	SelectedEntityContextProvider,
	VisibleEntityIdsContextProvider,
} from "@/context";
import { EntitiesPage, PageLayout } from "@/pageComponents";
import { api } from "@/server/api";
import { EntityTypePlurals } from "@/server/constants";
import type { EntityType } from "@/server/types";

type Props = {
	params: Promise<{ entityType: EntityType }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { entityType } = await params;

	return {
		title: EntityTypePlurals[entityType],
	};
}

export default async function Home({ params, searchParams }: Props) {
	const { entityType } = await params;
	const { page = 1 } = await searchParams;
	const entitiesData = await api.getEntities(entityType, Number(page));

	if (!entitiesData) {
		return "Ooops! No entities found";
	}

	return (
		<EntitiesContextProvider
			entitiesData={entitiesData}
			entityType={entityType}
		>
			<SelectedEntityContextProvider>
				<VisibleEntityIdsContextProvider>
					<EntityDrawerContextProvider>
						<EntityDrawerContainer>
							<PageLayout>
								<EntitiesPage
									entitiesData={entitiesData}
									entityType={entityType}
								/>
							</PageLayout>
						</EntityDrawerContainer>
					</EntityDrawerContextProvider>
				</VisibleEntityIdsContextProvider>
			</SelectedEntityContextProvider>
		</EntitiesContextProvider>
	);
}
