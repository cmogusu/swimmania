import { Profiler } from "react";
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

const appId = "swimmania-frontend";
const logProfileInfo = (
	id: string,
	phase: "mount" | "update" | "nested-update",
	actualDuration: number,
	baseDuration: number,
	startTimestamp: number,
	commitTimestamp: number,
) => {
	console.log(
		id,
		phase,
		actualDuration,
		baseDuration,
		startTimestamp,
		commitTimestamp,
	);
};

export default async function Home({ searchParams }: Props) {
	const { page = 1 } = await searchParams;

	const entityType = "pool";
	const entitiesData = await api.getEntities(entityType, Number(page));

	return (
		<Profiler id={appId} onRender={logProfileInfo}>
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
									<Section2
										entityType={entityType}
										entitiesData={entitiesData}
									/>
								</Page>
							</EntityDrawerContainer>
						</EntityDrawerContextProvider>
					</EntityScrollObserverContextProvider>
				</SelectedEntityContextProvider>
			</EntitiesContextProvider>
		</Profiler>
	);
}
