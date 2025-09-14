import { EditContainer } from "./EditContainer";
import type { EditProps } from "./types";

type Props = EditProps & { inputType: "text" | "number" | "time" | "date" };

export const EditTextType = ({
	entityType,
	entityId,
	metadataType,
	inputType,
}: Props) => {
	const { title, value } = metadataType;

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
					type={inputType || "text"}
					name="value"
					placeholder="value"
					defaultValue={value as number}
				/>
			</label>
		</EditContainer>
	);
};
