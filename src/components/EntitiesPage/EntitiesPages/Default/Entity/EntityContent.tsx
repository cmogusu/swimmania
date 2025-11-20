import Image from "next/image";
import { Loading } from "@/components/Loading";
import { DefaultSiteImage } from "@/constants";
import type { EntityData, RawMetadata } from "@/server/types";

type Props = {
	entity: EntityData;
	metadata?: RawMetadata;
	isMetadataLoading?: boolean;
	handleButtonClick?: () => void;
};

export const EntityContent = ({
	entity,
	metadata,
	isMetadataLoading,
	handleButtonClick,
}: Props) => {
	const { entityId, name, description, entityType, defaultImage } = entity;
	const image = defaultImage || DefaultSiteImage;

	return (
		<div className="card card-side bg-base-100 shadow-sm mb-4 grid-rows-2">
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

				{isMetadataLoading && <Loading />}
				{metadata && renderMetadata(metadata)}

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

const renderMetadata = (metadata: RawMetadata) => {
	const metadataArr = [];

	for (const name in metadata) {
		metadataArr.push(
			<div>
				{name}: {metadata[name]}
			</div>,
		);
	}

	return metadataArr;
};
