import { Entities, Page } from "@/account";
import type { EntityType } from "@/server";
import { EntityTypePlurals } from "@/server";

type Props = {
	params: Promise<{ entityType: EntityType }>;
};

export default async function EntitiesPage({ params }: Props) {
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
			title: EntityTypePlurals[entityType],
		},
	];

	return (
		<Page breadcrumbs={breadcrumbs}>
			<Entities entityType={entityType} />
		</Page>
	);
}
