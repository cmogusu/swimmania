import { Entity, Page } from "@/account";
import type { EntityType } from "@/server";

type Props = {
	params: Promise<{ entityId: number; entityType: EntityType }>;
};

export default async function EntityPage({ params }: Props) {
	const { entityId, entityType } = await params;
	const breadcrumbs = [
		{
			link: "/",
			title: "Home",
		},
		{
			link: "/account",
			title: "My account",
		},
		{
			title: entityType,
		},
	];

	return (
		<Page breadcrumbs={breadcrumbs}>
			<Entity entityId={entityId} entityType={entityType} />
		</Page>
	);
}
