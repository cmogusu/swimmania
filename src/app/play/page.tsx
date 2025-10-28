import { revalidatePath } from "next/cache";
import { MultipleLocationsMap } from "@/components/MapLibre";
import { ApiContextProvider } from "@/context";
import { getApiKeys } from "@/server/serverFunctions";

const allLocations = [
	{
		entityId: 81,
		lat: -1.27483214278864,
		lng: 36.89327138010387,
	},
	{
		entityId: 82,
		lat: -1.11194633393434,
		lng: 36.882762634334824,
	},
	{
		entityId: 101,
		lat: -1.27496890905312,
		lng: 36.75626246372862,
	},
	{
		entityId: 102,
		lat: -1.27091691406872,
		lng: 36.722366341884744,
	},
	{
		entityId: 117,
		lat: -1.16263002994382,
		lng: 36.80121492186542,
	},
];

let count = 5;
let locations = allLocations.slice(0, count);

export default async function ExpPage() {
	return (
		<div>
			<h1>
				hello c:{count} l:{locations.length}
			</h1>

			<div>
				<ApiContextProvider getApiKeys={getApiKeys}>
					<div style={{ width: "400px", height: "400px" }}>
						<MultipleLocationsMap locations={locations} />
					</div>
				</ApiContextProvider>

				<ul>
					{locations.map((l) => (
						<li key={l.entityId}>{l.entityId}</li>
					))}
				</ul>
			</div>

			<form action={changeLocations}>
				<input className="btn btn-sm" type="submit" value="change locations" />
			</form>
		</div>
	);
}

async function changeLocations() {
	"use server";
	count -= 1;
	locations = allLocations.slice(0, count).reverse();
	revalidatePath(`/play`);
}
