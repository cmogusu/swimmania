// import { EntitiesMap } from "@/components/EntitiesMap";
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
					<div className="md:container mx-auto grid grid-cols-2 gap-4 w-full">
						<main className="col-start-1 col-end-2 ">
							<Entities entityType={entityType} entitiesData={entitiesData} />
						</main>
						<div className="col-start-2 col-end-3 relative">
							<div className="sticky top-0">
								<div className="h-dvh bg-amber-500">
									{/* <EntitiesMap /> */}
								</div>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</EntityDrawer>
	);
};
