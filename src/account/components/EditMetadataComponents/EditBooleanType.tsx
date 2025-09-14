import { EditContainer } from "./EditContainer";
import type { EditProps } from "./types";

export const EditBooleanType = ({
	entityType,
	entityId,
	metadataType,
}: EditProps) => {
	const { title, value } = metadataType;

	return (
		<EditContainer
			entityType={entityType}
			entityId={entityId}
			metadataType={metadataType}
		>
			<fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4 mb-3">
				<legend className="fieldset-legend">{title}</legend>
				<label className="label">
					<input
						type="checkbox"
						name="isDefault"
						className="toggle toggle-sm"
						defaultChecked={value as boolean}
					/>
				</label>
			</fieldset>
		</EditContainer>
	);
};
