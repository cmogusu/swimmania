import { EditContainer } from "./EditContainer";
import type { EditProps } from "./types";

export const EditOptionsType = ({
	entityType,
	entityId,
	metadataType,
}: EditProps) => {
	const { title, value, options } = metadataType;

	if (!options?.length) {
		return;
	}

	return (
		<EditContainer
			entityType={entityType}
			entityId={entityId}
			metadataType={metadataType}
		>
			<fieldset className="fieldset">
				<legend className="fieldset-legend">{title}</legend>
				<select defaultValue={value as string} className="select">
					{options.map((o) => (
						<option key={o.key} value={o.key}>
							{o.value}
						</option>
					))}
				</select>
				<span className="label">Optional</span>
			</fieldset>
		</EditContainer>
	);
};
