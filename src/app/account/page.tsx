import { Entities } from "@/account/components/Entities";
import { Page } from "@/account/components/Page";

export default async function Home() {
	const entityType = "pool";

	return (
		<Page>
			<Entities entityType={entityType} />
		</Page>
	);
}
