import Play from "@/components/Play/Play";
import { api } from "@/server/api";

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
