import { isUndefined } from "@/server";
import { EditContainer } from "../EditContainer";
import type { EditProps } from "../types";

export const EditLatitudeType = ({
	entityType,
	entityId,
	metadataType,
	currentPath,
}: EditProps) => {
	const { id, name, title, value } = metadataType;

	if (isUndefined(value)) {
		return null;
	}

	return (
		<EditContainer
			entityType={entityType}
			entityId={entityId}
			id={id}
			name={name}
			currentPath={currentPath}
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
