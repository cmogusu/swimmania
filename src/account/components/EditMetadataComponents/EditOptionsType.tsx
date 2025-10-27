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

	if (!options?.length) {
		throw Error("Options not set");
	}

	return (
		<EditContainer
			id={metadataType.id}
			name={metadataType.name}
			entityType={entityType}
			entityId={entityId}
		>
			<fieldset className="fieldset">
				<legend className="fieldset-legend">{title}</legend>
				<select name="value" defaultValue={value as string} className="select">
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
