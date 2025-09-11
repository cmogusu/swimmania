import { Entities, Page } from "@/profile";

export default async function Home() {
	const entityType = "pool";

	return (
		<Page>
			<Entities entityType={entityType} />
		</Page>
	);
}
