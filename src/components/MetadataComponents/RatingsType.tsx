/** biome-ignore-all lint/a11y/useAriaPropsSupportedByRole: aria-label is needed here */
import { isUndefined } from "@/server/utils";
import type { MetadataTypeProps } from "./types";

export const RatingsType = ({ metadataType }: MetadataTypeProps) => {
	const { title, value } = metadataType;

	if (isUndefined(value)) {
		return null;
	}

	return (
		<div>
			<span>{title}</span>
			<div className="rating rating-sm">
				{Array(5)
					.fill("")
					.map((_, i) => {
						const ariaCurrent = i + 1 === value ? { "aria-current": true } : {};

						return (
							<div
								// biome-ignore lint/suspicious/noArrayIndexKey: No better way to do it
								key={i}
								className="mask mask-star bg-green-600"
								aria-label={`${i + 1} star`}
								{...ariaCurrent}
							/>
						);
					})}
			</div>
		</div>
	);
};
