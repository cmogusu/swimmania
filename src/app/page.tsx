import { ApiContextProvider } from "@/context";
import { AppProfiler } from "@/front/components/AppProfiler/AppProfiler";
import { EntityDrawerContainer } from "@/front/components/EntityDrawer/";
import {
	EntitiesContextProvider,
	EntityDrawerContextProvider,
	SelectedEntityContextProvider,
	VisibleEntityIdsContextProvider,
} from "@/front/context";
import { HomePage, PageLayout } from "@/front/pages";
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
		<AppProfiler>
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
										<HomePage
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
		</AppProfiler>
	);
}
