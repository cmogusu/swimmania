import { Entities, Page } from "@/profile";
import type { EntityType } from "@/server";

type Props = {
	params: Promise<{ entityType: EntityType }>;
};

export default async function Category({ params }: Props) {
	const { entityType } = await params;

	return (
		<Page>
			<Entities entityType={entityType} />
		</Page>
	);
}
