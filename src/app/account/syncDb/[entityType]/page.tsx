import { revalidatePath } from "next/cache";
import { Page } from "@/account";
import { EntitiesNavBar } from "@/account/components/Header";
import { metadataManagerFactory } from "@/server/Managers";
import type { EntityType } from "@/server/types";

type Props = {
	params: Promise<{ entityType: EntityType }>;
};

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
		title: "Sync Metadata tables",
	},
];

export default async function SyncMetadataTables({ params }: Props) {
	const { entityType } = await params;
	const metadataManager = metadataManagerFactory.getInstance();
	const dbColumns = await metadataManager.getDbTableColumnNames(entityType);

	return (
		<Page breadcrumbs={breadcrumbs}>
			<div className="mb-4">
				<EntitiesNavBar entityType={entityType} baseUrl="/account/syncDb" />

				<h2 className="mb-2">{entityType}</h2>
				<table className="w-100">
					<thead>
						<tr className="text-2xl">
							<td>Schema columns</td>
							<td>Database columns</td>
						</tr>
					</thead>
					<tbody>
						{dbColumns.map((column) => (
							<tr key={column.schemaTableName}>
								<td className="p-2">{column.schemaTableName}</td>
								<td className="p-2">{column.dbTableName}</td>
							</tr>
						))}
					</tbody>
				</table>
				<form action={syncDb}>
					<input type="hidden" name="entityType" value={entityType} />
					<button className="btn btn-lg btn-primary" type="submit">
						sync db
					</button>
				</form>
			</div>
		</Page>
	);
}

async function syncDb(formData: FormData) {
	"use server";
	const entityType = formData.get("entityType") as EntityType;
	const metadataManager = metadataManagerFactory.getInstance();
	await metadataManager.syncDatabase(entityType);

	revalidatePath(`/account/syncDb/${entityType}`);
}
