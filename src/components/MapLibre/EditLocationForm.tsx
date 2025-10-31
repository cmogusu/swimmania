import type { PropsWithChildren } from "react";
import { SubmitButton } from "@/components/SubmitButton";
import { updateLocationMetadata } from "@/server/api/apiActions";
import type { EntityType } from "@/server/types";

type Props = PropsWithChildren & {
	metadataId: number | undefined;
	entityId: number;
	entityType: EntityType;
	latValue: number | undefined;
	lngValue: number | undefined;
	locationName: string | undefined;
	isSubmitDisabled: boolean;
};

export const EditLocationForm = ({
	metadataId,
	entityId,
	entityType,
	latValue,
	lngValue,
	locationName,
	isSubmitDisabled,
	children,
}: Props) => {
	const buttonText = metadataId === -1 ? "Insert" : "Update";

	console.log(locationName);

	return (
		<form action={updateLocationMetadata}>
			<input type="hidden" name="entityType" defaultValue={entityType} />
			<input type="hidden" name="id" defaultValue={metadataId} />
			<input type="hidden" name="entityId" defaultValue={entityId} />
			<input type="hidden" name="latName" defaultValue="location.lat" />
			<input type="hidden" name="lngName" defaultValue="location.lng" />
			<input type="hidden" name="latValue" value={latValue} />
			<input type="hidden" name="lngValue" value={lngValue} />
			<input type="hidden" name="locationName" value={locationName} />
			{children}
			<SubmitButton buttonText={buttonText} isDisabled={isSubmitDisabled} />
		</form>
	);
};
