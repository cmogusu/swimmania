import { Entities, Page } from "@/account";

export default async function Home() {
	const entityType = "pool";

	return (
		<Page>
			<Entities entityType={entityType} />
		</Page>
	);
}
