import { Page, Section1, Section2 } from "@/front";
import { EntityDrawerContainer } from "@/front/components/EntityDrawer/";
import {
	EntitiesContextProvider,
	EntityDrawerContextProvider,
	EntityScrollObserverContextProvider,
	SelectedEntityContextProvider,
} from "@/front/context";
import { api } from "@/server";

type Props = {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: Props) {
	const { page = 1 } = await searchParams;

	const entityType = "pool";
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
