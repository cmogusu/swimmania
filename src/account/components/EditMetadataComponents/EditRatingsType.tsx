/** biome-ignore-all lint/a11y/noLabelWithoutControl: No better solution found */
import { EditContainer } from "./EditContainer";
import type { EditProps } from "./types";

export const EditRatingsType = ({
	entityType,
	entityId,
	metadataType,
}: EditProps) => {
	const { title, value } = metadataType;

	return (
		<EditContainer
			name={metadataType.name}
			entityType={entityType}
			entityId={entityId}
		>
			<div>
				<label className="floating-label mb-3">
					<span>{title}</span>

					<div className="rating">
						{Array(5)
							.fill("")
							.map((_, i) => (
								<input
									// biome-ignore lint/suspicious/noArrayIndexKey: Find better solution
									key={i}
									type="radio"
									name="value"
									value={i + 1}
									className="mask mask-star"
									aria-label={`${i + 1} star`}
									defaultChecked={i + 1 === value}
								/>
							))}
					</div>
				</label>
			</div>
		</EditContainer>
	);
};
