import type { EntitiesData, EntityType } from "@/server/types";
import { PageLayoutContainer } from "./PageLayoutContainer";
import { PageLayoutContent } from "./PageLayoutContent";

type Props = {
	entityType: EntityType;
	entitiesData: EntitiesData;
};

export default function PageLayout({ entityType, entitiesData }: Props) {
	return (
		<PageLayoutContainer entitiesData={entitiesData} entityType={entityType}>
			<PageLayoutContent entitiesData={entitiesData} entityType={entityType} />
		</PageLayoutContainer>
	);
}
