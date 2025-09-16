import type { EntityType, IMetadataType } from "@/server";
import { EditContainer } from "./EditContainer";
import type { EditProps } from "./types";

type InputType = "text" | "number" | "time" | "date";
type Props = EditProps & { inputType?: InputType };

export const EditTextType = ({
	entityType,
	entityId,
	metadataType,
	childrenMetadata,
	parentTitle,
	inputType = "text",
}: Props) => {
	if (childrenMetadata?.length) {
		return (
			<div className="border-t border-base-200 mb-4">
				<h3 className="mb-3">{parentTitle}</h3>
				{childrenMetadata?.map((m) => (
					<RenderItem
						key={m.id}
						entityType={entityType}
						entityId={entityId}
						metadataType={m}
						inputType={inputType}
					/>
				))}
			</div>
		);
	}

	return (
		<RenderItem
			entityType={entityType}
			entityId={entityId}
			metadataType={metadataType}
			inputType={inputType}
		/>
	);
};

type RenderItemProps = {
	entityType: EntityType;
	entityId: number;
	metadataType: IMetadataType;
	inputType: InputType;
};

export const RenderItem = ({
	entityType,
	entityId,
	metadataType,
	inputType,
}: RenderItemProps) => {
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
