// import { Link } from "next/link";
import { shortenText } from "../../utilities";
import { DefaultEntityImage } from "../Image";
import "./style.css";

export const EntityCardType = {
	default: "default",
	fancy: "fancy",
};

export const EntityCardV1 = ({ entity, entityType }) => {
	const name = shortenText(entity?.name, 30);
	const description = shortenText(entity?.description, 100);

	return (
		<div className="entity-card card">
			<a href={`/view/${entityType}/${entity.id}`}>
				<DefaultEntityImage entityId={entity.id} entityType={entityType} />
			</a>
			<div className="card-body">
				<a href={`/${entityType}/${entity.id}`}>
					<h4 className="card-title">{name}</h4>
				</a>
				<p className="card-text">{description}</p>
			</div>
		</div>
	);
};
