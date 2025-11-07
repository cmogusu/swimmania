import { Entities } from "@/account/components/Entities";
import { Page } from "@/account/components/Page";
import { EntityTypePlurals } from "@/server/constants";
import type { EntityType } from "@/server/types";

type Props = {
	params: Promise<{ entityType: EntityType }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function EntitiesPage({ params, searchParams }: Props) {
	const { entityType } = await params;
	const { page = 1 } = await searchParams;
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
			<Entities entityType={entityType} pageNumber={page as number} />
		</Page>
	);
}
