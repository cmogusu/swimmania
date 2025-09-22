import { Page, SubmitButton } from "@/account";
import { EntityTypes, seedDb } from "@/server";

const entityTypesArr = Object.values(EntityTypes);

export default async function SeedPage() {
	return (
		<Page>
			<h1>Seed database</h1>
			<form action={seedDb}>
				<fieldset className="fieldset">
					<legend className="fieldset-legend">Entitytype: </legend>
					<select name="entityType" defaultValue="pool" className="select">
						{entityTypesArr.map((o) => (
							<option key={o} value={o}>
								{o}
							</option>
						))}
					</select>
				</fieldset>

				<fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4 mb-3">
					<legend className="fieldset-legend">number of items</legend>
					<label className="label" htmlFor="itemCount">
						{[1, 5, 10, 20].map((v) => (
							<>
								<input
									key={v}
									type="radio"
									name="itemCount"
									value={v}
									className="radio radio-sm"
									defaultChecked={v === 1}
								/>
								{v}
							</>
						))}
					</label>
				</fieldset>

				<SubmitButton buttonText="Seed" />
			</form>
		</Page>
	);
}
