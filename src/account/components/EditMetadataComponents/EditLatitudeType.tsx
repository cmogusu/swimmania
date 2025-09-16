import { getApiKey } from "@/server";
import { EditMap } from "../Map";
import { EditContainer } from "./EditContainer";
import type { EditProps } from "./types";

export const EditLatitudeType = ({
	entityType,
	entityId,
	parentTitle,
	childrenMetadata,
}: EditProps) => {
	if (!childrenMetadata?.length) {
		return null;
	}

	const mapTilerApiKey = getApiKey("maptiler");
	const styleUrl = `https://api.maptiler.com/maps/backdrop/style.json?key=${mapTilerApiKey}`;

	const latMetadata = childrenMetadata.find((m) => m.type === "latitude");
	const lngMetadata = childrenMetadata.find((m) => m.type === "longitude");

	if (!lngMetadata || !lngMetadata) {
		throw Error("missing lat or lang");
	}

	const lat = latMetadata?.value as number;
	const lng = lngMetadata?.value as number;

	return (
		<div>
			<h3>{parentTitle}</h3>
			<EditMap styleUrl={styleUrl} lat={lat as number} lng={lng as number} />
			<EditContainer
				entityId={entityId}
				entityType={entityType}
				// biome-ignore lint/style/noNonNullAssertion: A check for this exists above
				metadataType={latMetadata!}
			>
				<input type="hidden" name="value" value={lat} />
			</EditContainer>

			<EditContainer
				entityId={entityId}
				entityType={entityType}
				// biome-ignore lint/style/noNonNullAssertion: A check for this exists above
				metadataType={lngMetadata!}
			>
				<input type="hidden" name="value" value={lng} />
			</EditContainer>
		</div>
	);
};
