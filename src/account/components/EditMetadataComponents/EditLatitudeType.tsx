import { EditSingleLocationMap } from "@/components/MapLibre";
import { getApiKey } from "@/server/serverFunctions";
import type { LatLng } from "@/types";
import type { EditProps } from "./types";

export const EditLatitudeType = async ({
	entityType,
	entityId,
	parentTitle,
	childrenMetadata,
}: EditProps) => {
	if (!childrenMetadata?.length) {
		return null;
	}

	const maptilerApiKey = await getApiKey("maptiler");
	const styleUrl = `https://api.maptiler.com/maps/backdrop/style.json?key=${maptilerApiKey}`;

	const latMetadata = childrenMetadata.find((m) => m.type === "latitude");
	const lngMetadata = childrenMetadata.find((m) => m.type === "longitude");

	if (!latMetadata?.name || !lngMetadata?.name) {
		throw Error("missing lat or lang");
	}

	const center: LatLng = {
		lat: latMetadata?.value as number,
		lng: lngMetadata?.value as number,
	};

	return (
		<div className="mb-4">
			<h3>{parentTitle}</h3>
			<EditSingleLocationMap
				id={latMetadata.id}
				latName={latMetadata.name}
				lngName={lngMetadata.name}
				entityId={entityId}
				entityType={entityType}
				styleUrl={styleUrl}
				center={center}
			/>
		</div>
	);
};
