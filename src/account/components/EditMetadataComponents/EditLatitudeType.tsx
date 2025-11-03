import { EditSingleLocationMap } from "@/components/GoogleMap";
import type { LatLng } from "@/types";
import type { EditProps } from "./types";

export const EditLatitudeType = async ({
	entityType,
	entityId,
	parentTitle,
	parentMetadata,
}: EditProps) => {
	if (!parentMetadata) {
		return null;
	}

	const metadataId = parentMetadata.id;
	const latMetadata = parentMetadata.getChild("lat");
	const lngMetadata = parentMetadata.getChild("lng");
	const nameMetadata = parentMetadata.getChild("name");

	if (!latMetadata || !lngMetadata || !nameMetadata) {
		throw Error("missing lat, lng or name");
	}

	const locationName = nameMetadata.value as string;
	const location: LatLng = {
		lat: latMetadata?.value as number,
		lng: lngMetadata?.value as number,
	};

	return (
		<div className="mb-4">
			<h3>{parentTitle}</h3>
			<EditSingleLocationMap
				metadataId={metadataId}
				entityId={entityId}
				entityType={entityType}
				locationName={locationName}
				location={location}
			/>
		</div>
	);
};
