import { Page, SubmitButton } from "@/account";
import { EntitiesNavBar } from "@/account/components/Header";
import { seedEntityType } from "@/server/api/apiActions";
import type { EntityType } from "@/server/types";

type Props = {
	params: Promise<{ entityType: EntityType }>;
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
	const { entityType } = await params;

	const breadcrumbs = [
		...baseBreadcrumbs,
		{
			title: entityType,
		},
	];

	return (
		<Page breadcrumbs={breadcrumbs}>
			<div className="mb-4">
				<EntitiesNavBar entityType={entityType} baseUrl="/account/seed" />

				<h1 className="mb-2">Seed database</h1>

				<form action={seedEntityType}>
					<input type="hidden" name="entityType" value={entityType} />
					<fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4 mb-3">
						<legend className="fieldset-legend">number of items</legend>
						<label className="label" htmlFor="itemCount">
							{[1, 5, 10, 20].map((v) => (
								<span key={v}>
									<input
										type="radio"
										name="itemCount"
										value={v}
										className="radio radio-sm"
										defaultChecked={v === 1}
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
