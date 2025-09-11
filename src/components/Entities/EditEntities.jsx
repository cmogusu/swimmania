import { Link } from "next/link";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useAdminContext } from "../../context";
import { LinkButton, Loading } from "../Common";
import { EntityCardV1 } from "../EntityCard";
import { LoadMore } from "./LoadMore";
import "./style.css";

export const EditEntities = ({ entityType, entities }) => {
	const { isEditingEnabled } = useAdminContext();

	if (!entities?.length) {
		return null;
	}

	return (
		<section>
			<div className="mt-3 mb-3">
				{isEditingEnabled && (
					<div className="flex justify-end">
						<LinkButton path={`/${entityType}`} text="Back" />
						<LinkButton path={`/add/${entityType}`} text="Add" />
					</div>
				)}

				<div className="grid grid-cols-4 gap-3">
					{entities.map((entity) => (
						<div className="col-12 col-md-4 mb-3" key={entity.id}>
							<EditWrapper entityType={entityType} entityId={entity.id}>
								<EntityCardV1 entity={entity} entityType={entityType} />
							</EditWrapper>
						</div>
					))}
				</div>
				{/* <LoadMore loadMore={loadMoreEntities} /> */}
			</div>
		</section>
	);
};

const EditWrapper = ({ entityType, entityId, children }) => {
	return (
		<div className="position-relative">
			<div className="position-absolute edit-wrappper">
				<Link href={`/edit/${entityType}/${entityId}`}>
					<AiFillEdit />
				</Link>

				<form method="delete" action="./">
					<input type="hidden" name="entityId" defaultValue={entityId} />
					<button type="button">
						<AiFillDelete />
					</button>
				</form>
			</div>

			{children}
		</div>
	);
};
