import type { IOptionsMetadataPropertyType } from "@/server/types";
import { EditContainer } from "./EditContainer";
import type { EditProps } from "./types";

export const EditOptionsType = ({
	entityType,
	entityId,
	metadataType,
}: EditProps) => {
	const { title, value, options } =
		metadataType as IOptionsMetadataPropertyType;

	// TODO: Fix bug where select fails to display correct value after update

	return (
		<EditContainer
			name={metadataType.name}
			entityType={entityType}
			entityId={entityId}
		>
			<fieldset className="fieldset">
				<legend className="fieldset-legend">{title}</legend>
				<select name="value" className="select" defaultValue={value as string}>
					<option value="">Select</option>
					{options.map((o) => (
						<option key={o.key} value={o.key}>
							{o.value}
						</option>
					))}
				</select>
			</fieldset>
		</EditContainer>
	);
};
