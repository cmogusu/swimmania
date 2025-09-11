import { Link } from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { EntityTypePlurals } from "../../constants";
import { LinkButton } from "../Common";
import { Images } from "../Image";
import { Metadata } from "../Metadata";
import { RelatedEntity } from "../RelatedEntity";
// import { DeleteButton } from "./DeleteButton";
import { Map as LocationMap } from "./Map";

const isMapRendered = false;

export const Entity = ({
	entity,
	entityId,
	entityType,
	images,
	metadata,
	relatedEntities,
	schema,
}) => {
	if (!entity) {
		return (
			<h1 className="text-center text-2xl font-bold mt-10">
				{entityType} Not Found
			</h1>
		);
	}

	return (
		<main className="mt-3">
			<section>
				<div className="container m-auto py-6 px-6">
					<Link
						href="/properties"
						className="text-blue-500 hover:text-blue-600 flex items-center"
					>
						<FaArrowLeft className="mr-2" /> Back to Properties
					</Link>
				</div>
			</section>

			<section className="grid grid-cols-6 gap-3 mb-3">
				<div className="">
					<LinkButton path={`/edit/${entityType}`} text="Back" />
					<LinkButton path={`/edit/${entityType}/${entityId}`} text="Edit" />
					{/* <DeleteButton entityId={entityId} entityType={entityType} /> */}

					<div className="p-2">
						{isMapRendered && <LocationMap metadata={metadata} />}
						<Images
							entityType={entityType}
							entityId={entityId}
							images={images}
						/>
					</div>
				</div>
				<div className="">
					<div className="p-2">
						<h1>{entity.name}</h1>
						<p>{entity.description}</p>
					</div>
				</div>
			</section>

			{entity && (
				<Metadata
					entityId={entityId}
					entityType={entityType}
					metadata={metadata}
					schema={schema}
				/>
			)}

			{relatedEntities.map(({ entities, type: relatedEntityType }) => (
				<section className="mb-3" key={relatedEntityType}>
					<h3>Related {EntityTypePlurals[relatedEntityType]}</h3>
					<RelatedEntity relatedEntities={entities} />
				</section>
			))}
		</main>
	);
};
