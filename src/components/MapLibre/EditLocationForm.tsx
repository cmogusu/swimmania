import type { PropsWithChildren } from "react";
import { SubmitButton } from "@/components/SubmitButton";
import { updateLocationMetadata } from "@/server/api/apiActions";
import type { EntityType } from "@/server/types";

type Props = PropsWithChildren & {
	id: number;
	entityId: number;
	entityType: EntityType;
	latName: string;
	lngName: string;
	latValue: number | undefined;
	lngValue: number | undefined;
	isSubmitDisabled: boolean;
};

export const EditLocationForm = ({
	id,
	entityId,
	entityType,
	latName,
	lngName,
	latValue,
	lngValue,
	isSubmitDisabled,
	children,
}: Props) => {
	const buttonText = id === -1 ? "Insert" : "Update";

	return (
		<form action={updateLocationMetadata}>
			<input type="hidden" name="entityType" defaultValue={entityType} />
			<input type="hidden" name="id" defaultValue={id} />
			<input type="hidden" name="entityId" defaultValue={entityId} />
			<input type="hidden" name="latName" defaultValue={latName} />
			<input type="hidden" name="lngName" defaultValue={lngName} />
			<input type="hidden" name="latValue" value={latValue} />
			<input type="hidden" name="lngValue" value={lngValue} />
			{children}
			<SubmitButton buttonText={buttonText} isDisabled={isSubmitDisabled} />
		</form>
	);
};
