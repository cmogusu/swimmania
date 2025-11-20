import Image from "next/image";
import { DefaultSiteImage } from "@/constants";
import type { EntityData, RawMetadata } from "@/server/types";

type Props = {
	entity: EntityData;
	metadata?: RawMetadata;
	handleButtonClick?: () => void;
};

export const EntityContent = ({
	entity,
	metadata,
	handleButtonClick,
}: Props) => {
	const { entityId, name, description, entityType, defaultImage } = entity;
	const image = defaultImage || DefaultSiteImage;

	return (
		<div>
			<figure>
				<Image alt={image.alt} width={1000} height={667} src={image.src} />
			</figure>
			<div className="card-body">
				<a href={`/${entityType}/${entityId}`}>
					<h2 className="card-title">
						{name} - {entityId}
					</h2>
				</a>
				<p>{description}</p>

				{metadata && (
					<>
						<div>start date: {metadata.startDate}</div>
						<div>end date: {metadata.endDate}</div>
					</>
				)}

				<div className="card-actions justify-end">
					<button
						className="btn btn-primary"
						type="button"
						onClick={handleButtonClick}
					>
						View
					</button>
				</div>
			</div>
		</div>
	);
};
