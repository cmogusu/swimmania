import type { Metadata } from "next";
import { Page, Section1, Section2 } from "@/front";
import { EntityDrawerContainer } from "@/front/components/EntityDrawer/";
import {
	EntitiesContextProvider,
	EntityDrawerContextProvider,
	EntityScrollObserverContextProvider,
	SelectedEntityContextProvider,
} from "@/front/context";
import { api, type EntityType, EntityTypePlurals } from "@/server";

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

	return (
		<EntitiesContextProvider
			entitiesData={entitiesData}
			entityType={entityType}
		>
			<SelectedEntityContextProvider>
				<EntityScrollObserverContextProvider>
					<EntityDrawerContextProvider>
						<EntityDrawerContainer>
							<Page>
								<Section1 />
								<Section2 entityType={entityType} entitiesData={entitiesData} />
							</Page>
						</EntityDrawerContainer>
					</EntityDrawerContextProvider>
				</EntityScrollObserverContextProvider>
			</SelectedEntityContextProvider>
		</EntitiesContextProvider>
	);
}
