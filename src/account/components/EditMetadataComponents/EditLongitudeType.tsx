import { isUndefined } from "@/server";
import { EditContainer } from "./EditContainer";
import type { EditProps } from "./types";

export const EditLongitudeType = ({
	entityType,
	entityId,
	metadataType,
}: EditProps) => {
	const { title, value } = metadataType;

	if (isUndefined(value)) {
		return null;
	}

	return (
		<EditContainer
			entityType={entityType}
			entityId={entityId}
			metadataType={metadataType}
		>
			<label className="floating-label mb-3">
				<span>{title}</span>
				<input
					className="input input-sm"
					type="number"
					name="value"
					placeholder="value"
					defaultValue={value as number}
				/>
			</label>
		</EditContainer>
	);
};
