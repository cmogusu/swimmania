import { EntityCardV1 } from "../EntityCard";

export const Entities = ({ entityType, entities }) => {
	if (!entities?.length) {
		return <p>Ooops! Nothing found</p>;
	}

	return (
		<section>
			<div className="mt-3 mb-3 container mx-auto">
				<div className="grid grid-cols-4 gap-3">
					{entities.map((entity) => (
						<div className="mb-3" key={entity.id}>
							<EntityCardV1 entity={entity} entityType={entityType} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
