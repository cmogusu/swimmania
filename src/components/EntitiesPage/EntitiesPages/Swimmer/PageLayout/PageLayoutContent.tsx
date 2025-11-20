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
				<div>
					<div className="md:container mx-auto grid grid-cols-4 gap-4 w-full">
						<div className="col-start-1 col-end-2 relative">
							<div className="sticky top-0">
								<div className="h-dvh bg-amber-500"></div>
							</div>
						</div>
						<main className="col-start-2 col-end-5 ">
							<Entities entityType={entityType} entitiesData={entitiesData} />
						</main>
					</div>
				</div>
				<Footer />
			</div>
		</EntityDrawer>
	);
};
