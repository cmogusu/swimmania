import { Entities } from "@/components/Entities";
import { EntitiesMap } from "@/components/EntitiesMap";
import { EntityLocationContextProvider } from "@/context";
import type { EntitiesData, EntityType } from "@/server/types";

type Props = {
	entityType: EntityType;
	entitiesData: EntitiesData;
};

export const EntitiesPage = ({ entityType, entitiesData }: Props) => (
	<EntityLocationContextProvider>
		<section className="md:container mx-auto grid grid-cols-2 gap-4 w-full">
			<div className="col-start-1 col-end-2 ">
				<Entities entityType={entityType} entitiesData={entitiesData} />
			</div>
			<div className="col-start-2 col-end-3 relative">
				<EntitiesMap />
			</div>
		</section>
	</EntityLocationContextProvider>
);
