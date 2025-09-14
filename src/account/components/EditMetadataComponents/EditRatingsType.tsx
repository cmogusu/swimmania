/** biome-ignore-all lint/a11y/noLabelWithoutControl: No better solution found */
import { isUndefined } from "@/server";
import { EditContainer } from "./EditContainer";
import type { EditProps } from "./types";

export const EditRatingsType = ({
	entityType,
	entityId,
	metadataType,
}: EditProps) => {
	const { name, title, value } = metadataType;

	if (isUndefined(value)) {
		return null;
	}

	return (
		<EditContainer
			entityType={entityType}
			entityId={entityId}
			metadataType={metadataType}
		>
			<label className="floating-label mb-3">
				<span>{title}</span>

				<div className="rating">
					{Array(5)
						.fill("")
						.map((_, i) => {
							const current = i + 1 === value ? { defaultChecked: true } : {};
							return (
								<input
									// biome-ignore lint/suspicious/noArrayIndexKey: No better solution found now
									key={i}
									type="radio"
									name={name}
									className="mask mask-star"
									aria-label={`${i + 1} star`}
									{...current}
								/>
							);
						})}
				</div>
			</label>
		</EditContainer>
	);
};
