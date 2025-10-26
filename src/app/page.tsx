import { AppProfiler } from "@/front/components/AppProfiler/AppProfiler";
import { EntityDrawerContainer } from "@/front/components/EntityDrawer/";
import {
	EntitiesContextProvider,
	EntityDrawerContextProvider,
	EntityScrollObserverContextProvider,
	SelectedEntityContextProvider,
} from "@/front/context";
import { HomePage, PageLayout } from "@/front/pages";
import { api } from "@/server/api";

type Props = {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Home({ searchParams }: Props) {
	const { page = 1 } = await searchParams;

	const entityType = "pool";
	const entitiesData = await api.getEntities(entityType, Number(page));

	return (
		<AppProfiler>
			<EntitiesContextProvider
				entitiesData={entitiesData}
				entityType={entityType}
			>
				<SelectedEntityContextProvider>
					<EntityScrollObserverContextProvider>
						<EntityDrawerContextProvider>
							<EntityDrawerContainer>
								<PageLayout>
									<HomePage
										entitiesData={entitiesData}
										entityType={entityType}
									/>
								</PageLayout>
							</EntityDrawerContainer>
						</EntityDrawerContextProvider>
					</EntityScrollObserverContextProvider>
				</SelectedEntityContextProvider>
			</EntitiesContextProvider>
		</AppProfiler>
	);
}
