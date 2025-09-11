import { EditEntity, Page } from "@/account";
import type { EntityType } from "@/server";

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
			link: `/account/${entityType}`,
			title: entityType,
		},
		{
			title: "Edit",
		},
	];

	return (
		<Page breadcrumbs={breadcrumbs}>
			<EditEntity entityId={entityId} entityType={entityType} />
		</Page>
	);
}
