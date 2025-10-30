// import { AutocompleteInput } from "@/components/GoogleMap/AutocompleteInput";
// import { BaseGoogleMap } from "@/components/GoogleMap/BaseGoogleMap";
// import { Map1 } from "@/components/GoogleMap/Map1";
import { LocationAutocompleteWithMap } from "@/components/GoogleMap/LocationAutocompleteWithMap";
import { FixedMapContainer } from "@/components/MapContainer";
// import { FixedMapContainer } from "@/components/MapContainer";
import { ApiContextProvider } from "@/context";
import { getApiKeys } from "@/server/serverFunctions";

export default async function ExpPage() {
	return (
		<div>
			<h1>hello</h1>

			<ApiContextProvider getApiKeys={getApiKeys}>
				<div
					style={{ width: `${800}px`, height: `${600}px` }}
					className="border p-2"
				>
					<FixedMapContainer>
						<LocationAutocompleteWithMap
							locationName="Nakuru"
							setLocation={handlePlaceSelect}
							setLocationName={handlePlaceSelect}
						/>
					</FixedMapContainer>
				</div>
			</ApiContextProvider>
		</div>
	);
}

async function handlePlaceSelect(map: unknown) {
	"use server";
	console.log(map);
}
