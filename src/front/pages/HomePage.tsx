import type { EntitiesData, EntityType } from "@/server/types";
import { AppProfiler } from "../components/AppProfiler";
import { Entities } from "../components/Entities";
import { MapItem } from "../components/MapItem";

type Props = {
	entityType: EntityType;
	entitiesData: EntitiesData;
};

export const HomePage = ({ entityType, entitiesData }: Props) => (
	<AppProfiler>
		<section className="md:container mx-auto grid grid-cols-2 gap-4 w-full">
			<div className="col-start-1 col-end-2 ">
				<Entities entityType={entityType} entitiesData={entitiesData} />
			</div>
			<div className="col-start-2 col-end-3 relative">
				<div className="sticky top-4">
					<MapItem />
				</div>
			</div>
		</section>
	</AppProfiler>
);
