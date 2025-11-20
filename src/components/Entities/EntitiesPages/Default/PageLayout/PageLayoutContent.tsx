import { EntityDrawer } from "@/components/EntityDrawer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { EntitiesData, EntityType } from "@/server/types";
import { Entities } from "../Entities";

type Props = {
	entityType: EntityType;
	entitiesData: EntitiesData;
};

export const PageLayoutContent = ({ entityType, entitiesData }: Props) => {
	return (
		<EntityDrawer>
			<div className="grid page-grid-rows h-screen">
				<Header />
				<main>
					<Entities entityType={entityType} entitiesData={entitiesData} />
				</main>
				<Footer />
			</div>
		</EntityDrawer>
	);
};
