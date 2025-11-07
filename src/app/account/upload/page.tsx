import { ImportEntities } from "@/account/components/ImportEntities";
import { Page } from "@/account/components/Page";

export default async function Home() {
	return (
		<Page>
			<ImportEntities />
		</Page>
	);
}
