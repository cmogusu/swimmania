import dynamic from "next/dynamic";
import { api } from "@/server/api";

const Play = dynamic(() => import("@/components/Play/Play"));

export default async function ExpPage() {
	const entityType = "pool";
	const entitiesData = await api.getEntities(entityType, 1);

	if (!entitiesData) {
		return "loading";
	}

	return (
		<div>
			<Play entityType={entityType} entitiesData={entitiesData} />
		</div>
	);
}
