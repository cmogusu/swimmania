import type { EditProps } from "../types";
import { RenderItem } from "./RenderItem";
import type { InputType } from "./types";

type Props = EditProps & {
	inputType?: InputType;
	min?: number;
	max?: number;
	step?: number;
};

export const EditTextType = ({
	entityType,
	entityId,
	metadataType,
	childrenMetadata,
	parentTitle,
	inputType = "text",
	min,
	max,
	step,
}: Props) => {
	if (childrenMetadata?.length) {
		return (
			<div className="border-t border-base-200 mb-4">
				<h3 className="mb-3">{parentTitle}</h3>
				<div className={`w-full pl-4 flex flex-col-${childrenMetadata.length}`}>
					{childrenMetadata?.map((m) => (
						<RenderItem
							key={m.name}
							entityType={entityType}
							entityId={entityId}
							metadataType={m}
							inputType={inputType}
							min={min}
							max={max}
							step={step}
						/>
					))}
				</div>
			</div>
		);
	}

	return (
		<RenderItem
			entityType={entityType}
			entityId={entityId}
			metadataType={metadataType}
			inputType={inputType}
			min={min}
			max={max}
			step={step}
		/>
	);
};
