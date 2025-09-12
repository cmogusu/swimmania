import { Entity, Page } from "@/account";
import { EntityTypePlurals } from "@/constants";
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
			link: `/account/${entityType}/view`,
			title: EntityTypePlurals[entityType],
		},
		{
			title: "view",
		},
		{
			title: `${entityId}`,
		},
	];

	return (
		<Page breadcrumbs={breadcrumbs}>
			<Entity entityId={entityId} entityType={entityType} />
		</Page>
	);
}
