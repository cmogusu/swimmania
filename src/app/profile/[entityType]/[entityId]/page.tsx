import { Entity, Page } from "@/profile";
import type { EntityType } from "@/server";

type Props = {
	params: Promise<{ entityId: number; entityType: EntityType }>;
};

export default async function Category({ params }: Props) {
	const { entityId, entityType } = await params;
	console.log(entityId, entityType);

	return (
		<Page>
			<Entity entityId={entityId} entityType={entityType} />
		</Page>
	);
}
