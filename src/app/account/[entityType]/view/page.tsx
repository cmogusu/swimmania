import { Entities } from "@/account/components/Entities";
import { Page } from "@/account/components/Page";
import { EntityTypePlurals } from "@/server/constants";
import type { EntityType } from "@/server/types";

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
