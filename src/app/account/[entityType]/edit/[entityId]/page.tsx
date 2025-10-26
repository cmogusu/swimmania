import { EditEntity, Page } from "@/account";
import { EntityTypePlurals } from "@/server/constants";
import type { EntityType } from "@/server/types";

type Props = {
	params: Promise<{ entityId: number; entityType: EntityType }>;
};

export default async function EditEntityPage({ params }: Props) {
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
			title: "edit",
		},
		{
			title: `${entityId}`,
		},
	];

	return (
		<Page breadcrumbs={breadcrumbs}>
			<EditEntity entityId={entityId} entityType={entityType} />
		</Page>
	);
}
