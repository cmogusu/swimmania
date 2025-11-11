import path from "node:path";
import { BaseEditRelatedEntities } from "@/account/components/BaseEditRelatedEntities";
import { PDF_FOLDER } from "@/server/constants/paths";
import { importManagerFactory } from "@/server/Managers";
import { Database } from "@/server/Managers/ImportManager/Manager/Database";

let fileText = "empty... :-)";

const dbPath = path.join(PDF_FOLDER, `swimResult/mydb.db`);

export default async function Page() {
	const entityType = "pool";
	const entityId = 6;
	const relationshipType = "worksAt_inverse";
	const relatedEntityType = "lifeguard";

	return (
		<div className="p-6">
			<BaseEditRelatedEntities
				key={`${relationshipType}-${relatedEntityType}`}
				entityId={entityId}
				entityType={entityType}
				relationshipType={relationshipType}
				relatedEntityType={relatedEntityType}
			/>
			<form action={doDatabaseWork}>
				<input type="submit" className="btn btn-sm" value="Database" />
			</form>
			<form action={upload}>
				<input type="hidden" name="go" value="go" />
				<input type="submit" className="btn btn-sm" value="upload" />
			</form>
			<pre>{fileText}</pre>
		</div>
	);
}

// const dbExec = promisify(db.exec);
// const dbPrepare = promisify(db.prepare);

async function doDatabaseWork() {
	"use server";

	const db = new Database(dbPath);
	const entityType = "pool";
	// db.createEntityDbTable(entityType);
	// db.insert(entityType, 31, "cat");
	const x = db.getByName(entityType, "cow and dog");
	// const y = db.getAll(entityType);
	// console.log(y);
	// const x = db.getById(entityType, 31);
	console.log(x);
}

async function upload() {
	"use server";
	const importManager = importManagerFactory.getInstance("swimResult");
	importManager.importJson("swimResults.git_skip.json");
	fileText = "cow";
}
