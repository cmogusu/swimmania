import Image from "next/image";
import type { RefObject } from "react";
import { DefaultSiteImage } from "@/constants";
import type { EntityData, RawMetadata } from "@/server/types";

type Props = {
	entity: EntityData;
	metadata?: RawMetadata;
	containerRef?: RefObject<HTMLElement | null>;
	handleButtonClick?: () => void;
};

export const EntityContent = ({
	entity,
	containerRef,
	handleButtonClick,
}: Props) => {
	const { entityId, name, description, entityType, defaultImage, metadata } =
		entity;
	const image = defaultImage || DefaultSiteImage;

	return (
		<div
			// @ts-ignore
			ref={containerRef}
			className="card card-side bg-base-100 shadow-sm mb-4 grid-rows-2"
		>
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
			<div key={name}>
				{name}: {metadata[name]}
			</div>,
		);
	}

	return metadataArr;
};
