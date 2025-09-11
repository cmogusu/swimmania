import { isUndefined } from "@/server";
import { EditContainer } from "../EditContainer";
import type { EditProps } from "../types";

export const EditBooleanType = ({
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
					type="text"
					name="value"
					placeholder="value"
					defaultValue={value ? "true" : "false"}
				/>
			</label>
			{/* <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4 mb-3">
				<legend className="fieldset-legend">{title}</legend>
				<label className="label">
					<input
						type="checkbox"
						name="isDefault"
						className="toggle toggle-sm"
						defaultChecked={value as boolean}
					/>
				</label>
			</fieldset> */}
		</EditContainer>
	);
};
