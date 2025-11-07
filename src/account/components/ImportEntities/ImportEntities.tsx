import { ImportEntitiesForm } from "./ImportEntitiesForm";

export const ImportEntities = () => {
	return (
		<div className="grid grid-cols-3 gap-4">
			<ImportEntitiesForm entityType="swimResult" />
			<ImportEntitiesForm entityType="swimMeet" />
			<ImportEntitiesForm entityType="swimEvent" />
		</div>
	);
};
