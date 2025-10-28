import { MultipleLocationsMap } from "@/components/MapLibre";
import { ApiContextProvider } from "@/context";
import { getApiKeys } from "@/server/serverFunctions";

export default async function ExpPage() {
	return (
		<div>
			<h1>hello</h1>
			<div style={{ width: "400px" }}>
				<ApiContextProvider getApiKeys={getApiKeys}>
					<MultipleLocationsMap locations={locations} />
				</ApiContextProvider>
			</div>
		</div>
	);
}

const locations = [
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
