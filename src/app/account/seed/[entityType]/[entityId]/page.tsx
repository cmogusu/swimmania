import { redirect } from "next/navigation";
import { Page, SubmitButton } from "@/account";
import { EntitiesNavBar } from "@/account/components/Header";
import { seedEntity } from "@/server/api";
import type { EntityType } from "@/server/types";

type Props = {
	params: Promise<{ entityType: EntityType; entityId: number }>;
};

const baseBreadcrumbs = [
	{
		link: "/",
		title: "Home",
	},
	{
		link: "/account",
		title: "My account",
	},
	{
		title: "Seed",
	},
];

export default async function SeedDb({ params }: Props) {
	const { entityType, entityId } = await params;
	if (!entityId) {
		redirect(`/account/seed/${entityType}`);
	}

	const breadcrumbs = [
		...baseBreadcrumbs,
		{
			link: `/seed/${entityType}`,
			title: entityType,
		},
		{
			title: `${entityId}`,
		},
	];

	return (
		<Page breadcrumbs={breadcrumbs}>
			<div className="mb-4">
				<EntitiesNavBar entityType={entityType} baseUrl="/account/seed" />

				<h1 className="mb-2">Seed database for entity id: {entityId}</h1>
				<form action={seedEntity}>
					<input type="hidden" name="entityType" value={entityType} />
					<input type="hidden" name="entityId" value={entityId} />
					<fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4 mb-3">
						<legend className="fieldset-legend">Entity property</legend>
						<label className="label" htmlFor="entityProperty">
							{["images", "metadata"].map((v) => (
								<span key={v}>
									<input
										type="radio"
										name="entityProperty"
										value={v}
										className="radio radio-sm"
										defaultChecked={v === "metadata"}
									/>
									{v}
								</span>
							))}
						</label>
					</fieldset>

					<SubmitButton buttonText="Seed" />
				</form>
			</div>
		</Page>
	);
}
