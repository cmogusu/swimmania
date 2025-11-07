import { importEntities } from "@/server/api/apiActions";
import { EntityTypePlurals } from "@/server/constants";
import type { ImportableEntityTypes } from "@/server/types";

type Props = {
	entityType: ImportableEntityTypes;
};

export const ImportEntitiesForm = ({ entityType }: Props) => {
	return (
		<div className="p-4 bg-white border border-r-2">
			<h3>Upload {EntityTypePlurals[entityType]}</h3>

			<form action={importEntities}>
				<input type="hidden" name="entityType" value={entityType} />
				<div className="mb-3">
					<label className="mb-3">
						<span>Upload file</span>
						<br />
						<input
							className="input input-sm"
							type="file"
							name="file"
							accept="pdf/*"
						/>
					</label>
				</div>

				<div className="mb-3">
					<input type="submit" value="Import" />
				</div>
			</form>
		</div>
	);
};
