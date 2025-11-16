import { EntityDrawerContainer } from "@/components/EntityDrawer";
import { PageLayout } from "@/components/Pages";
import { EntitiesPage } from "@/components/Pages/EntitiesPage";
import {
	ApiContextProvider,
	EntitiesContextProvider,
	EntityDrawerContextProvider,
	SelectedEntityContextProvider,
	VisibleEntityIdsContextProvider,
} from "@/context";
import { api } from "@/server/api";
import { getApiKeys } from "@/server/serverFunctions";

type Props = {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: Props) {
	const { page = 1 } = await searchParams;

	const entityType = "lifeguard";
	const entitiesData = await api.getEntities(entityType, Number(page));
	if (!entitiesData) {
		return "Oops! No data found";
	}

	return (
		<EntitiesContextProvider
			entitiesData={entitiesData}
			entityType={entityType}
		>
			<SelectedEntityContextProvider>
				<VisibleEntityIdsContextProvider>
					<EntityDrawerContextProvider>
						<ApiContextProvider getApiKeys={getApiKeys}>
							<EntityDrawerContainer>
								<PageLayout>
									<EntitiesPage
										entitiesData={entitiesData}
										entityType={entityType}
									/>
								</PageLayout>
							</EntityDrawerContainer>
						</ApiContextProvider>
					</EntityDrawerContextProvider>
				</VisibleEntityIdsContextProvider>
			</SelectedEntityContextProvider>
		</EntitiesContextProvider>
	);
}
