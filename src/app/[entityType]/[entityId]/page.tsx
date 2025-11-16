import { EntityPage, PageLayout } from "@/components/Pages";
import { api } from "@/server/api";
import type { EntityType } from "@/server/types";

type Props = {
	params: Promise<{ entityId: number; entityType: EntityType }>;
};

export default async function Page({ params }: Props) {
	const { entityId, entityType } = await params;
	const entity = await api.getEntity(entityType, entityId);

	return (
		<PageLayout>
			<EntityPage entity={entity} entityType={entityType} />
		</PageLayout>
	);
}
