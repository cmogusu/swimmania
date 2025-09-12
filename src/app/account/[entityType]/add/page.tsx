import { AddEntity, Page } from "@/account";
import { EntityTypePlurals } from "@/constants";
import type { EntityType } from "@/server";

type Props = {
	params: Promise<{ entityType: EntityType }>;
};

export default async function AddEntityPage({ params }: Props) {
	const { entityType } = await params;
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
			title: "add",
		},
	];

	return (
		<Page breadcrumbs={breadcrumbs}>
			<AddEntity entityType={entityType} />
		</Page>
	);
}
