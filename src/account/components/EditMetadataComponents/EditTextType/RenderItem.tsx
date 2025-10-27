import type { EntityType, IMetadataPropertyType } from "@/server/types";
import { isUndefined } from "@/server/utils";
import { EditContainer } from "../EditContainer";
import type { InputType } from "./types";

type RenderItemProps = {
	entityType: EntityType;
	entityId: number;
	metadataType: IMetadataPropertyType;
	inputType: InputType;
	min?: number;
	max?: number;
	step?: number;
};

export const RenderItem = ({
	entityType,
	entityId,
	metadataType,
	inputType,
	min,
	max,
	step,
}: RenderItemProps) => {
	const { title, value } = metadataType;
	const extraProps: Record<string, number> = {};
	if (!isUndefined(min)) extraProps.min = min;
	if (!isUndefined(max)) extraProps.max = max;
	if (!isUndefined(step)) extraProps.step = step;

	return (
		<EditContainer
			id={metadataType.id}
			name={metadataType.name}
			entityType={entityType}
			entityId={entityId}
		>
			<label className="floating-label mb-3">
				<span>{title}</span>
				<input
					className="input input-sm"
					type={inputType || "text"}
					name="value"
					placeholder={title}
					defaultValue={value as number | string}
					{...extraProps}
				/>
			</label>
		</EditContainer>
	);
};
