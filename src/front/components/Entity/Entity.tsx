import Image from "next/image";
import { RelatedEntities } from "@/components";
import { MetadataList } from "@/components/MetadataList";
import { DefaultSiteImage } from "@/constants";
import { EntityContextProvider } from "@/front/context";
import type { EntityData, EntityType, RawMetadata } from "@/server/types";
import { Metadata } from "../Metadata";
import { Images } from "./Images";

type Props = {
	entityType: EntityType;
	entity: EntityData;
};

const show = false;

export const Entity = async ({ entityType, entity }: Props) => {
	const {
		id: entityId,
		name,
		description,
		location,
		defaultImage,
		images,
		metadata,
	} = entity || {};
	const image = defaultImage || DefaultSiteImage;

	if (!entity) {
		return "Sorry, item not found";
	}

	return (
		<EntityContextProvider entityId={entityId} entityType={entityType}>
			<section className="mb-4">
				<h1>{name}</h1>
				<hr className="w-50 mb-4" />
				<div className="mb-4">
					<Image
						alt={image.alt}
						className="size-10 rounded-box"
						width={1000}
						height={667}
						src={image.src}
					/>
				</div>
				{location && <div className="text-5xl">{location}</div>}

				<p className="text-2xl">{description}</p>
			</section>

			{show && <RelatedEntities entityType={entityType} entityId={entityId} />}
			{show && <Images images={images} />}
			{show && <Metadata entityType={entityType} metadata={metadata} />}
			<MetadataList
				entityId={entityId}
				entityType={entityType}
				names={[
					"poolShape",
					"poolDimensions",
					"hostInstitutionType",
					"crowdiness",
				]}
				render={(metadataArr: RawMetadata[]) => (
					<div>
						{metadataArr.map((metadata) => (
							<div key={metadata.name}>
								{metadata.name} - {metadata.value}
							</div>
						))}
					</div>
				)}
			/>
		</EntityContextProvider>
	);
};
