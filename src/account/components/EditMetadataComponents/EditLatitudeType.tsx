import { EditSingleLocationMap } from "@/components/MapLibre";
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
				center={center}
			/>
		</div>
	);
};
